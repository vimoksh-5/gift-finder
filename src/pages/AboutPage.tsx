import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageHeader = styled.div`
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  padding: 3rem 0;
  color: white;
  text-align: center;
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 20px;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Text = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: #555;
`;

const List = styled.ul`
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.7;
    color: #555;
  }
`;

// Add a styled button for navigation
const SubmitButton = styled(Link)`
  display: inline-block;
  background: #ff6b6b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: background 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #ff5252;
  }
`;

const SubmitSection = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

interface AboutPageProps {
  // Add any props if needed
}

const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <div>
      <PageHeader>
        <HeaderContent>
          <Title>About GiftFinder</Title>
          <Subtitle>
            Helping you discover the perfect gifts for every occasion
          </Subtitle>
        </HeaderContent>
      </PageHeader>

      <Container>
        <Section>
          <SectionTitle>Our Mission</SectionTitle>
          <Text>
            GiftFinder was created with a simple mission: to take the stress out
            of gift-giving. We believe that finding the perfect gift should be a
            joyful experience, not a chore.
          </Text>
          <Text>
            Our platform brings together a community of gift-givers who share
            their best ideas and recommendations, helping everyone discover
            thoughtful, meaningful presents for their loved ones, no matter the
            occasion.
          </Text>
        </Section>

        <Section>
          <SectionTitle>How It Works</SectionTitle>
          <Text>
            GiftFinder is powered by community contributions. Here's how our
            platform works:
          </Text>
          <List>
            <li>
              <strong>Browse by Occasion:</strong> Find gift ideas organized by
              holidays, celebrations, and special events.
            </li>
            <li>
              <strong>Filter Options:</strong> Narrow down suggestions by price
              range, recipient, and more to find the perfect match.
            </li>
            <li>
              <strong>Community Contributions:</strong> All our gift ideas come
              from people like you, sharing their best gift-giving experiences.
            </li>
            <li>
              <strong>Submit Your Ideas:</strong> Have a great gift suggestion?
              Share it with our community using the form below.
            </li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Share Your Gift Ideas</SectionTitle>
          <Text>
            Our community thrives on shared knowledge and experiences. If you've
            given or received a gift that brought joy, we'd love to hear about
            it!
          </Text>

          <SubmitSection>
            <p style={{ marginBottom: "1.5rem", color: "#555" }}>
              We'd love to hear about your favorite gift ideas! Your suggestions
              will help others find the perfect gifts for their loved ones.
            </p>
            <SubmitButton to="/submission">Submit Your Gift Idea</SubmitButton>
          </SubmitSection>
        </Section>

        <Section>
          <SectionTitle>Contact Us</SectionTitle>
          <Text>
            Have questions, suggestions, or feedback? We'd love to hear from
            you! Reach out to us.
          </Text>
        </Section>
      </Container>
    </div>
  );
};

export default AboutPage;
