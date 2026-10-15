import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../CSS/Photo.css";

function Admin_Collection() {
  const location = useLocation();
  const albumId = location.state?.newAlbumId;
  const token = localStorage.getItem("token");
  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (albumId) getPhotos();
  }, [albumId]);

  async function getPhotos() {
    try {
      const response = await axios.get(`http://localhost:3000/admin/album/viewPhoto/${albumId}`, { headers: { Authorization: `Bearer ${token}` } });
      setPhotos(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getLikes(photoId) {
    if (!photoId) return;
    try {
      const res = await axios.get(`http://localhost:3000/admin/photo/viewLike/${photoId}`, { headers: { Authorization: `Bearer ${token}` } });
      setLikesCount(res.data.likes?.length || 0);
    } catch (err) {
      console.log(err);
    }
  }

  async function getComments(photoId) {
    if (!photoId) return;
    try {
      const response = await axios.get(`http://localhost:3000/admin/photo/viewComment/${photoId}`, { headers: { Authorization: `Bearer ${token}` } });
      setComments(response.data.comments || []);
      setShowComments(true);
    } catch (err) {
      console.log(err);
    }
  }

  function handlePhotoClick(photoId) {
    if (selectedPhotoId === photoId) {
      setSelectedPhotoId(null);
      setShowComments(false);
      setComments([]);
    } else {
      setSelectedPhotoId(photoId);
      setShowComments(false);
      setComments([]);
      getLikes(photoId);
    }
  }

  async function deletePhotoHandler(photoId) {
    if (!photoId) return;
    try {
      await axios.delete(`http://localhost:3000/admin/photo/delete/${photoId}`, { headers: { Authorization: `Bearer ${token}` } });
      setPhotos((prev) => prev.filter((photo) => photo._id !== photoId));
      setSelectedPhotoId(null);
      setShowComments(false);
      setComments([]);
    } catch (err) {
      if (err.response) console.error("Backend Error Message:", err.response.data);
      else console.error(err);
    }
  }

  return (
    <div className="Album_Collection">
      <h1>Photo Collection</h1>
      {photos.length === 0 ? (
        <p className="noPhotos">No Photos Added</p>
      ) : (
        photos.map((item) => (
          <div key={item._id} className="photoDisplay" onClick={() => handlePhotoClick(item._id)}>
            <img src={item.url} alt="collection" />
            {selectedPhotoId === item._id && (
              <div className="description" onClick={(e) => e.stopPropagation()}>
                <div className="actionRow">
            <span className="like-count">❤️ {likesCount} Likes</span>
            <button className="view-comments-btn" onClick={(e) => { e.stopPropagation(); getComments(item._id); }}>View Comments</button>                  
                </div>
                {showComments && (
                  <div className="commentsSection">
                    <ul>
                      {comments.length > 0 ? (
                        comments.map((comment) => {
                          const cId = comment._id || comment.id;
                          return (
                            <li key={cId}>
                              <div><b>{comment.student?.name || "Student"}</b>: {comment.comment || comment.message}</div>
                            </li>
                          );
                        })
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Admin_Collection;