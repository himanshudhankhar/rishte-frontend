import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials, req) {
        //golang api for login
        const email = credentials.email;
        const password = credentials.password;
        var instance = axios.create({
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        });
        var err, user;
        let response = await instance
          .post("http://localhost:5000/login", {
            Username: email,
            password: password,
          })
        
        console.log(response.data)
        let userData = response.data;
        if (userData.success) {
          return {email: userData.username}
        } else {
          throw new Error(userData.error) 
        }
      },
    }),
  ],
});
