import { getServerSession } from "#auth";
import { z } from "zod";
import Food from "~/server/models/food.schema";
import mongoose from "mongoose";
import { validateFoodSchema } from "~/server/utils/zodIndex";
const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const body = await readValidatedBody(event, (body) =>
      validateFoodSchema.parse(body),
    );
    console.log(body);
    if (body.image_url !== undefined && body.image_url !== "") {
      const res: { image_url: string } = await $fetch(
        `${runtimeConfig.public.imageDomain}/upload`,
        {
          headers: {
            "x-api-key": runtimeConfig.imageXApiKey,
          },
          method: "POST",
          body: {
            image: body.image_url,
          },
        },
      );
      body.image_url = res.image_url;
    }
    await new Food(body).save();
    return appConfig.success;
  } catch (error: any) {
    if (
      error.statusCode == 400 ||
      z.instanceof(error) ||
      error instanceof mongoose.Error.ValidationError
    ) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
