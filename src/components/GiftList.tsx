import React from "react";
import styled from "styled-components";
import { GiftIdea } from "../types";
import GiftCard from "./GiftCard";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 20px 0;
  color: #666;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px;
  color: #4285f4;
`;

interface GiftListProps {
  gifts: GiftIdea[];
  loading?: boolean;
  emptyMessage?: string;
}

const GiftList: React.FC<GiftListProps> = ({
  gifts,
  loading = false,
  emptyMessage = "No gift ideas found.",
}) => {
  if (loading) {
    return <LoadingContainer>Loading gift ideas...</LoadingContainer>;
  }

  if (gifts.length === 0) {
    return <EmptyMessage>{emptyMessage}</EmptyMessage>;
  }

  return (
    <ListContainer>
      {gifts.map((gift) => (
        <GiftCard key={gift.id} gift={gift} />
      ))}
    </ListContainer>
  );
};

export default GiftList;
