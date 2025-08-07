import React from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <AuthLayout isLogin={false}>
      <div className={styles.form}>
        <form
          action="#"
          method="post"
          id="formRegister"
          encType="multipart/form-data"
        >
          <h3 className={styles.heading}>Đăng Ký</h3>

          <div className={styles.spacer}></div>

          <div className={styles.formGroup}>
            <label for="fullname" className={styles.formLabel}>
              Họ và tên
            </label>
            <input
              id={styles.fullname}
              name="fullname"
              type="text"
              placeholder="VD: Nguyễn Minh Phúc"
              className={styles.formControl}
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <div className={styles.formGroup}>
            <label for="username" className={styles.formLabel}>
              Tên đăng nhập
            </label>
            <input
              id={styles.username}
              name="username"
              type="text"
              placeholder="VD: MifuDepTrai"
              className={styles.formControl}
              pattern="^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$"
              minlength="4"
              maxlength="16"
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <div className={styles.formGroup}>
            <label for="email" className={styles.formLabel}>
              Email
            </label>
            <input
              id={styles.email}
              name="email"
              type="text"
              placeholder="Nhập Email của bạn..."
              className={styles.formControl}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
              placeholder="Nhập mật khấu của bạn..."
              className={styles.formControl}
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <div className={styles.formGroup}>
            <label for="passwordConfirmation" className={styles.formLabel}>
              Nhập lại mật khẩu
            </label>
            <input
              id={styles.passwordConfirmation}
              name="passwordConfirmation"
              type="password"
              placeholder="Nhập lại mật khẩu..."
              className={styles.formControl}
              required
            />
            <span className={styles.formMessage}></span>
          </div>

          <button className={`${styles.formSubmit} ${styles.btn}`}>
            Đăng ký
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
