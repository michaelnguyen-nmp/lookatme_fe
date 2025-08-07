import React from "react";
import {} from "react";
import styles from "./SidebarLayout.module.scss";
import logo from "../../assets/img/logo.png";
import avatar from "../../assets/img/avatar.jpg";
import { Link } from "react-router-dom";

const SidebarLayout = () => {
  return (
    <aside className={styles.sidebar}>
      <a href="#!">
        <img className={styles.logo} src={logo} alt="Logo" />
      </a>

      <a href="#" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-house"></i>
        </span>
        <span>Home</span>
      </a>

      <a href="#" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <span>Explore</span>
      </a>

      <a href="#" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-bell"></i>
        </span>
        <span>Notifications</span>
      </a>

      <a href="#" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-envelope"></i>
        </span>
        <span>Messages</span>
      </a>

      <a href="#" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-list"></i>
        </span>
        <span>To do</span>
      </a>

      <a href="#" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-bookmark"></i>
        </span>
        <span>Bookmarks</span>
      </a>

      <a href="#" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-user"></i>
        </span>
        <span>Profile</span>
      </a>

      <a href="#" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-ellipsis"></i>
        </span>
        <span>More</span>
      </a>

      <a className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-ellipsis"></i>
        </span>
        <span>
          {" "}
          <Link to="/login">Login</Link>
        </span>
      </a>

      <a href="#" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-ellipsis"></i>
        </span>
        <span>
          <Link to="/register">Register</Link>
        </span>
      </a>

      <section className={`${styles.sidebarItem} ${styles.profile}`}>
        <img src={avatar} className={styles.avatar} alt="Avatar" />
        <div className={styles.profileWrap}>
          <div className={styles.userWrap}>
            <span className={styles.profileName}>Michael Nguyen</span>
            <span className={styles.profileUserName}>@Michael</span>
          </div>
          <a href="#">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </a>
        </div>
      </section>
    </aside>
  );
};

export default SidebarLayout;
