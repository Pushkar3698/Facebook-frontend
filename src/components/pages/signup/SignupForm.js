import React, { useState, useRef, useEffect } from "react";
import { userData } from "./data";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { API_URL } from "../../api-url/api";
import Loader from "../../components/Loader/Loader";

export const SignupForm = () => {
  const [userDetails, setuserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    dobDate: "",
    dobMonth: "",
    dobYear: "",
  });

  const [loading, setloading] = useState(false);

  const [error, seterror] = useState({
    error: false,
    message: null,
  });

  const { dates, months, years } = userData;

  const maleRef = useRef();
  const femaleRef = useRef();
  const customRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const dobDateRef = useRef();
  const dobMonthRef = useRef();
  const dobYearRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (error.error) {
        seterror((prev) => {
          return {
            error: false,
            message: null,
          };
        });
        setloading(false);
      }
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [error]);

  const getDateOfbirth = (ref, val) => {
    setuserDetails((prev) => {
      const newObj = { ...prev };
      newObj[val] = ref.current.value;
      return newObj;
    });
  };

  const getUserDetails = (ref, val) => {
    setuserDetails((prev) => {
      const newObj = { ...prev };
      newObj[val] = ref.current.value;
      return newObj;
    });
  };

  const selectGender = (ref) => {
    if (ref.current.value === userDetails.gender) {
      return;
    }
    setuserDetails((prev) => {
      return {
        ...prev,
        gender: ref.current.value,
      };
    });
    [customRef, maleRef, femaleRef].forEach((el, i) => {
      el.current.checked = false;
    });
    ref.current.checked = true;
  };

  const onSubmit = async (data) => {
    const {
      firstname,
      lastname,
      email,
      password,
      gender,
      dobDate,
      dobMonth,
      dobYear,
    } = data;

    // if (
    //   firstname === "" ||
    //   !email.includes("@") ||
    //   password === "" ||
    //   gender === "" ||
    //   email === ""
    // ) {
    //   seterror((prev) => {
    //     return {
    //       error: true,
    //       message: "Please fill in all of the empty fields",
    //     };
    //   });

    //   return;
    // }

    setloading(true);

    const res = await fetch(`${API_URL}/signup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (!res.ok) {
      seterror({ error: true, message: resData.message });
      return;
    }

    navigate("/");
  };

  return (
    <div className="signup-form">
      <div className="form-heading">
        <h2>Create a New Account</h2>
        <p>It's quick and easy.</p>
        {error.error && (
          <p style={{ color: "red", fontSize: "10px" }}>{error.message}</p>
        )}
      </div>
      <hr />
      <div className="user-content">
        <div className="user-details">
          <div className="details">
            <input
              type="text"
              name="firstname"
              id=""
              placeholder="Firstname"
              ref={firstnameRef}
              onChange={() => getUserDetails(firstnameRef, "firstname")}
            />
            <input
              type="text"
              name="lastname"
              id=""
              placeholder="Lastname"
              ref={lastnameRef}
              onChange={() => getUserDetails(lastnameRef, "lastname")}
            />
          </div>
          <div className="user-email">
            <input
              type="text"
              name="email"
              id=""
              placeholder="Email"
              ref={emailRef}
              onChange={() => getUserDetails(emailRef, "email")}
            />
          </div>
          <div className="user-pass">
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              ref={passRef}
              onChange={() => getUserDetails(passRef, "password")}
            />
          </div>
        </div>
        <div className="user-dateOfBirth">
          <label htmlFor="">Date of Birth</label>
          <div className="user-dob-options">
            <select
              name="birthday-day"
              id="day"
              ref={dobDateRef}
              onChange={() => getDateOfbirth(dobDateRef, "dobDate")}
            >
              {dates.map((el, i) => {
                return (
                  <option value={el} key={i}>
                    {el}
                  </option>
                );
              })}
            </select>
            <select
              name="month"
              id=""
              ref={dobMonthRef}
              onChange={() => getDateOfbirth(dobMonthRef, "dobMonth")}
            >
              {months.map((el, i) => {
                return (
                  <option value={el} key={i}>
                    {el}
                  </option>
                );
              })}
            </select>
            <select
              name="years"
              id=""
              ref={dobYearRef}
              onChange={() => getDateOfbirth(dobYearRef, "dobYear")}
            >
              {years.map((el, i) => {
                return (
                  <option value={el} key={i}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="user-gender">
          <label htmlFor="">Gender</label>
          <div className="gender-options">
            <div
              className="user-radio-button"
              onClick={() => selectGender(maleRef)}
            >
              <label htmlFor="">Male</label>
              <input
                type="radio"
                name="male"
                id=""
                value="male"
                ref={maleRef}
              />
            </div>
            <div
              className="user-radio-button"
              onClick={() => selectGender(femaleRef)}
            >
              <label htmlFor="">Female</label>
              <input
                type="radio"
                name="female"
                id=""
                value="female"
                ref={femaleRef}
              />
            </div>
            <div
              className="user-radio-button"
              onClick={() => selectGender(customRef)}
            >
              <label htmlFor="">Custom</label>
              <input
                type="radio"
                name="custom"
                id=""
                ref={customRef}
                value="custom"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="rules">
        <p>
          People who use our service may have uploaded your contact information
          to Facebook. Learn more.
        </p>
        <p>
          By clicking Sign Up, you agree to our Terms, Privacy Policy and
          Cookies Policy. You may receive SMS notifications from us and can opt
          out at any time
        </p>
      </div>

      <div className="signup-actions">
        <button
          onClick={() => onSubmit(userDetails)}
          style={{ padding: `${loading ? "0" : "25px"}` }}
        >
          Sign Up {loading && <Loader login={true} />}
        </button>
        <NavLink to={"/"}>Already have an account?</NavLink>
      </div>
    </div>
  );
};
