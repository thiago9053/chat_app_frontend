import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, _req) => {
        try {
          console.log(credentials);
          const res: any = await fetch(`http://localhost:1211/user/login`, {
            method: "POST",
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();

          //const user: User = { id: "1" };
          if (data) {
            console.log(31, data);
            return data;
          }
          return null; // Add this line to satisfy the `authorize` typings
        } catch (e: any) {
          //const errorMessage = e.response.data.message;
          //throw new Error(errorMessage);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt(a) {
      const { token, user } = a;
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
