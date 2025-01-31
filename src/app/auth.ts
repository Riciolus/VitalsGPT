import db from "@/db";
import { usersTable } from "@/db/schema/users";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { or, eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        emailOrUsername: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { emailOrUsername, password } = credentials;

        if (!credentials?.emailOrUsername || !credentials.password) {
          throw new Error("Credentials not found");
        }

        try {
          if (
            !emailOrUsername ||
            typeof emailOrUsername !== "string" ||
            !password ||
            typeof password !== "string"
          ) {
            throw new Error("Invalid Credentials");
          }

          const user = await db
            .select()
            .from(usersTable)
            .where(
              or(eq(usersTable.email, emailOrUsername), eq(usersTable.username, emailOrUsername))
            )
            .limit(1)
            .then((result) => result[0]);

          if (!user) {
            return null;
          }

          const isValidPassword = await compare(password, user.password);

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error(error);
          throw new Error("Oops, something went wrong!");
        }
      },
    }),
    Google,
    GitHub,
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const userDb = await db
            .select()
            .from(usersTable)
            .where(or(eq(usersTable.email, profile?.email as string)))
            .limit(1)
            .then((result) => result[0]);

          if (userDb) {
            user.id = userDb.id;

            return true;
          }

          const createUser = await db
            .insert(usersTable)
            .values({
              email: profile?.email as string,
              username: profile?.name as string,
              password: "",
            })
            .returning({ id: usersTable.id });

          if (!createUser[0].id) {
            return false;
          }

          user.id = createUser[0].id;

          return true;
        } catch {
          return false;
        }
      }

      if (account?.provider === "credentials") {
        return true;
      }

      return false;
    },

    async jwt({ token, user }) {
      // When a user logs in, attach their ID to the token
      if (user) {
        token.id = user.id;
        token.picture = "dummyAva.jpg";
        token.username = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      // Attach the user ID from the token to the session object
      if (token && token.id) {
        session.user.id = token.id as string;
        session.user.image = token.picture;
        session.user.name = token.username as string;
      }

      return session;
    },
  },
});
