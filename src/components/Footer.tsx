import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 3rem 0;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #ff6b6b;
  }

  p {
    margin-bottom: 1rem;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 0.5rem;

      a {
        opacity: 0.8;
        transition: opacity 0.3s ease;

        &:hover {
          opacity: 1;
          color: #ff6b6b;
        }
      }
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  opacity: 0.6;
`;

interface FooterProps {
  // Add any props if needed
}

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About GiftFinder</h3>
          <p>
            GiftFinder helps you discover the perfect gifts for any occasion.
            Our curated suggestions make gift-giving easy and thoughtful.
          </p>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/submission">Submit a Gift</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact</h3>
          <p>Have questions or suggestions? We'd love to hear from you!</p>
        </FooterSection>
      </FooterContent>

      <Copyright>
        &copy; {currentYear} GiftFinder. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
