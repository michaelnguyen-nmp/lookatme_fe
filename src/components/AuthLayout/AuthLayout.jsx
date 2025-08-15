import React, { useEffect, useRef } from "react";
import styles from "./AuthLayout.module.scss";
import logo from "../../assets/img/logo.png";
import illustration from "../../assets/img/illustration_01.png";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, isLogin }) => {
  const groundRef = useRef(null);

  useEffect(() => {
    const ground = groundRef.current;
    if (ground) {
      ground.innerHTML = "";
      for (let i = 0; i < 16; i++) {
        const leaf = document.createElement("div");
        leaf.className = `${styles.leaf} ${i % 2 === 1 ? styles.leaf2 : ""}`;
        ground.appendChild(leaf);
      }
    }
  }, []);
  return (
    <main>
      <div className={styles.authContainer}>
        <figure className={styles.authFigure}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
          <img
            src={illustration}
            alt="illustration"
            className={styles.illustration}
          />
          <div className={styles.ground} ref={groundRef}></div>

          <div className={styles.butterfly}>
            <div className={`${styles.wing} ${styles.wingLeft}`}></div>
            <div className={`${styles.wing} ${styles.wingRight}`}></div>
            <div className={styles.body}></div>
          </div>

          <div className={styles.bee}></div>
          <figcaption className={styles.authFigcaption}>
            {isLogin ? (
              <p className={styles.authDesc}>
                Don't have an account? <Link to="/register"> Sign up</Link>
              </p>
            ) : (
              <p className={styles.authDesc}>
                Already have an account? <Link to="/login"> Log In</Link>
              </p>
            )}
          </figcaption>
        </figure>

        <div className={styles.authenticate}>{children}</div>
      </div>
    </main>
  );
};

export default AuthLayout;
