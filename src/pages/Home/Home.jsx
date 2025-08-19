import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LocationPicker from "../../components/LocationPicker/LocationPicker";
import styles from "./Home.module.scss";
import avatar from "../../assets/img/avatar.jpg";
import toast from "react-hot-toast";
import { formatRelativeTime } from "../../helper/formatRelativeTime";
import { feelings } from "../../constants/feelings";

const POST_API = "http://localhost:8000/api/post";

const Home = () => {
  const navigate = useNavigate();

  // Creator post
  const [content, setContent] = useState("");
  const [activeAction, setActiveAction] = useState(null);
  const [preview, setPreview] = useState([]);

  // Location post
  const [locationPos, setLocationPos] = useState(null);
  const [locationName, setLocationName] = useState(null);

  // Video edit
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Choosen files
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Post Information
  const [feeling, setFeeling] = useState(null);
  const [location, setLocation] = useState(null);
  const [posts, setPosts] = useState([]);

  // Expanded content
  const [expanded, setExpanded] = useState(false);

  // Share
  const [shareModal, setShareModal] = useState({ open: false, post: null });
  const [shareContent, setShareContent] = useState("");

  // Comment
  const [comment, setComment] = useState("");

  const fileInputRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Get all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(POST_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("Fetch posts error:", err);
      }
    };
    fetchPosts();
  }, []);

  // Like
  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${POST_API}/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, likes: Array(res.data.likes).fill("x") }
            : p
        )
      );
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  // Share
  const handleShare = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${POST_API}/${postId}/share`,
        { content: "Check this out!" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prev) => [res.data, ...prev]);

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, shares: [...(p.shares || []), "x"] } : p
        )
      );
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // Bookmark
  const handleBookmark = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${POST_API}/${postId}/bookmark`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prev) => prev.map((p) => (p._id === postId ? res.data : p)));
    } catch (err) {
      console.error("Bookmark failed:", err);
      toast.error("Bookmark failed");
    }
  };

  // Comment
  const handleComment = async (postId) => {
    if (!comment.trim()) return;

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${POST_API}/${postId}/comment`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("DEBUG API response:", res.data);

      const updatedPost = res.data; // BE trả về post đã populate
      setPosts((prev) => prev.map((p) => (p._id === postId ? updatedPost : p)));

      setComment(""); // clear input
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  const openShareModal = (post) => {
    setShareModal({ open: true, post });
    setShareContent(""); // reset caption
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmShare = async () => {
    if (!shareModal.post) return;
    try {
      const token = localStorage.getItem("token");

      let original = shareModal.post;
      while (original.sharedPost) {
        original = original.sharedPost;
      }

      console.log("SHARE REQUEST ID:", original._id);
      console.log("SHARE URL:", `${POST_API}/${original._id}/share`);

      const res = await axios.put(
        `${POST_API}/${original._id}/share`,
        { content: shareContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prev) => [res.data, ...prev]);

      setPosts((prev) =>
        prev.map((p) =>
          p._id === original._id
            ? { ...p, shares: [...(p.shares || []), "x"] }
            : p
        )
      );

      setShareModal({ open: false, post: null });
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // Handle selecting image/video for upload
  const handlePhotoClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  // Video controls
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

  // File upload
  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);

    let newPreviews = [];
    let addedFiles = [];

    let imageCount = files.filter((f) => f.type.startsWith("image/")).length;
    let videoCount = files.filter((f) => f.type.startsWith("video/")).length;

    for (let file of newFiles) {
      if (file.type.startsWith("image/")) {
        if (imageCount >= 20) {
          toast.error("You can only upload up to 20 images.");
          continue;
        }
        imageCount++;

        const reader = new FileReader();
        reader.onload = (ev) => {
          setPreview((prev) => [
            ...prev,
            { type: "image", src: ev.target.result },
          ]);
        };
        reader.readAsDataURL(file);

        addedFiles.push(file);
      } else if (file.type.startsWith("video/")) {
        if (videoCount >= 1) {
          toast.error("You can only upload 1 video.");
          continue;
        }
        videoCount++;

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

        addedFiles.push(file);
      } else {
        toast.error("Only images or video are allowed.");
      }
    }

    if (addedFiles.length > 0) {
      setFiles((prev) => [...prev, ...addedFiles]); // chỉ thêm file hợp lệ
    }

    e.target.value = "";
  };

  const removePreview = (index) => {
    setPreview((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Emoji/Feeling
  const handleEmojiClick = (e) => {
    e.preventDefault();
    setActiveAction((prev) => (prev === "emoji" ? null : "emoji"));
  };

  const onFeelingClick = (f) => {
    setFeeling(f);
    setActiveAction(null);
  };

  // Location
  const handleLocationClick = (e) => {
    e.preventDefault();
    setActiveAction((prev) => (prev === "location" ? null : "location"));
  };

  const onSelectLocation = (name, coords) => {
    setLocationName(name);
    setLocationPos(coords);
  };

  const confirmLocation = () => {
    if (locationName && locationPos) {
      setLocation({
        name: locationName,
        coords: locationPos,
      });
    } else if (locationPos) {
      setLocation({
        name: `${locationPos.lat.toFixed(5)}, ${locationPos.lng.toFixed(5)}`,
        coords: locationPos,
      });
    }
    setActiveAction(null);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      toast.error("You need to login in to post!");
      navigate("/login");
      return;
    }

    if (!content && files.length === 0) {
      toast.error("Post must have content or media");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (feeling) formData.append("feeling", feeling.label);
      if (location) formData.append("location", location.name);

      files.forEach((file) => {
        formData.append("media", file);
      });
      setLoading(true);
      const res = await axios.post(POST_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Post created:", res.data);
      toast.success("Post created successfully!");

      setContent("");
      setFiles([]);
      setPreview([]);
      setLocationName(null);
      setLocationPos(null);
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Error creating post");
    } finally {
      setLoading(false);
    }
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

          {/* Preview Feeling */}
          {feeling && (
            <div className={styles.selectedFeeling}>
              <span className={styles.previewText}>
                <span className={styles.previewIcon}>{feeling.emoji}</span>
                is feeling <strong>{feeling.label}</strong>
              </span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => setFeeling(null)}
              >
                ✕
              </button>
            </div>
          )}

          {/* Preview Location */}
          {location && (
            <div className={styles.selectedLocation}>
              <span className={styles.previewText}>
                <i className="fa-solid fa-location-dot"></i> at{" "}
                <strong>{location.name}</strong>
              </span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => setLocation(null)}
              >
                ✕
              </button>
            </div>
          )}
          {/* Preview Media */}
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

            <button
              className={`${styles.postCreatorButton} ${styles.btn}`}
              onClick={handleSubmit}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>

          {activeAction === "emoji" && (
            <div className={styles.feelingPicker}>
              {feelings.map((f) => (
                <button
                  key={f.label}
                  onClick={() => onFeelingClick(f)}
                  className={styles.feelingOption}
                >
                  {f.emoji}
                </button>
              ))}
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

      {/* Model Share Post */}
      {shareModal.open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Share Post</h3>
            <textarea
              rows="3"
              placeholder="Say something about this..."
              value={shareContent}
              onChange={(e) => setShareContent(e.target.value)}
            ></textarea>
            <div className={styles.sharedPostPreview}>
              <div className={styles.postItemWrap}>
                <img
                  src={shareModal.post.user?.avatar || avatar}
                  alt="avatar"
                  className={styles.avatar}
                />
                <div>
                  <span>{shareModal.post.user?.fullname}</span>
                  <p>{shareModal.post.content}</p>
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.btn}
                onClick={() => setShareModal({ open: false, post: null })}
              >
                Cancel
              </button>
              <button className={styles.btn} onClick={confirmShare}>
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post List */}
      <section className={styles.postList}>
        {posts.map((post, index) => (
          // Post Item
          <article key={post._id || index} className={styles.postListItem}>
            {post.sharedPost ? (
              <>
                <div className={styles.postItemWrap}>
                  <img
                    src={post.user?.avatar || avatar}
                    className={styles.avatar}
                    alt="avatar"
                  />
                  <div className={styles.postItemInfo}>
                    <span className={styles.postItemInfoName}>
                      {post.user?.fullname}
                    </span>
                    <span className={styles.postItemInfoUserName}>
                      @{post.user?.username}
                    </span>
                    <span className={styles.postItemInfoTime}>
                      {formatRelativeTime(post.createdAt)}
                    </span>
                    <p className={styles.postItemInfoExtra}>
                      shared <strong>{post.sharedPost.user?.fullname}</strong>'s
                      post
                    </p>
                  </div>
                </div>

                <p
                  className={`${styles.shareCaption} ${
                    expanded ? styles.expanded : ""
                  }`}
                  onClick={() => setExpanded(!expanded)}
                >
                  {post.content}
                </p>

                {/* Share post */}
                <div className={styles.sharedPostBox}>
                  <div className={styles.postItemWrap}>
                    <img
                      src={post.sharedPost.user?.avatar || avatar}
                      className={`${styles.avatar} ${styles.avatarShare}`}
                      alt="avatar"
                    />
                    <div className={styles.infoShare}>
                      <span className={styles.fullnameShare}>
                        {post.sharedPost.user?.fullname}
                      </span>
                      <span className={styles.usernameShare}>
                        @{post.sharedPost.user?.username}
                      </span>
                      <span className={styles.timeShare}>
                        {formatRelativeTime(post.sharedPost.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p
                    className={`${styles.contentShare} ${
                      styles.postItemFigcation
                    } ${expanded ? styles.expanded : ""}`}
                    onClick={() => setExpanded(!expanded)}
                  >
                    {post.sharedPost.content}
                  </p>

                  {post.sharedPost.media?.map((m, i) =>
                    m.isVideo ? (
                      <video
                        key={i}
                        controls
                        src={m.url}
                        className={styles.postItemVideo}
                      ></video>
                    ) : (
                      <img
                        key={i}
                        src={m.url}
                        alt="media"
                        className={styles.postItemImage}
                      />
                    )
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Normal Post */}
                <div className={styles.postItemWrap}>
                  <img
                    src={post.user?.avatar || avatar}
                    className={styles.avatar}
                    alt="avatar"
                  />
                  <div className={styles.postItemInfo}>
                    <span className={styles.postItemInfoName}>
                      {post.user?.fullname}
                    </span>
                    <span className={styles.postItemInfoUserName}>
                      @{post.user?.username}
                    </span>
                    <span className={styles.postItemInfoTime}>
                      {formatRelativeTime(post.createdAt)}
                    </span>

                    {(post.feeling || post.location) && (
                      <span className={styles.postItemInfoExtra}>
                        {post.feeling && <span>is feeling {post.feeling}</span>}
                        {post.location && <span> at {post.location}</span>}
                      </span>
                    )}
                  </div>
                </div>

                {/* Post content */}
                <figure className={styles.postItemFigure}>
                  <figcaption
                    className={`${styles.postItemFigcation} ${
                      expanded ? styles.expanded : ""
                    }`}
                    onClick={() => setExpanded(!expanded)}
                  >
                    {post.content}
                  </figcaption>

                  {/* Media render */}
                  {post.media?.map((m, i) => {
                    return m.isVideo === true ? (
                      <div className={styles.postItemMedia} key={i}>
                        <video
                          ref={videoRef}
                          className={styles.postItemVideo}
                          src={m.url}
                          onTimeUpdate={handleTimeUpdate}
                        ></video>
                        <div className={styles.customControls}>
                          <button
                            className={styles.playPause}
                            onClick={togglePlay}
                          >
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
                            <button
                              className={styles.volumeBtn}
                              onClick={toggleMute}
                            >
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
                      <div className={styles.postItemMedia} key={i}>
                        <img
                          className={styles.postItemImage}
                          src={m.url}
                          alt="Post Picture"
                        />
                      </div>
                    );
                  })}
                </figure>
              </>
            )}

            {/* Post Actions */}
            <div className={styles.postItemActions}>
              {/* Like */}
              <a
                href="#"
                className={`${styles.postItemActionsLink} ${styles.like}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(post._id);
                }}
              >
                <span>
                  <i className="fa-solid fa-heart"></i>
                </span>
                <span className={styles.quantity}>
                  {post.likes?.length || 0}
                </span>
              </a>

              {/* Comment */}
              <a
                href="#"
                className={`${styles.postItemActionsLink} ${styles.comment}`}
                onClick={(e) => {
                  e.preventDefault(post._id);
                }}
              >
                <span>
                  <i className="fa-solid fa-comment"></i>
                </span>
                <span className={styles.quantity}>
                  {post.comments?.length || 0}
                </span>
              </a>

              {/* Share */}
              <a
                href="#"
                className={`${styles.postItemActionsLink} ${styles.share}`}
                onClick={(e) => {
                  e.preventDefault();
                  openShareModal(post);
                }}
              >
                <span>
                  <i className="fa-solid fa-share"></i>
                </span>
                <span className={styles.quantity}>
                  {post.shares?.length || 0}
                </span>
              </a>

              {/* Bookmark */}
              <a
                href="#"
                className={`${styles.postItemActionsLink} ${styles.bookmark}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleBookmark(post._id);
                }}
              >
                {post.bookmarks?.includes(currentUser._id) ? (
                  <i className="fa-solid fa-bookmark"></i>
                ) : (
                  <i className="fa-regular fa-bookmark"></i>
                )}
              </a>
            </div>

            {/* Comment List */}
            <div className={styles.commentsList}>
              {post.comments?.map((c) => (
                <div key={c._id} className={styles.commentItem}>
                  <img
                    src={c.user?.avatar || avatar}
                    className={styles.commentAvatar}
                    alt="avatar"
                  />
                  <div className={styles.commentContent}>
                    <span className={styles.commentName}>
                      {c.user?.fullname}
                    </span>
                    <span className={styles.commentText}>{c.content}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className={styles.commentBox}>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button
                className={styles.btn}
                onClick={() => handleComment(post._id, comment)}
              >
                Comment
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default Home;
