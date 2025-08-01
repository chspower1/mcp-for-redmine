import { z } from "zod";

export const RedmineReferenceSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type RedmineReference = z.infer<typeof RedmineReferenceSchema>;
