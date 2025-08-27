import NextAuth from "next-auth";
import { authOpions } from "@/utils/authOptions";

const handler = NextAuth(authOpions);

export { handler as GET, handler as POST };
