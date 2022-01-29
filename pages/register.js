import { useRouter } from "next/router";

export default function RegisterPage() {
    let router = useRouter();
    function handleRegister(event) {
        
    event.preventDefault();
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let profileFor = document.getElementById("profileFor").value;
    let religion = document.getElementById("religion").value;
    let community = document.getElementById("community").value;
    let email = document.getElementById("emailRegister").value;
    let mobile = document.getElementById("mobile").value;
    let password = document.getElementById("passwordRegister").value;
    let dob = document.getElementById("dob").value;
    let country = document.getElementById("country").value;
    let gender = document.getElementById("gender").value;

    let reqObject = {
      firstname,
      lastname,
      profileFor,
      religion,
      community,
      email,
      mobile,
      password,
      dob,
      country,
      gender,
    };

    console.log(reqObject);
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(reqObject),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success == true) {
            alert("signup successful");
            document.getElementById("firstname").value = "";
            document.getElementById("lastname").value = "";
            document.getElementById("profileFor").value = "";
            document.getElementById("religion").value = "";
            document.getElementById("community").value = "";
            document.getElementById("emailRegister").value = "";
            document.getElementById("mobile").value = "";
            document.getElementById("passwordRegister").value = "";
            document.getElementById("dob").value = "";
            document.getElementById("country").value = "";
            document.getElementById("gender").value = "";
            router.push("/login")
          return;
        }
        if (data.success == null || data.success == false) {
          alert(data.error);
          return;
        }
      });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid black",
            marginBottom: 10,
          }}
        >
          <div>
            <label>FirstName:</label>
            <input type="text" required id="firstname" />
          </div>
          <div>
            <label>Lastname</label>
            <input type="text" required id="lastname" />
          </div>
          <div>
            <label>ProfileFor</label>
            <select name="profileFor" id="profileFor">
              <option value="Self">Self</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Friend">Friend</option>
              <option value="Relative">Relative</option>
            </select>
          </div>

          <div>
            <label>Religion</label>
            <select name="religion" id="religion">
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Jain">Jain</option>
              <option value="Sikh">Sikh</option>
              <option value="Buddhist">Buddhist</option>
              <option value="Parsi">Parsi</option>
              <option value="Jewish">Jewish</option>
              <option value="Other">Other</option>
              <option value="No Religion">No Religion</option>
              <option value="Spiritual - not religious">Spiritual</option>
            </select>
          </div>
          <div>
            <label>Community/Caste</label>
            <input type="text" required id="community" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid black",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <div>
            <label>EmailID:</label>
            <input type="email" required id="emailRegister" />
          </div>
          <div>
            <label>Mobile Number</label>
            <input type="number" required id="mobile" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" required id="passwordRegister" />
          </div>
          <div>
            <label>Date of Birth</label>
            <input type="date" id="dob" name="dob"></input>
          </div>
          <div>
            <label>Country</label>
            <input type="text" required id="country" />
          </div>
          <div>
            <label>Gender</label>
            <select name="gender" id="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div>
          <button onClick={handleRegister}>Signup</button>
        </div>
      </form>
    </div>
  );
}
