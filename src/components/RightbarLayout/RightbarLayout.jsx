import React from "react";
import {} from "react";
import styles from "./RightbarLayout.module.scss";
import avatar from "../../assets/img/avatar.jpg";
import { Link } from "react-router-dom";
import WeatherWidget from "../Weather/WeatherWidget";

const RightbarLayout = () => {
  return (
    <aside className={styles.rightbar}>
      <div className={styles.searchBox}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchBoxContent}
        />
      </div>

      <article className={styles.following}>
        <h3 className={styles.followingHeader}>Who to follow</h3>

        <section className={styles.followingItem}>
          <img src={avatar} className={styles.avatar} alt="Avatar" />
          <div className={styles.followingWrap}>
            <span className={styles.followingName}>Michael Nguyen</span>
            <span className={styles.followingUserName}>@Michael</span>
          </div>
          <button className={`${styles.followingButton} ${styles.btn}`}>
            Follow
          </button>
        </section>

        {/* Test */}

        <section className={styles.followingItem}>
          <img src={avatar} className={styles.avatar} alt="Avatar" />
          <div className={styles.followingWrap}>
            <span className={styles.followingName}>Michael Nguyen</span>
            <span className={styles.followingUserName}>@Michael</span>
          </div>
          <button className={`${styles.followingButton} ${styles.btn}`}>
            Follow
          </button>
        </section>

        <section className={styles.followingItem}>
          <img src={avatar} className={styles.avatar} alt="Avatar" />
          <div className={styles.followingWrap}>
            <span className={styles.followingName}>Michael Nguyen</span>
            <span className={styles.followingUserName}>@Michael</span>
          </div>
          <button className={`${styles.followingButton} ${styles.btn}`}>
            Follow
          </button>
        </section>

        {/* Test */}

        <button className={`${styles.followingButtonShowMore} ${styles.btn}`}>
          Show more
        </button>
      </article>

      <article className={styles.weather}>
        <h3 className={styles.weatherHeader}>Your Daily Weather</h3>
        <WeatherWidget city="Ho Chi Minh" />
      </article>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link className={styles.footerLink} to="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className={styles.footerLink} to="/accessibility">
            Accessibility
          </Link>
          <Link className={styles.footerLink} to="/about">
            About Us
          </Link>
          <Link className={styles.footerLink} to="/more">
            More...
          </Link>
        </div>
        <Link className={styles.footerShortLink} to="/privacy-policy">
          © 2025 Look At Me
        </Link>
      </footer>
    </aside>
  );
};

export default RightbarLayout;
