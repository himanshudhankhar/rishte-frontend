import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        //golang api for login
        const email = credentials.email;
        const password = credentials.password;
        var instance = axios.create({
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        });
        var err, user;
        await instance
          .post("http://localhost:5000/login", {
            Username: email,
            password: password,
          })
          .then(function (response) {
            console.log(response.data);
            console.log(response.status);
            const data = response.data;
            if (data.success == false) {
              //todo for failure
              err = new Error("User Details invalid");
              return;
            }
            if (data.success == true) {
              console.log("reached here");
              user = { username: email };
              return { username: email };
            }
          })
          .catch(function (error) {
            //Todo for 500
            err = new Error("Internal server error");
            return;
          });

        if (user) {
          return user;
        } else {
          throw err;
        }
      },
    }),
  ],
});
