const axios = require("axios");

export default function signupHandler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    var instance = axios.create({
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    });
    instance
      .post("http://localhost:5000/signup", {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        profileFor: req.body.profileFor,
        religion: req.body.religion,
        community: req.body.community,
        email: req.body.email,
        mobileNumber: Number(req.body.mobile),
        password: req.body.password,
        dob: req.body.dob,
        country: req.body.country,
        gender: req.body.gender,
      })
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        const data = response.data;
        if (data.success == false) {
          res.status(response.status).json({ error: data.error });
          return;
        }
        if (data.success == true) {
          res.status(200).json(data);
          return;
        }
      })
      .catch(function (error) {
        res.status(500).json({ error: "Internal server error" });
        return;
      });
  }
}
