import React, { useContext } from "react";
import styles from "./SidebarLayout.module.scss";
import logo from "../../assets/img/logo.png";
import avatar from "../../assets/img/avatar.jpg";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import toast from "react-hot-toast";

const URL = "http://localhost:8000/api/auth/logout";

const SidebarLayout = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(URL, {}, { withCredentials: true });

      localStorage.removeItem("token");

      setUser(null);
      localStorage.removeItem("user");

      toast.success("You have logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Logout failed!");
    }
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <Link to="/">
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>

      {/* Menu items */}
      <Link to="/" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-house"></i>
        </span>
        <span>Home</span>
      </Link>

      <Link to="/explore" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <span>Explore</span>
      </Link>

      <Link to="/notifications" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-bell"></i>
        </span>
        <span>Notifications</span>
      </Link>

      <Link to="/messages" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-envelope"></i>
        </span>
        <span>Messages</span>
      </Link>

      <Link to="/todo" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-list"></i>
        </span>
        <span>To do</span>
      </Link>

      <Link to="/bookmarks" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-bookmark"></i>
        </span>
        <span>Bookmarks</span>
      </Link>

      <Link to="/profile" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-user"></i>
        </span>
        <span>Profile</span>
      </Link>

      <Link to="/more" className={styles.sidebarItem}>
        <span>
          <i className="fa-solid fa-ellipsis"></i>
        </span>
        <span>More</span>
      </Link>

      {/* Profile Section */}

      {user ? (
        <>
          <Link
            to="/login"
            className={styles.sidebarItem}
            onClick={handleLogout}
          >
            <span>
              <i className="fa-solid fa-right-to-bracket"></i>
            </span>
            <span>Log out</span>
          </Link>

          <section className={`${styles.sidebarItem} ${styles.profile}`}>
            <img
              src={user.avatar || avatar}
              className={styles.avatar}
              alt="Avatar"
            />
            <div className={styles.profileWrap}>
              <div className={styles.userWrap}>
                <span className={styles.profileName}>{user.fullname}</span>
                <span className={styles.profileUserName}>@{user.username}</span>
              </div>
              <span onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </span>
            </div>
          </section>
        </>
      ) : (
        <>
          <Link to="/login" className={styles.sidebarItem}>
            <span>
              <i className="fa-solid fa-user-plus"></i>
            </span>
            <span>Login</span>
          </Link>

          <section className={`${styles.sidebarItem} ${styles.profile}`}>
            <img src={avatar} className={styles.avatar} alt="Avatar" />
            <div className={styles.profileWrap}>
              <div className={styles.userWrap}>
                <span className={styles.profileName}>Guest</span>
                <span className={styles.profileUserName}>@guest</span>
              </div>
              <Link to="/login">
                <i className="fa-solid fa-user-plus"></i>
              </Link>
            </div>
          </section>
        </>
      )}
    </aside>
  );
};

export default SidebarLayout;
