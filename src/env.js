// Environment variables - DO NOT hardcode actual values here
// This file detects the current environment and loads the appropriate variables

// Detect if we're in production
const isProduction = process.env.NODE_ENV === 'production';

// Load environment variables based on environment
export const GOOGLE_SHEETS_API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY || "your_api_key_here";
export const GOOGLE_SHEETS_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID || "your_sheet_id_here";
export const GOOGLE_SHEETS_NAME = process.env.REACT_APP_GOOGLE_SHEETS_NAME || "your_sheet_name_here";
export const GOOGLE_FORM_URL = process.env.REACT_APP_GOOGLE_FORM_URL || "your_form_url_here";

// Export the environment flag for use in other parts of the application
export const IS_PRODUCTION = isProduction; 