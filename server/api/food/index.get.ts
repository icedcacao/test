import Food from "~/server/models/food.schema";
const appConfig = useAppConfig();

// Sorting descending
export default defineEventHandler(async (event) => {
  try {
    const result = Food.find({ is_displayed: true }).sort({ updated_at: -1 });
    return result;
  } catch (error) {
    throw createError(appConfig.error.internalservererror);
  }
});
