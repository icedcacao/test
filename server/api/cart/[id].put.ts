import { getServerSession } from "#auth";
import { z } from "zod";
import Cart from "~/server/models/cart.schema";
import mongoose from "mongoose";
import { validateCartSchema } from "~/server/utils/zodIndex";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const id = getRouterParam(event, "id");
    const body = await readValidatedBody(event, (body) =>
      validateCartSchema.parse(body),
    );
    await Cart.findByIdAndUpdate(id, body);
    return appConfig.success;
  } catch (error: any) {
    if (
      z.instanceof(error) ||
      error instanceof mongoose.Error.ValidationError
    ) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
