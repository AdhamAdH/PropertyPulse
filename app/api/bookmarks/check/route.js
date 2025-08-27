import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//POST: /api/bookmarks/check
export const POST = async (req) => {
  try {
    await connectDB();

    const { propertyId } = await req.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id Is Required", { status: 401 });
    }

    const { userId } = sessionUser;

    //Find User In Database
    const user = await User.findOne({ _id: userId });

    //Check If The Poperty Bookmarked Or Not
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went Wrong", { status: 500 });
  }
};
