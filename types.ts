import z from "zod";

export const FormData = z.object({
  name: z.string().min(3, { message: "Must be at least 3 characters" }),
  username: z
    .union([
      z.string().length(0),
      z.string().min(2, { message: "Must be at least 2 characters" }),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  email: z.string().email({ message: "Must be a valid email" }),
  password: z.string().min(6, { message: "Must be at least 6 characters" }),
});

export type FlattenedFormErrors = z.inferFlattenedErrors<typeof FormData>;
