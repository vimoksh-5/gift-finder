import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GiftIdea } from "../types";
import { fetchGiftIdeasByOccasion } from "../utils/googleSheetsApi";
import GiftList from "./GiftList";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const PriceFilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => (props.active ? "#4285f4" : "#e0e0e0")};
  color: ${(props) => (props.active ? "white" : "#333")};
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    background-color: ${(props) => (props.active ? "#3367d6" : "#d0d0d0")};
  }
`;

interface OccasionGiftsProps {
  occasion: string;
}

const OccasionGifts: React.FC<OccasionGiftsProps> = ({ occasion }) => {
  const [gifts, setGifts] = useState<GiftIdea[]>([]);
  const [filteredGifts, setFilteredGifts] = useState<GiftIdea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  // Price ranges for filtering
  const priceRanges = [
    { label: "Under ₹500", min: 0, max: 500 },
    { label: "₹500 - ₹1000", min: 500, max: 1000 },
    { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
    { label: "Above ₹2000", min: 2000, max: Infinity },
  ];

  useEffect(() => {
    const loadGifts = async () => {
      try {
        setLoading(true);
        const occasionGifts = await fetchGiftIdeasByOccasion(occasion);
        setGifts(occasionGifts);
        setFilteredGifts(occasionGifts);
      } catch (err: any) {
        console.error(`Error loading gifts for occasion ${occasion}:`, err);
        setError(err.message || "Failed to load gift ideas");
      } finally {
        setLoading(false);
      }
    };

    loadGifts();
  }, [occasion]);

  useEffect(() => {
    if (!priceFilter) {
      setFilteredGifts(gifts);
      return;
    }

    const range = priceRanges.find((range) => range.label === priceFilter);
    if (!range) {
      setFilteredGifts(gifts);
      return;
    }

    const filtered = gifts.filter((gift) => {
      const price = parseFloat(gift.price) || 0;
      return price >= range.min && price <= range.max;
    });

    setFilteredGifts(filtered);
  }, [priceFilter, gifts]);

  const handlePriceFilterClick = (label: string) => {
    setPriceFilter(priceFilter === label ? null : label);
  };

  return (
    <Container>
      <Title>Gift Ideas for {occasion}</Title>

      <PriceFilterContainer>
        <span>Filter by price: </span>
        {priceRanges.map((range) => (
          <FilterButton
            key={range.label}
            active={priceFilter === range.label}
            onClick={() => handlePriceFilterClick(range.label)}
          >
            {range.label}
          </FilterButton>
        ))}
        {priceFilter && (
          <FilterButton active={false} onClick={() => setPriceFilter(null)}>
            Clear Filter
          </FilterButton>
        )}
      </PriceFilterContainer>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <GiftList
        gifts={filteredGifts}
        loading={loading}
        emptyMessage={`No gift ideas found for ${occasion}${
          priceFilter ? ` in price range ${priceFilter}` : ""
        }.`}
      />
    </Container>
  );
};

export default OccasionGifts;
