import { getServerSession } from "#auth";
import { z } from "zod";
import Food from "~/server/models/food.schema";
import { validateFoodAdminQuerySchema } from "~/server/utils/zodIndex";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const query = await getValidatedQuery(event, (query) =>
      validateFoodAdminQuerySchema.parse(query),
    );
    const filter = query.filter;
    const result = Food.find(appConfig.foodAdminFilter[filter], {
      "nutritional_value._id": 0,
    });
    return result;
  } catch (error: any) {
    if (z.instanceof(error)) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
