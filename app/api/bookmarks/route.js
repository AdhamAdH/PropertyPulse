import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//GET /api/bookmarks
export const GET = async (req) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id Is Required", { status: 401 });
    }

    const { userId } = sessionUser;

    //Find User In Database
    const user = await User.findOne({ _id: userId });

    //Get User Bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went Wrong", { status: 500 });
  }
};

//POST: /api/bookmarks
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

    let message;

    if (isBookmarked) {
      //The Poperty Is Bookmarked, Remove It
      user.bookmarks.pull(propertyId);
      message = "Bookmark Removed";
      isBookmarked = false;
    } else {
      //The Poperty Is Not Bookmarked, Add It
      user.bookmarks.push(propertyId);
      message = "Bookmark Added";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went Wrong", { status: 500 });
  }
};
