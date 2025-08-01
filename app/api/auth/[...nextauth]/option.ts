import { sql } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

type DBUser = {
  id: number;
  email: string;
  password: string;
  role: "user" | "admin";
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = await sql<DBUser>`
          SELECT * FROM users WHERE email = ${credentials?.email}
        `;
        const user = result[0];

        if (user && user.password === credentials?.password) {
          return {
            id: String(user.id),
            email: user.email,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
