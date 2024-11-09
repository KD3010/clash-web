import axios from "axios";
import { AuthOptions, type ISODateString } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type ISession = {
    user?: IUser,
    expires: ISODateString
}

export type IUser = {
    id?: string | null
    name?: string | null
    email?: string | null
    token?: string | null
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async session({session, user, token}: {session: ISession, user: IUser, token: JWT}) {
            session.user = token.user as IUser;
            return session;
        },
        async jwt({token, user}: {token: JWT, user: IUser | null}) {
            if(user) {
                token.user = user;
            }
            return token;
        }
    },
    providers: [
        CredentialsProvider({
            credentials: {
              password: {}
            },
            async authorize(credentials, req) {
              const data = await axios.post("http://localhost:8000/api/auth/login", credentials);
              const user = data?.data;
        
              if (user) {
                return user
              } else {
                return null
              }
            }
          })
    ]
}