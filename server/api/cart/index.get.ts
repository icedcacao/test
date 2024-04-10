import { getServerSession } from "#auth";
import { z } from "zod";
import Cart from "~/server/models/cart.schema";
import mongoose from "mongoose";
import { validateCartAdminQuerySchema } from "~/server/utils/zodIndex";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const query = await getValidatedQuery(event, (query) =>
      validateCartAdminQuerySchema.parse(query),
    );
    const filter = query.filter;
    const sort = query.sort;
    const result = await Cart.find(appConfig.cartAdminFilter[filter]).sort(
      appConfig.cartAdminSort[sort],
    );
    return result;
  } catch (error: any) {
    if (z.instanceof(error)) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
