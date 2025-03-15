import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  margin: 0;
  color: #ff6b6b;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 1rem 0 2rem;
  color: #333;
`;

const Text = styled.p`
  font-size: 1.1rem;
  max-width: 500px;
  margin-bottom: 2rem;
  color: #666;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #ff6b6b;
  color: white;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background: #ff5252;
  }
`;

interface NotFoundPageProps {
  // Add any props if needed
}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>Page Not Found</Title>
      <Text>
        Oops! The page you're looking for doesn't exist or has been moved. Let's
        get you back to finding the perfect gift.
      </Text>
      <HomeButton to="/">Back to Home</HomeButton>
    </Container>
  );
};

export default NotFoundPage;
