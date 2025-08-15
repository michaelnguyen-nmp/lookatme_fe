import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const URL = "http://localhost:8000/api/auth/register";

const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const hanleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        URL,
        {
          fullname,
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Register successful!");
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Registration failed, please try again later!";
      toast.error(errorMessage);
    }
  };

  return (
    <AuthLayout isLogin={false}>
      <div className={styles.form}>
        <form
          action="#"
          method="post"
          id="formRegister"
          onSubmit={hanleRegister}
          encType="multipart/form-data"
        >
          <h3 className={styles.heading}>Register</h3>

          <div className={styles.spacer}></div>

          <div className={styles.formGroup}>
            <label htmlFor="fullname" className={styles.formLabel}>
              Full Name
            </label>
            <input
              id={styles.fullname}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              name="fullname"
              type="text"
              placeholder="e.g., Michael Nguyen"
              className={styles.formControl}
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              User name
            </label>
            <input
              id={styles.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
              placeholder="e.g., BunnyFuFuu"
              className={styles.formControl}
              pattern="^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$"
              minLength="4"
              maxLength="16"
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              id={styles.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              placeholder="Enter your email..."
              className={styles.formControl}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <span className={styles.formMessage}></span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              id={styles.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Enter your password..."
              className={styles.formControl}
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              Confirm Password
            </label>
            <input
              id={styles.confirmPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password..."
              className={styles.formControl}
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <button className={`${styles.formSubmit} ${styles.btn}`}>
            Sign Up
          </button>
          <p className={styles.formSubmitDesc}>
            <Link to="/login">Already have an account? Log In</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;
