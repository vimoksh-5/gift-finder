import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import {
  fetchGiftIdeasByOccasion,
  fetchAllRecipients,
} from "../utils/googleSheetsApi";
import GiftGrid from "../components/GiftGrid";
import { GiftIdea } from "../types";

const PageHeader = styled.div`
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  padding: 3rem 0;
  color: white;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  color: white;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  &:before {
    content: "←";
    margin-right: 0.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 20px;
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background: ${(props) => (props.active ? "#ff6b6b" : "#f0f0f0")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.active ? "#ff5252" : "#e0e0e0")};
  }
`;

const RecipientFilter = styled(FilterSection)`
  margin-top: 1.5rem;
`;

const SortButton = styled(FilterButton)`
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
  }
`;

type PriceFilterType = "all" | "under25" | "25to50" | "50to100" | "over100";

interface OccasionPageParams {
  occasion: string;
}

const OccasionPage: React.FC = () => {
  const { occasion } = useParams<OccasionPageParams>();
  const [gifts, setGifts] = useState<GiftIdea[]>([]);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [priceFilter, setPriceFilter] = useState<PriceFilterType>("all");
  const [selectedRecipient, setSelectedRecipient] = useState<string>("all");
  const [sortByRating, setSortByRating] = useState<boolean>(false);

  // Convert the URL parameter to a readable occasion name
  const occasionName = occasion?.replace(/-/g, " ") || "";

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);

        // Fetch gift ideas for this occasion
        const giftData = await fetchGiftIdeasByOccasion(occasionName);
        setGifts(giftData);

        // Fetch all recipients for filtering
        const recipientsData = await fetchAllRecipients();
        setRecipients(recipientsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (occasionName) {
      fetchData();
    }
  }, [occasionName]);

  // Filter and sort gifts
  const getFilteredGifts = () => {
    let filtered = [...gifts];

    // Filter by price range
    if (priceFilter !== "all") {
      if (priceFilter === "under25") {
        filtered = filtered.filter((gift) => {
          if (!gift.price) return false;
          const priceValue = parseFloat(gift.price.replace(/[^0-9.]/g, ""));
          return !isNaN(priceValue) && priceValue < 25;
        });
      } else if (priceFilter === "25to50") {
        filtered = filtered.filter((gift) => {
          if (!gift.price) return false;
          const priceValue = parseFloat(gift.price.replace(/[^0-9.]/g, ""));
          return !isNaN(priceValue) && priceValue >= 25 && priceValue <= 50;
        });
      } else if (priceFilter === "50to100") {
        filtered = filtered.filter((gift) => {
          if (!gift.price) return false;
          const priceValue = parseFloat(gift.price.replace(/[^0-9.]/g, ""));
          return !isNaN(priceValue) && priceValue > 50 && priceValue <= 100;
        });
      } else if (priceFilter === "over100") {
        filtered = filtered.filter((gift) => {
          if (!gift.price) return false;
          const priceValue = parseFloat(gift.price.replace(/[^0-9.]/g, ""));
          return !isNaN(priceValue) && priceValue > 100;
        });
      }
    }

    // Filter by recipient
    if (selectedRecipient !== "all") {
      filtered = filtered.filter((gift) =>
        gift.recipient.some(
          (rec) => rec.toLowerCase() === selectedRecipient.toLowerCase()
        )
      );
    }

    // Sort by rating if selected
    if (sortByRating) {
      filtered.sort((a, b) => {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return ratingB - ratingA;
      });
    }

    return filtered;
  };

  if (!occasionName) {
    return <div>Occasion not found</div>;
  }

  return (
    <div>
      <PageHeader>
        <HeaderContent>
          <BackLink to="/">Back to all occasions</BackLink>
          <Title>{occasionName} Gift Ideas</Title>
          <Subtitle>
            Find the perfect {occasionName} gift for your loved ones
          </Subtitle>
        </HeaderContent>
      </PageHeader>

      <Container>
        <FilterSection>
          <FilterTitle>Filter by Price Range</FilterTitle>
          <FilterOptions>
            <FilterButton
              active={priceFilter === "all"}
              onClick={() => setPriceFilter("all")}
            >
              All Prices
            </FilterButton>
            <FilterButton
              active={priceFilter === "under25"}
              onClick={() => setPriceFilter("under25")}
            >
              Under $25
            </FilterButton>
            <FilterButton
              active={priceFilter === "25to50"}
              onClick={() => setPriceFilter("25to50")}
            >
              $25 - $50
            </FilterButton>
            <FilterButton
              active={priceFilter === "50to100"}
              onClick={() => setPriceFilter("50to100")}
            >
              $50 - $100
            </FilterButton>
            <FilterButton
              active={priceFilter === "over100"}
              onClick={() => setPriceFilter("over100")}
            >
              Over $100
            </FilterButton>
          </FilterOptions>
        </FilterSection>

        <RecipientFilter>
          <FilterTitle>Filter by Recipient</FilterTitle>
          <FilterOptions>
            <FilterButton
              active={selectedRecipient === "all"}
              onClick={() => setSelectedRecipient("all")}
            >
              All Recipients
            </FilterButton>
            {recipients.map((recipient, index) => (
              <FilterButton
                key={index}
                active={selectedRecipient === recipient}
                onClick={() => setSelectedRecipient(recipient)}
              >
                {recipient}
              </FilterButton>
            ))}
          </FilterOptions>
        </RecipientFilter>

        <RecipientFilter>
          <FilterTitle>Sort Options</FilterTitle>
          <FilterOptions>
            <SortButton
              active={sortByRating}
              onClick={() => setSortByRating(!sortByRating)}
            >
              {sortByRating ? "★ Rating (High to Low)" : "Sort by Rating"}
            </SortButton>
          </FilterOptions>
        </RecipientFilter>

        <GiftGrid gifts={getFilteredGifts()} loading={loading} />
      </Container>
    </div>
  );
};

export default OccasionPage;
