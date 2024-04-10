import { getServerSession } from "#auth";
import { z } from "zod";
import Blog from "~/server/models/blog.schema";
import mongoose from "mongoose";
import { validateBlogSchema } from "~/server/utils/zodIndex";

const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const body = await readValidatedBody(event, (body) =>
      validateBlogSchema.parse(body),
    );
    if (body.banner_url !== undefined && body.banner_url !== "") {
      const res: { image_url: string } = await $fetch(
        `${runtimeConfig.public.imageDomain}/upload`,
        {
          headers: {
            "x-api-key": runtimeConfig.imageXApiKey,
          },
          method: "POST",
          body: {
            image: body.banner_url,
          },
        },
      );
      body.banner_url = res.image_url;
    }
    await new Blog(body).save();
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
