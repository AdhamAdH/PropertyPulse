import { getServerSession } from "next-auth/next";
import { authOpions } from "./authOptions";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOpions);

    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
