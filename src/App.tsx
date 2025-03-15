import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Outlet,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import OccasionPage from "./pages/OccasionPage";
import AboutPage from "./pages/AboutPage";
import SubmissionPage from "./pages/SubmissionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { trackPageView, track } from "./utils/tracking";

const AppContainer = styled.div`
  font-family: "Poppins", sans-serif;
  color: #333;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

// Helper component to handle the occasion route with params
const OccasionRoute: React.FC = () => {
  // Use the useParams hook to get the occasion parameter
  const { occasion } = useParams<{ occasion: string }>();

  if (!occasion) {
    return <div>Occasion not found</div>;
  }

  return <OccasionPage />;
};

// Layout component that includes Header and Footer
const Layout: React.FC = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  // Track page views when the location changes
  useEffect(() => {
    // Only track page views on push navigation (not on replace or pop)
    if (navigationType === "PUSH") {
      const pageName =
        location.pathname === "/" ? "home" : location.pathname.substring(1);
      trackPageView(pageName, {
        url: location.pathname,
        search: location.search,
      });
    }

    track("app_initialized", {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
    });
  }, [location, navigationType]);

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

// Create router with future flag enabled
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="occasion/:occasion" element={<OccasionRoute />} />
      <Route path="submission" element={<SubmissionPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

const App: React.FC = () => {
  useEffect(() => {
    // Log when the app initializes
    console.log("App initialized");
    track("app_initialized", {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
    });
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
