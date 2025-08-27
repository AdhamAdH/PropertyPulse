import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//PUT: /api/messages/:id
export const PUT = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID Is Required", {
        status: 401,
      });
    }
    const { userId } = sessionUser;

    const message = await Message.findById(id);

    //Verify Ownership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    //Update message status to read/unread
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

//DELETE: /api/messages/:id
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID Is Required", {
        status: 401,
      });
    }
    const { userId } = sessionUser;

    const message = await Message.findById(id);

    //Verify Ownership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await message.deleteOne();

    return new Response("Message Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
