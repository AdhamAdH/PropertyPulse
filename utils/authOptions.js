import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOpions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // inovke when successful sign in
    async signIn({ profile }) {
      //1. connect to data base
      await connectDB();
      //2. check if user exists
      const userExists = await User.findOne({ email: profile.email });
      //3. if not exists add user to data base
      if (!userExists) {
        //truncate username if its too long
        const username = profile.name.slice(0, 20);
        //save user to data base
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4. return true to allow the sign in
      return true;
    },

    // modifies the session object
    async session({ session }) {
      //1. get user from data base
      const user = await User.findOne({ email: session.user.email });
      //2. assign the user id to the session object
      session.user.id = user._id.toString();
      //3. return the session object
      return session;
    },
  },
};
