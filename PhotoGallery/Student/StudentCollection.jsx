import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../CSS/Photo.css";
function StudentCollection() {
  const location = useLocation();
  const albumId = location.state?.newAlbumId;
  const token = localStorage.getItem("token");

  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState({});

  useEffect(() => {
    if (albumId) { getPhotos(); }
  }, [albumId]);

  async function getPhotos() {
    try {
      const response = await axios.get(
        `http://localhost:3000/student/album/viewPhotos/${albumId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPhotos(response.data);
    } catch (err) { console.log(err); }
  }

  async function getComments(photoId) {
    try {
      const response = await axios.get(
        `http://localhost:3000/student/photo/viewComment/${photoId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(response.data.comments || []);
      setShowComments(true);
    } catch (err) { console.log(err); }
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
    }
  }

  async function toggleLike(photoId) {
    try {
      await axios.post(
        `http://localhost:3000/student/photo/likeAdd/${photoId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikedPhotos(prev => ({ ...prev, [photoId]: !prev[photoId] }));
    } catch (err) { console.log(err); }
  }

  async function addComment(photoId) {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `http://localhost:3000/student/album/photo/addComment/${photoId}`,
        { message: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      getComments(photoId);
    } catch (err) { console.log(err); }
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
                  <button className="like-btn" onClick={(e) => { e.stopPropagation(); toggleLike(item._id); }}>
                    {likedPhotos[item._id] ? "❤️" : "🤍"}
                  </button>

                  <button className="view-comments-btn" onClick={(e) => { e.stopPropagation(); getComments(item._id); }}>
                    View Comments
                  </button>
                </div>

                {showComments && (
                  <div className="commentsSection">
                    <ul>
                      {comments.length > 0 ? (
                        comments.map((comment) => (
                          <li key={comment._id}>
                            <b>{comment.student?.name || "Student"}</b>: {comment.message}
                          </li>
                        ))
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </ul>

                    <div className="commentInputRow">
                      <input
                        type="text"
                        placeholder="Add Comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button onClick={(e) => { e.stopPropagation(); addComment(item._id); }}>
                        Post
                      </button>
                    </div>
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

export default StudentCollection;