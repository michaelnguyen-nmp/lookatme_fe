import React, { useState, useContext } from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const URL = "http://localhost:8000/api/auth/login";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      // Storage token into localStorage
      localStorage.setItem("token", res.data.accessToken);

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");

      navigate("/");
    } catch (err) {
      toast.error("Incorrect username or password");
    }
  };

  return (
    <AuthLayout isLogin={true}>
      <div className={styles.form}>
        <form
          action="#"
          method="post"
          id={styles.formLogin}
          className={styles.formLogin}
          onSubmit={handleLogin}
        >
          <h3 className={styles.heading}>Login</h3>

          <div className={styles.spacer}></div>

          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              Username
            </label>
            <input
              id={styles.username}
              value={username}
              name="username"
              type="text"
              className={styles.formControl}
              placeholder="Enter your username..."
              onChange={(e) => setUsername(e.target.value)}
              required
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
              name="password"
              type="password"
              placeholder="Enter your password..."
              className={styles.formControl}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <button className={`${styles.formSubmit} ${styles.btn}`}>
            Login
          </button>
          <p className={styles.forgetPassword}>
            <a href="#">Forgot Password</a>
          </p>
          <p className={styles.formSubmitDesc}>
            <Link to="/register">Don't have an account? Sign Up</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
