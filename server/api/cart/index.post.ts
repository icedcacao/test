import { getServerSession } from "#auth";
import { z } from "zod";
import Cart from "~/server/models/cart.schema";
import mongoose from "mongoose";
import { validateCartSchema } from "~/server/utils/zodIndex";

const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const body = await readValidatedBody(event, (body) =>
      validateCartSchema.parse(body),
    );
    await new Cart(body).save();
    // Adding fcm for push notification here!
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
