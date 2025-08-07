import React from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <AuthLayout isLogin={true}>
      <div className={styles.form}>
        <form
          action="#"
          method="post"
          id={styles.formLogin}
          className={styles.formLogin}
        >
          <h3 className={styles.heading}>Đăng Nhập</h3>

          <div className={styles.spacer}></div>

          <div className={styles.formGroup}>
            <label for="username" className={styles.formLabel}>
              Tên đăng nhập
            </label>
            <input
              id={styles.username}
              name="username"
              type="text"
              placeholder="VD: MifuVipPro1234"
              className={styles.formControl}
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <div className={styles.formGroup}>
            <label for="password" className={styles.formLabel}>
              Mật khẩu
            </label>
            <input
              id={styles.password}
              name="password"
              type="password"
              placeholder="Nhập mật khẩu của bạn.."
              className={styles.formControl}
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <button className={`${styles.formSubmit} ${styles.btn}`}>
            Đăng nhập
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
