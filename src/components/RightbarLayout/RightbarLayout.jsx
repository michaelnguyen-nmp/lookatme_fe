import React from "react";
import {} from "react";
import styles from "./RightbarLayout.module.scss";
import avatar from "../../assets/img/avatar.jpg";
import { Link } from "react-router-dom";

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

      <article className={styles.todos}>
        <h3 className={styles.todosHeader}>To do</h3>
      </article>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a className={styles.footerLink} href="#">
            Privacy Policy
          </a>
          <a className={styles.footerLink} href="#">
            Accessibility
          </a>
          <a className={styles.footerLink} href="#">
            About Us
          </a>
          <a className={styles.footerLink} href="#">
            More...
          </a>
        </div>
        <div className={styles.footerLink}>© 2025 Look At Me</div>
      </footer>
    </aside>
  );
};

export default RightbarLayout;
