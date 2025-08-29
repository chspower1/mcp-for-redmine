import { z } from "zod";

// Tool Parameter Schemas for My Account API (v4.1 Alpha)
export const GetMyAccountToolSchema = z.object({
  include: z
    .string()
    .optional()
    .describe("Comma-separated list of associations to include (memberships, groups) for comprehensive user information"),
}).describe("Retrieve current user's account information with optional associated data");
