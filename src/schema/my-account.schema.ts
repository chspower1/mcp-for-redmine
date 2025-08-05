import { z } from "zod";

export const GetMyAccountToolSchema = z.object({
  include: z
    .string()
    .optional()
    .describe("Comma-separated list of associations to include (e.g., memberships, groups)."),
});
