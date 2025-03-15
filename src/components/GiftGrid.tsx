import React from "react";
import styled from "styled-components";
import GiftCard from "./GiftCard";
import { GiftIdea } from "../types";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 2rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #666;
  }

  p {
    color: #888;
  }
`;

interface GiftGridProps {
  gifts: GiftIdea[];
  loading: boolean;
}

const GiftGrid: React.FC<GiftGridProps> = ({ gifts, loading }) => {
  if (loading) {
    return (
      <EmptyState>
        <h3>Loading gift ideas...</h3>
        <p>Please wait while we fetch the best gift suggestions for you.</p>
      </EmptyState>
    );
  }

  if (!gifts || gifts.length === 0) {
    return (
      <EmptyState>
        <h3>No gift ideas found</h3>
        <p>
          Try selecting a different occasion or check back later for new ideas.
        </p>
      </EmptyState>
    );
  }

  return (
    <Grid>
      {gifts.map((gift) => (
        <GiftCard key={gift.id} gift={gift} />
      ))}
    </Grid>
  );
};

export default GiftGrid;
