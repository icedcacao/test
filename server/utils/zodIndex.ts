import { z } from "zod";

const appConfig = useAppConfig();

// GET Query
export const validateFoodAdminQuerySchema = z
  .object({
    filter: z
      .string()
      .transform((val) => val.trim())
      .default("0"),
  })
  .strict()
  .refine((data) => appConfig.foodAdminFilter[data.filter] !== undefined, {
    path: ["filter"],
    message: "Filter is invalid",
  });

export const validateCartAdminQuerySchema = z
  .object({
    filter: z
      .string()
      .transform((val) => val.trim())
      .default("0"),
    sort: z
      .string()
      .transform((val) => val.trim())
      .default("0"),
  })
  .strict()
  .refine((data) => appConfig.cartAdminFilter[data.filter] !== undefined, {
    path: ["filter"],
    message: "Filter is invalid",
  })
  .refine((data) => appConfig.cartAdminSort[data.sort] !== undefined, {
    path: ["sort"],
    message: "Sort is invalid",
  });

export const validateBlogAdminQuerySchema = z
  .object({
    sort: z
      .string()
      .transform((val) => val.trim())
      .default("0"),
    page: z
      .string()
      .transform((val) => parseInt(val))
      .default("1"),
    limit: z
      .string()
      .transform((val) => parseInt(val))
      .default("1"),
  })
  .strict()
  .refine((data) => appConfig.blogAdminSort[data.sort] !== undefined, {
    path: ["sort"],
    message: "Sort is invalid",
  })
  .refine((data) => data.page >= 1, {
    path: ["page"],
    message: "Page is invalid",
  })
  .refine((data) => data.limit >= 1, {
    path: ["limit"],
    message: "Limit is invalid",
  });

// POST Query

// All partial error handling in mongoose validation error
export const validateFoodSchema = z
  .object({
    name: z.string().transform((val) => val.trim()),
    image_url: z.string().transform((val) => val.trim()),
    price: z.number(),
    category: z.string().transform((val) => val.trim()),
    description: z.string().transform((val) => val.trim()),
    is_displayed: z.boolean(),
    nutritional_value: z
      .object({
        protein: z.number(),
        carbs: z.number(),
        fat: z.number(),
        fiber: z.number(),
      })
      .partial()
      .strict(),
  })
  .partial()
  .strict();

// Food here is _id
export const validateCartSchema = z
  .object({
    orders: z.array(
      z
        .object({
          food: z.string().transform((val) => val.trim()),
          quantity: z.number(),
        })
        .partial()
        .strict(),
    ),
    grand_total: z.number(),
    phone_number: z.string().transform((val) => val.trim()),
    delivery_address: z.string().transform((val) => val.trim()),
    is_resolved: z.boolean(),
  })
  .partial()
  .strict();

export const validateBlogSchema = z
  .object({
    title: z.string().transform((val) => val.trim()),
    banner_url: z.string().transform((val) => val.trim()),
    paragraphs: z.array(z.string().transform((val) => val.trim())),
  })
  .partial()
  .strict();
