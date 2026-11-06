import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
  const { data, error } = await authClient.token();

  if (error) {
    console.error("Failed to generate authentication token:", error);
    throw new Error("Could not generate authentication token.");
  }

  if (!data?.token) {
    throw new Error("Authentication token not found.");
  }

  return data.token;
};
