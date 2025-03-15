import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  fetchAllGiftIdeas,
  fetchAllOccasions,
  fetchAllRecipients,
  fetchAllPriceRanges,
} from "../utils/googleSheetsApi";
import OccasionCard from "../components/OccasionCard";
import GiftGrid from "../components/GiftGrid";
import GoogleFormEmbed from "../components/GoogleFormEmbed";
import { GiftIdea } from "../types";

const HeroSection = styled.section`
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  padding: 5rem 0;
  text-align: center;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const SearchBar = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto;

  input {
    flex-grow: 1;
    padding: 1rem;
    border: none;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
    outline: none;
  }

  button {
    padding: 1rem 2rem;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #ff5252;
    }
  }
`;

const Section = styled.section`
  padding: 4rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  color: #666;
`;

const OccasionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FiltersSection = styled.section`
  background-color: #fff;
  padding: 2rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const FiltersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FiltersTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  color: #333;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const ErrorMessage = styled.div`
  padding: 15px;
  margin: 20px;
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 4px;
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

interface HomePageProps {
  // Add any props if needed
}

const HomePage: React.FC<HomePageProps> = () => {
  const [occasions, setOccasions] = useState<string[]>([]);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [allGifts, setAllGifts] = useState<GiftIdea[]>([]);
  const [featuredGifts, setFeaturedGifts] = useState<GiftIdea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Filters
  const [selectedOccasion, setSelectedOccasion] = useState<string>("");
  const [selectedRecipient, setSelectedRecipient] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setApiError(null);

        // Fetch all occasions
        const occasionsData = await fetchAllOccasions();
        setOccasions(occasionsData);

        // Fetch all recipients
        const recipientsData = await fetchAllRecipients();
        setRecipients(recipientsData);

        // Fetch all price ranges
        const priceRangesData = await fetchAllPriceRanges();
        setPriceRanges(priceRangesData);

        // Fetch all gift ideas
        const giftsData = await fetchAllGiftIdeas();
        setAllGifts(giftsData);

        // Select random gifts to feature (up to 6)
        const shuffled = [...giftsData].sort(() => 0.5 - Math.random());
        setFeaturedGifts(shuffled.slice(0, 6));

        setLoading(false);
      } catch (error: any) {
        setApiError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort gifts based on selected filters
  const getFilteredGifts = () => {
    let filtered = [...allGifts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (gift) =>
          gift.name.toLowerCase().includes(query) ||
          gift.description.toLowerCase().includes(query)
      );
    }

    // Filter by occasion
    if (selectedOccasion) {
      filtered = filtered.filter((gift) =>
        gift.occasion.some(
          (occ) => occ.toLowerCase() === selectedOccasion.toLowerCase()
        )
      );
    }

    // Filter by recipient
    if (selectedRecipient) {
      filtered = filtered.filter((gift) =>
        gift.recipient.some(
          (rec) => rec.toLowerCase() === selectedRecipient.toLowerCase()
        )
      );
    }

    // Filter by price range
    if (selectedPriceRange) {
      filtered = filtered.filter((gift) => {
        // If the price exactly matches the selected range, include it
        if (gift.price === selectedPriceRange) return true;

        // Otherwise, parse the price and compare with the range
        const priceValue = parseFloat(gift.price.replace(/[^0-9.]/g, ""));
        if (isNaN(priceValue)) return false;

        // Handle different price range formats
        if (selectedPriceRange.startsWith("< $")) {
          const threshold = parseFloat(
            selectedPriceRange.replace(/[^0-9.]/g, "")
          );
          return priceValue < threshold;
        } else if (selectedPriceRange.startsWith("> $")) {
          const threshold = parseFloat(
            selectedPriceRange.replace(/[^0-9.]/g, "")
          );
          return priceValue > threshold;
        }

        return false;
      });
    }

    // Apply sorting based on selected option
    if (sortOption) {
      switch (sortOption) {
        case "rating_high_to_low":
          filtered.sort((a, b) => {
            const ratingA = a.rating || 0;
            const ratingB = b.rating || 0;
            return ratingB - ratingA;
          });
          break;
        case "price_low_to_high":
          filtered.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
            const priceB = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
            return priceA - priceB;
          });
          break;
        case "price_high_to_low":
          filtered.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
            const priceB = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
            return priceB - priceA;
          });
          break;
        default:
          // No sorting or default sorting
          break;
      }
    }

    return filtered;
  };

  // Handle search input
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The search query is already set via the input onChange
  };

  // Handle sort selection
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <div>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Find the Perfect Gift</HeroTitle>
          <HeroSubtitle>
            Discover thoughtful gift ideas for every occasion, person, and
            budget
          </HeroSubtitle>
          <form onSubmit={handleSearch}>
            <SearchBar>
              <input
                type="text"
                placeholder="Search for gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </SearchBar>
          </form>
        </HeroContent>
      </HeroSection>

      {apiError && (
        <ErrorMessage>
          <strong>Error:</strong> {apiError}
        </ErrorMessage>
      )}

      <FiltersSection>
        <FiltersContainer>
          <FiltersTitle>Filter Gift Ideas</FiltersTitle>
          <FiltersGrid>
            <FilterGroup>
              <FilterLabel htmlFor="occasion-filter">Occasion</FilterLabel>
              <FilterSelect
                id="occasion-filter"
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
              >
                <option value="">All Occasions</option>
                {occasions.map((occasion, index) => (
                  <option key={index} value={occasion}>
                    {occasion}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel htmlFor="recipient-filter">Recipient</FilterLabel>
              <FilterSelect
                id="recipient-filter"
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
              >
                <option value="">All Recipients</option>
                {recipients.map((recipient, index) => (
                  <option key={index} value={recipient}>
                    {recipient}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel htmlFor="price-filter">Price Range</FilterLabel>
              <FilterSelect
                id="price-filter"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="">All Prices</option>
                {priceRanges.map((price, index) => (
                  <option key={index} value={price}>
                    {price}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel htmlFor="sort-filter">Sort By</FilterLabel>
              <FilterSelect
                id="sort-filter"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="">Default</option>
                <option value="rating_high_to_low">Rating (High to Low)</option>
                <option value="price_low_to_high">Price (Low to High)</option>
                <option value="price_high_to_low">Price (High to Low)</option>
              </FilterSelect>
            </FilterGroup>
          </FiltersGrid>
        </FiltersContainer>
      </FiltersSection>

      <Section>
        <SectionTitle>Browse by Occasion</SectionTitle>
        <SectionSubtitle>
          Find the perfect gift for any special moment
        </SectionSubtitle>

        <OccasionsGrid>
          {loading ? (
            <p>Loading occasions...</p>
          ) : occasions.length > 0 ? (
            occasions.map((occasion, index) => (
              <OccasionCard key={index} occasion={occasion} />
            ))
          ) : (
            <p>No occasions found.</p>
          )}
        </OccasionsGrid>
      </Section>

      <Section style={{ background: "#f9f9f9" }}>
        <Container>
          <SectionTitle>
            {searchQuery ||
            selectedOccasion ||
            selectedRecipient ||
            selectedPriceRange ||
            sortOption
              ? "Filtered Gift Ideas"
              : "Featured Gift Ideas"}
          </SectionTitle>
          <SectionSubtitle>
            {searchQuery ||
            selectedOccasion ||
            selectedRecipient ||
            selectedPriceRange ||
            sortOption
              ? "Gifts matching your criteria"
              : "Handpicked suggestions our community loves"}
          </SectionSubtitle>

          <GiftGrid
            gifts={
              searchQuery ||
              selectedOccasion ||
              selectedRecipient ||
              selectedPriceRange ||
              sortOption
                ? getFilteredGifts()
                : featuredGifts
            }
            loading={loading}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle>Share Your Gift Ideas</SectionTitle>
          <SectionSubtitle>
            Have a great gift suggestion? Share it with our community and help
            others find the perfect present.
          </SectionSubtitle>

          <SubmitSection>
            <p style={{ marginBottom: "1.5rem", color: "#555" }}>
              We'd love to hear about your favorite gift ideas! Your suggestions
              will help others find the perfect gifts for their loved ones.
            </p>
            <SubmitButton to="/submission">Submit Your Gift Idea</SubmitButton>
          </SubmitSection>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;
