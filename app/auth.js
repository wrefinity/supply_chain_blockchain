import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const {
    handlers:{GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            authorization:{
                params:{
                    prompt:"consent",
                    access_type:"offline",
                    response_type:"code",
                }
            }
        })
    ]
})