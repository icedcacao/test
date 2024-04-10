import { getServerSession } from "#auth";
import Blog from "~/server/models/blog.schema";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const id = getRouterParam(event, "id");
    await Blog.findByIdAndDelete(id);
    return appConfig.success;
  } catch (error: any) {
    throw createError(appConfig.error.internalservererror);
  }
});
