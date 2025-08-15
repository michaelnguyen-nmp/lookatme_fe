import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

import MainLayout from "../../layouts/MainLayout";
import LocationPicker from "../../components/LocationPicker/LocationPicker";
import styles from "./Home.module.scss";
import avatar from "../../assets/img/avatar.jpg";
import picture from "../../assets/img/post_picture_01.jpg";
import video from "../../assets/video/video_1.mp4";

const Home = () => {
  const isVideo = true;
  const [content, setContent] = useState("");
  const [activeAction, setActiveAction] = useState(null);
  const [locationPos, setLocationPos] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [preview, setPreview] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (activeAction === "location") {
      const t = setTimeout(() => setShowMap(true), 0);
      return () => clearTimeout(t);
    } else {
      setShowMap(false);
    }
  }, [activeAction]);

  const handlePhotoClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  const togglePlay = () => {
    if (!isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setProgress((current / total) * 100);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const toggleMute = () => {
    const muteState = !isMuted;
    videoRef.current.muted = muteState;
    setIsMuted(muteState);
  };

  const handleVolumeChange = (e) => {
    const vol = e.target.value;
    videoRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === "0");
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setPreview((prev) => [
            ...prev,
            { type: "image", src: ev.target.result },
          ]);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.currentTime = 1;
        video.muted = true;
        video.playsInline = true;

        video.addEventListener("loadeddata", () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnail = canvas.toDataURL("image/png");

          setPreview((prev) => [...prev, { type: "video", src: thumbnail }]);
          URL.revokeObjectURL(video.src);
        });
      }
    });

    // Reset input để chọn lại cùng file vẫn được
    e.target.value = "";
  };

  const removePreview = (index) => {
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEmojiClick = (e) => {
    e.preventDefault();
    setActiveAction((prev) => (prev === "emoji" ? null : "emoji"));
  };

  const onEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  };

  const handleLocationClick = (e) => {
    e.preventDefault();
    setActiveAction((prev) => (prev === "location" ? null : "location"));
  };

  const onSelectLocation = (name, coords) => {
    setLocationName(name);
    setLocationPos(coords);
  };

  const confirmLocation = () => {
    if (locationPos) {
      const locText = locationName
        ? `📍 ${locationName}`
        : `📍 ${locationPos.lat.toFixed(5)}, ${locationPos.lng.toFixed(5)}`;

      setContent((prev) => {
        const withoutOldLoc = prev.replace(/\s*📍 .+$/, "").trim();
        return withoutOldLoc ? `${withoutOldLoc} ${locText}` : locText;
      });
    }
    setActiveAction(null);
  };

  return (
    <>
      <section className={styles.postCreator}>
        <img src={avatar} alt="avatar" className={styles.avatar} />
        <div className={styles.postCreatorWrap}>
          <textarea
            rows="2"
            placeholder="What's happening?"
            className={styles.postCreatorContent}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {preview.length > 0 && (
            <div className={styles.imagePreviewWrapper}>
              {preview.map((item, index) => (
                <div key={index} className={styles.imageItem}>
                  <img
                    src={item.src}
                    alt={`preview-${index}`}
                    className={styles.imagePreview}
                  />
                  <button
                    className={styles.clearImageBtn}
                    onClick={() => removePreview(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className={styles.postCreatorActions}>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              ref={fileInputRef}
              onChange={handleFilesChange}
              style={{ display: "none" }}
            />

            <a href="#" className={styles.postPhoto} onClick={handlePhotoClick}>
              <i className="fa-regular fa-image"></i>
            </a>

            <a href="#" className={styles.emoji} onClick={handleEmojiClick}>
              <i className="fa-solid fa-face-smile"></i>
            </a>

            <a
              href="#"
              className={styles.location}
              onClick={handleLocationClick}
            >
              <i className="fa-solid fa-location-dot"></i>
            </a>

            <button className={`${styles.postCreatorButton} ${styles.btn}`}>
              Post
            </button>
          </div>

          {activeAction === "emoji" && (
            <div className={styles.emojiPickerWrapper}>
              <button
                className={styles.emojiCloseBtn}
                onClick={() => setActiveAction(null)}
              >
                ✕
              </button>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          {activeAction === "location" && (
            <div className={styles.locationPickerWrapper}>
              <LocationPicker
                onSelectLocation={onSelectLocation}
                initialPosition={{ lat: 10.7769, lng: 106.7009 }}
                zoom={15}
                height="350px"
              />
              <div className={styles.locationPickerActions}>
                <button onClick={confirmLocation}>Add Location</button>

                <button
                  onClick={() => {
                    setActiveAction(null);
                    setLocationName(null);
                    setLocationPos(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.postList}>
        <article className={styles.postListItem}>
          <div className={styles.postItemWrap}>
            <img src={avatar} className={styles.avatar} alt="avatar" />
            <div className={styles.postItemInfo}>
              <span className={styles.postItemInfoName}>Mifu</span>
              <span className={styles.postItemInfoUserName}>@BunnyFuFuu</span>
              <span className={styles.postItemInfoTime}>2h</span>
            </div>
          </div>

          <figure className={styles.postItemFigure}>
            <figcaption
              className={`${styles.postItemFigcation} ${
                expanded ? styles.expanded : ""
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              volutpat, urna a facilisis porttitor, dolor mi laoreet quam, at
              dignissim erat urna nec erat. Suspendisse potenti. Phasellus
              ultrices sapien id libero aliquet, sed viverra magna facilisis.
            </figcaption>

            {!expanded ? (
              <span
                className={styles.postItemShowMore}
                onClick={() => setExpanded(true)}
              >
                Show more
              </span>
            ) : (
              <span
                className={styles.postItemShowMore}
                onClick={() => setExpanded(false)}
              >
                Show less
              </span>
            )}

            {isVideo ? (
              <div className={styles.postItemMedia}>
                <video
                  ref={videoRef}
                  className={styles.postItemVideo}
                  src={video}
                  onTimeUpdate={handleTimeUpdate}
                ></video>
                <div className={styles.customControls}>
                  <button className={styles.playPause} onClick={togglePlay}>
                    {isPlaying ? (
                      <i className="fa-solid fa-pause"></i>
                    ) : (
                      <i className="fa-solid fa-play"></i>
                    )}
                  </button>
                  <input
                    type="range"
                    className={styles.progressBar}
                    value={progress}
                    onChange={handleSeek}
                  />
                  <div className={styles.volumeControl}>
                    <button className={styles.volumeBtn} onClick={toggleMute}>
                      <i
                        className={`fa-solid ${
                          isMuted ? "fa-volume-xmark" : "fa-volume-high"
                        }`}
                      ></i>
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className={styles.volumeBar}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.postItemMedia}>
                <img
                  className={styles.postItemImage}
                  src={picture}
                  alt="Post Picture"
                />
              </div>
            )}
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
      </section>
    </>
  );
};

export default Home;
