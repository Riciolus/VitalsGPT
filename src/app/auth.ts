import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      console.log(token);
      return token;
    },
    async session({ session }) {
      // session.userId = token.userId;

      return session;
    },
  },
});
