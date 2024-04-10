import { z } from "zod";
import Blog from "~/server/models/blog.schema";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";
import { validateBlogAdminQuerySchema } from "~/server/utils/zodIndex";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  try {
    const title: any = getRouterParam(event, "title");
    const query = await getValidatedQuery(event, (query) =>
      validateBlogAdminQuerySchema.parse(query),
    );
    const sort = query.sort;
    const page = query.page;
    const limit = query.limit;
    const result = await Blog.find({
      title: new RegExp(`.*${escapeStringRegexp(title)}.*`, "i"),
    })
      .sort(appConfig.blogAdminSort[sort])
      .skip((page - 1) * limit)
      .limit(limit);
    return result;
  } catch (error: any) {
    if (z.instanceof(error)) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
