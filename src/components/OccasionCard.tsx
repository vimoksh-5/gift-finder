import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Map of occasions to emoji icons
const occasionIcons: Record<string, string> = {
  birthday: "🎂",
  wedding: "💍",
  anniversary: "💝",
  christmas: "🎄",
  "valentines day": "❤️",
  "mothers day": "👩‍👧",
  "fathers day": "👨‍👦",
  graduation: "🎓",
  housewarming: "🏠",
  "baby shower": "👶",
  retirement: "🌴",
  thanksgiving: "🦃",
  halloween: "🎃",
  easter: "🐰",
  "new year": "🎉",
  default: "🎁",
};

const Card = styled(Link)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: #fff9f9;
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
  text-transform: capitalize;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

interface OccasionCardProps {
  occasion: string;
}

const OccasionCard: React.FC<OccasionCardProps> = ({ occasion }) => {
  // Convert occasion to lowercase for icon lookup
  const occasionLower = occasion.toLowerCase();

  // Get the icon for this occasion, or use default
  const icon = occasionIcons[occasionLower] || occasionIcons.default;

  // Create a URL-friendly version of the occasion name
  const occasionSlug = occasion.toLowerCase().replace(/\s+/g, "-");

  return (
    <Card to={`/occasion/${occasionSlug}`}>
      <Icon>{icon}</Icon>
      <Title>{occasion}</Title>
      <Description>
        Find the perfect gift for {occasion.toLowerCase()}
      </Description>
    </Card>
  );
};

export default OccasionCard;
