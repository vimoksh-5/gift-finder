import { IS_PRODUCTION } from "../env";

/**
 * Returns different values based on the current environment
 * @param devValue The value to use in development
 * @param prodValue The value to use in production
 * @returns The appropriate value for the current environment
 */
export const getEnvValue = <T>(devValue: T, prodValue: T): T => {
  return IS_PRODUCTION ? prodValue : devValue;
};

/**
 * Returns the base URL for the application based on the environment
 * @returns The base URL
 */
export const getBaseUrl = (): string => {
  return getEnvValue(
    "http://localhost:1234", // Development URL
    "https://your-production-domain.com" // Production URL - replace with your actual domain
  );
};

/**
 * Returns the API URL based on the environment
 * @returns The API URL
 */
export const getApiUrl = (): string => {
  return getEnvValue(
    "https://sheets.googleapis.com/v4/spreadsheets", // Development API URL
    "https://sheets.googleapis.com/v4/spreadsheets" // Production API URL (same in this case)
  );
};
