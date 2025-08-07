import React from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./Home.module.scss";
import avatar from "../../assets/img/avatar.jpg";
import picture from "../../assets/img/post_picture_01.jpg";
// import video from "../../assets/video/post_video_01";

const Home = () => {
  return (
    <MainLayout>
      <section className={styles.postCreator}>
        <img src={avatar} alt="avatar" className={styles.avatar} />
        <div className={styles.postCreatorWrap}>
          <textarea
            rows="2"
            placeholder="What's happening?"
            className={styles.postCreatorContent}
          ></textarea>

          <div className={styles.postCreatorActions}>
            <a href="#" className={styles.postPhoto}>
              <i className="fa-regular fa-image"></i>
            </a>
            <a href="#" className={styles.livestream}>
              <i className="fa-solid fa-video"></i>
            </a>
            <a href="#" className={styles.status}>
              <i className="fa-solid fa-face-smile"></i>
            </a>
            <a href="#" className={styles.location}>
              <i className="fa-solid fa-location-dot"></i>
            </a>

            <button className={`${styles.postCreatorButton} ${styles.btn}`}>
              Post
            </button>
          </div>
        </div>
      </section>

      <section className={styles.postList}>
        <article className={styles.postListItem}>
          <div className={styles.postItemWrap}>
            <img src={avatar} className={styles.avatar} alt="avatar" />
            <div className={styles.postItemInfo}>
              <span className={styles.postItemInfoName}>Jane Doe</span>
              <span className={styles.postItemInfoUserName}>@janedoe</span>
              <span className={styles.postItemInfoTime}>2h</span>
            </div>
          </div>

          <figure className={styles.postItemFigure}>
            <figcaption className={styles.postItemFigcation}>
              Just tried the new feature on X. Super slick! 🚀
              <a href="#" className={styles.postItemShowMore}>
                Show more
              </a>
            </figcaption>
            <div className={styles.postItemMedia}>
              <img
                className={styles.postItemImage}
                src={picture}
                alt="Post Picture"
              />
              {/* {isVideo ? (
                <video className={styles.postItemVideo} src=""></video>
              ) : (
                <img
                  className={styles.postItemImage}
                  src={picture}
                  alt="Post Picture"
                />
              )} */}
            </div>
          </figure>

          <div className={styles.postItemActions}>
            <a
              href="#"
              className={`${styles.postItemActionsLink} ${styles.like}`}
            >
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
              <span className={styles.quantity}>12</span>
            </a>

            <a
              href="#"
              className={`${styles.postItemActionsLink} ${styles.comment}`}
            >
              <span>
                <i className="fa-solid fa-comment"></i>
              </span>
              <span className={styles.quantity}>12</span>
            </a>

            <a
              href="#"
              className={`${styles.postItemActionsLink} ${styles.share}`}
            >
              <span>
                <i className="fa-solid fa-share"></i>
              </span>
              <span className={styles.quantity}>12</span>
            </a>

            <a
              href="#"
              className={`${styles.postItemActionsLink} ${styles.bookmark}`}
            >
              <i className="fa-solid fa-bookmark"></i>
            </a>
          </div>
        </article>

        {/* Test */}
        <article className={styles.postListItem}>
          <div className={styles.postListItemWrap}>
            <img src={avatar} className={styles.avatar} alt="avatar" />
            <div className={styles.postItemInfo}>
              <span className={styles.postItemInfoName}>Jane Doe</span>
              <span className={styles.postItemInfoUserName}>@janedoe</span>
              <span className={styles.postItemInfoTime}>2h</span>
            </div>
          </div>

          <figure className={styles.postItemFigure}>
            <figcaption className={styles.postItemFigcation}>
              Just tried the new feature on X. Super slick! 🚀
              <a href="#" className={styles.postItemShowMore}>
                Show more
              </a>
            </figcaption>
            <div className={styles.postItemMedia}>
              <img
                className={styles.postItemImage}
                src={picture}
                alt="Post Picture"
              />
              {/* {isVideo ? (
                <video className={styles.postItemVideo} src=""></video>
              ) : (
                <img
                  className={styles.postItemImage}
                  src={picture}
                  alt="Post Picture"
                />
              )} */}
            </div>
          </figure>

          <div className={styles.postItemActions}>
            <a href="#" className={styles.postItemActionsLink}>
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
              <span className={styles.quantity}>12</span>
            </a>

            <a href="#" className={styles.postItemActionsLink}>
              <span>
                <i className="fa-solid fa-comment"></i>
              </span>
              <span className={styles.quantity}>12</span>
            </a>

            <a href="#" className={styles.postItemActionsLink}>
              <span>
                <i className="fa-solid fa-share"></i>
              </span>
              <span className={styles.quantity}>12</span>
            </a>

            <a href="#" className={styles.postItemActionsLink}>
              <i className="fa-solid fa-bookmark"></i>
            </a>
          </div>
        </article>
        <article className={styles.postListItem}>
          <div className={styles.postListItemWrap}>
            <img src={avatar} className={styles.avatar} alt="avatar" />
            <div className={styles.postItemInfo}>
              <span className={styles.postItemInfoName}>Jane Doe</span>
              <span className={styles.postItemInfoUserName}>@janedoe</span>
              <span className={styles.postItemInfoTime}>2h</span>
            </div>
          </div>

          <figure className={styles.postItemFigure}>
            <figcaption className={styles.postItemFigcation}>
              Just tried the new feature on X. Super slick! 🚀
              <a href="#" className={styles.postItemShowMore}>
                Show more
              </a>
            </figcaption>
            <div className={styles.postItemMedia}>
              <img
                className={styles.postItemImage}
                src={picture}
                alt="Post Picture"
              />
              {/* {isVideo ? (
                <video className={styles.postItemVideo} src=""></video>
              ) : (
                <img
                  className={styles.postItemImage}
                  src={picture}
                  alt="Post Picture"
                />
              )} */}
            </div>
          </figure>

          <div className={styles.postItemActions}>
            <a href="#" className={styles.postItemActionsLink}>
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
              <span className={styles.quantity}>12</span>
            </a>

            <a href="#" className={styles.postItemActionsLink}>
              <span>
                <i className="fa-solid fa-comment"></i>
              </span>
              <span className={styles.quantity}>12</span>
            </a>

            <a href="#" className={styles.postItemActionsLink}>
              <span>
                <i className="fa-solid fa-share"></i>
              </span>
              <span className={styles.quantity}>12</span>
            </a>

            <a href="#" className={styles.postItemActionsLink}>
              <i className="fa-solid fa-bookmark"></i>
            </a>
          </div>
        </article>

        {/* Test */}
      </section>
    </MainLayout>
  );
};

export default Home;
