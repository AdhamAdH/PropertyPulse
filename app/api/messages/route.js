import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//GET: /api/messages
export const GET = async (req) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID Is Required", {
        status: 401,
      });
    }
    const { userId } = sessionUser;

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) //Sort By Date
      .populate("property", "name");

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) //Sort By Date
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", {
      status: 200,
    });
  }
};

//POST: /api/messages
export const POST = async (req) => {
  try {
    await connectDB();

    const { name, email, phone, message, recipient, property } =
      await req.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ message: "You need to sign in to send messages" }),
        {
          status: 401,
        }
      );
    }

    const { userId } = sessionUser;

    //Connot Send Messages To Self
    if (recipient === userId) {
      return new Response(
        JSON.stringify({ message: "You Cannot Send Messages To Yourself" }),
        {
          status: 400,
        }
      );
    }

    const newMessage = new Message({
      sender: userId,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message Sent Successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", {
      status: 200,
    });
  }
};
