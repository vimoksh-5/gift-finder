import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchAllOccasions } from "../utils/googleSheetsApi";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 18px;
`;

const OccasionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const OccasionCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: #333;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const OccasionIcon = styled.div`
  font-size: 48px;
  margin-bottom: 10px;
`;

const OccasionName = styled.h3`
  margin: 0;
  color: #ff6b6b;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #ff6b6b;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #ea4335;
  font-size: 18px;
  background-color: #ffebee;
  border-radius: 8px;
  margin-bottom: 20px;
`;

// Map of occasions to emoji icons
const occasionIcons: Record<string, string> = {
  birthday: "🎂",
  wedding: "💍",
  anniversary: "💝",
  christmas: "🎄",
  valentines: "❤️",
  graduation: "🎓",
  housewarming: "🏠",
  "baby shower": "👶",
  retirement: "🌴",
  thanksgiving: "🦃",
  halloween: "🎃",
  "new year": "🎉",
  easter: "🐰",
  "mothers day": "👩",
  "fathers day": "👨",
  friendship: "👯",
  "get well": "🏥",
  congratulations: "🎊",
  sympathy: "💐",
  "thank you": "🙏",
  birthdays: "🎂",
  parties: "🎉",
  celebrations: "🎊",
};

// Get an emoji for an occasion, with fallback
const getOccasionEmoji = (occasion: string): string => {
  const lowerOccasion = occasion.toLowerCase();

  // Check for exact match
  if (occasionIcons[lowerOccasion]) {
    return occasionIcons[lowerOccasion];
  }

  // Check for partial match
  for (const key of Object.keys(occasionIcons)) {
    if (lowerOccasion.includes(key) || key.includes(lowerOccasion)) {
      return occasionIcons[key];
    }
  }

  // Default emoji if no match found
  return "🎁";
};

const HomePage: React.FC = () => {
  const [occasions, setOccasions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOccasions = async () => {
      try {
        setLoading(true);
        const allOccasions = await fetchAllOccasions();
        setOccasions(allOccasions);
      } catch (err: any) {
        console.error("Error loading occasions:", err);
        setError(err.message || "Failed to load occasions");
      } finally {
        setLoading(false);
      }
    };

    loadOccasions();
  }, []);

  return (
    <Container>
      <Header>
        <Title>GiftFinder</Title>
        <Subtitle>Find the perfect gift for any occasion</Subtitle>
      </Header>

      {error && (
        <ErrorMessage>
          <strong>Error loading occasions:</strong> {error}
        </ErrorMessage>
      )}

      {loading ? (
        <LoadingMessage>Loading occasions...</LoadingMessage>
      ) : (
        <>
          <h2>Browse by Occasion</h2>
          <OccasionsGrid>
            {occasions.map((occasion) => (
              <OccasionCard
                key={occasion}
                to={`/occasion/${encodeURIComponent(occasion)}`}
              >
                <OccasionIcon>{getOccasionEmoji(occasion)}</OccasionIcon>
                <OccasionName>{occasion}</OccasionName>
              </OccasionCard>
            ))}
          </OccasionsGrid>
        </>
      )}
    </Container>
  );
};

export default HomePage;
