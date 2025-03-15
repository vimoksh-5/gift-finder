export interface GiftIdea {
  id: number;
  name: string;
  description: string;
  price: string;
  occasion: string[];
  recipient: string[];
  category?: string;
  image_url: string;
  purchase_link?: string;
  search_query: string;
  rating?: number;
}

export interface GoogleSheetsResponse {
  range: string;
  majorDimension: string;
  values: string[][];
}

// Price range options
export type PriceRange =
  | "< $5"
  | "< $10"
  | "< $25"
  | "< $50"
  | "< $100"
  | "< $500"
  | "> $500"
  | string;

// Occasion options
export type OccasionType =
  | "Birthday"
  | "Anniversary"
  | "Wedding"
  | "Graduation"
  | "Housewarming"
  | "Baby shower"
  | "Sympathy"
  | "Memorial"
  | "Get well"
  | "Thank you"
  | string;

// Recipient options
export type RecipientType =
  | "Women"
  | "Men"
  | "Any gender"
  | "Teens"
  | "Kids"
  | "Family"
  | "Friends"
  | "Memorial"
  | "Get well"
  | "Thank you"
  | string;
