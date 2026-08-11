import { z } from "zod";

export const contactInputSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254)
    .transform((value) => value.toLowerCase()),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more about the print.").max(4000),
  serviceInterest: z.string().trim().max(80).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
  consent: z.boolean().refine((value) => value === true, {
    message: "Confirm you agree to be contacted about this enquiry.",
  }),
});

export type ContactInput = z.infer<typeof contactInputSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput | "form", string>>;
