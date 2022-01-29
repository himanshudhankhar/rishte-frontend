import "./login.module.css";
import { useRef, useEffect } from "react";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { signIn, getSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace("/homepage")
      }
    })

  }, [router])

  async function handleSubmit(event) {
    event.preventDefault();

    var email = emailRef.current.value;
    if (email == "") {
      alert("Email cannot be empty");
      return;
    }
    if (!email.includes("@")) {
      alert("Email is not valid");
      return;
    }
    var password = passwordRef.current.value;
    if (password == "") {
      alert("Password cannot be empty");
      return;
    }
    // var reqBody = {
    //   email: email,
    //   password: password,
    // };
    // fetch("/api/login", {
    //   method: "POST",
    //   body: JSON.stringify(reqBody),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.success == true) {
    //       emailRef.current.value = "";
    //       passwordRef.current.value = "";
    //       alert("login successful");
    //       return;
    //     }
    //     if (data.success == null || data.success == false) {
    //         alert(data.error);
    //         return
    //     }
    //   });
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    console.log(result);
    if (!result.error) {
      router.replace("/homepage");
    } else {
      alert(result.error)
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="me@example.com"
            required
            id="email"
            ref={emailRef}
          />
        </div>
        <div>
          <label>Password</label>
          <input type="password" required id="password" ref={passwordRef} />
        </div>
        <div>
          <button onClick={handleSubmit}>Submit</button>
          <button type="link">Forgot</button>
        </div>
      </form>
    </div>
  );
}
