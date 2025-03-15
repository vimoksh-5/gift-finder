import React from "react";
import styled from "styled-components";
import { GiftIdea } from "../types";
import { trackButtonClick, trackGiftCardClick } from "../utils/tracking";

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 12px;
  background-color: #f8f9fa;
  padding: 8px;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  color: #333;
`;

const Description = styled.p`
  margin: 0 0 8px 0;
  color: #666;
`;

const Price = styled.p`
  font-weight: bold;
  color: #ff6b6b;
  margin: 0 0 8px 0;
`;

const Occasion = styled.p`
  color: #666;
  margin: 0 0 8px 0;
  font-style: italic;
`;

const Recipient = styled.p`
  color: #666;
  margin: 0 0 8px 0;
  font-style: italic;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 12px 0;

  span {
    margin-left: 5px;
    color: #666;
  }
`;

const Stars = styled.div`
  display: flex;
  color: #ffc107;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
`;

const LinkButton = styled.a`
  background-color: #ff6b6b;
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  display: inline-block;
  transition: background 0.3s ease;

  &:hover {
    background-color: #ff5252;
  }
`;

const SearchButton = styled(LinkButton)`
  background-color: #ff6b6b;

  &:hover {
    background-color: #ff5252;
  }
`;

interface GiftCardProps {
  gift: GiftIdea;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift }) => {
  // Handle image loading errors
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    const img = e.currentTarget;
    img.src = `https://em-content.zobj.net/source/apple/354/wrapped-gift_1f381.png`;
  };

  // Track purchase button click
  const handlePurchaseClick = () => {
    trackButtonClick("purchase", {
      gift_id: gift.id,
      gift_name: gift.name,
      gift_price: gift.price,
      gift_category: gift.category,
    });
  };

  // Track search button click
  const handleSearchClick = () => {
    trackButtonClick("search", {
      gift_id: gift.id,
      gift_name: gift.name,
      search_query: gift.search_query,
    });
  };

  // Track card click
  const handleCardClick = () => {
    trackGiftCardClick(gift.name, {
      gift_id: gift.id,
      gift_price: gift.price,
      gift_category: gift.category,
      gift_occasion: gift.occasion,
      gift_recipient: gift.recipient,
    });
  };

  // Render stars for rating
  const renderRating = () => {
    if (!gift.rating) return null;

    const stars = [];
    const fullStars = Math.floor(gift.rating);
    const hasHalfStar = gift.rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`}>★</span>);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<span key="half-star">½</span>);
    }

    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>);
    }

    return (
      <Rating>
        <Stars>{stars}</Stars>
        <span>({gift.rating}/5)</span>
      </Rating>
    );
  };

  return (
    <Card onClick={handleCardClick}>
      <Image src={gift.image_url} alt={gift.name} onError={handleImageError} />
      <Title>{gift.name}</Title>
      <Description>{gift.description}</Description>
      <Price>Price: {gift.price ? gift.price : "Not specified"}</Price>
      <Occasion>
        Occasion:{" "}
        {gift.occasion && gift.occasion.length > 0
          ? gift.occasion.join(", ")
          : "Any occasion"}
      </Occasion>
      <Recipient>
        For:{" "}
        {gift.recipient && gift.recipient.length > 0
          ? gift.recipient.join(", ")
          : "Anyone"}
      </Recipient>
      {gift.rating ? (
        renderRating()
      ) : (
        <p style={{ color: "#666", fontStyle: "italic", margin: "0 0 12px 0" }}>
          No rating available
        </p>
      )}
      <LinkContainer>
        {gift.purchase_link && (
          <LinkButton
            href={gift.purchase_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              handlePurchaseClick();
            }}
          >
            Purchase
          </LinkButton>
        )}
        <SearchButton
          href={gift.search_query}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            handleSearchClick();
          }}
        >
          Search Google
        </SearchButton>
      </LinkContainer>
    </Card>
  );
};

export default GiftCard;
