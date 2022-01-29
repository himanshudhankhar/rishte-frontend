const axios = require("axios");

export default function loginHandler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const password = req.body.password;

    var instance = axios.create({
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    });
    instance
      .post("http://localhost:5000/login", {
        Username: req.body.email,
        password: req.body.password,
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
