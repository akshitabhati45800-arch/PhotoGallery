import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Album.css";
import { useNavigate } from "react-router";

   
function Album_admin() {
  const token = localStorage.getItem("token");
   const navigate =useNavigate();
  // Album States
  const [albums, setAlbums] = useState([]);
  const [title, setTitle] = useState("");
  const [step, setStep] = useState(0); // 0 = Album Management, 1 = Create Album, 2 = Photo Management
  const [newAlbumId, setNewAlbumId] = useState(null);

  // Photo States
  const [photos, setPhotos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  

  const getAlbum = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/viewAlbum", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlbums(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAlbum();
  }, []);


  const createAlbum = async () => {
    if (!title.trim()) {
      alert("Please enter album title");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/admin/createAlbum",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlbums((prev) => [...prev, res.data.album]);

      setNewAlbumId(res.data.album._id);
      setTitle("");
      setStep(2);
    } catch (err) {
      console.log(err);
    }
  };


  const deleteAlbum = async (albumId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/deleteAlbum/${albumId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlbums((prev) => prev.filter((album) => album._id !== albumId));
    } catch (err) {
      console.log(err);
    }
  };


  const getPhotos = async (albumId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/admin/album/viewPhoto/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPhotos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (newAlbumId) {
      getPhotos(newAlbumId);
    }
  }, [newAlbumId]);

  const addPhoto = async () => {
    if (!selectedFiles.length) {
      alert("Please select photos.");
      return;
    }

    try {
      const formData = new FormData();

      selectedFiles.forEach((file) => {
        formData.append("photos", file);
      });

      await axios.post(
        `http://localhost:3000/admin/album/addPhoto/${newAlbumId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Photos uploaded successfully");

      setSelectedFiles([]);

     alert("Photos uploaded successfully");

setSelectedFiles([]);

getPhotos(newAlbumId);
  
    } catch (err) {
      console.log(err);
    }
  };

  const deletePhoto = async (photoId) => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/album/deletePhoto/${photoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPhotos((prev) => prev.filter((photo) => photo._id !== photoId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Album_admin">

      {step !== 2 && (
        <>
          <h1>Album Management</h1>

          <button onClick={() => setStep(1)}>Add New Album</button>

          <div className="album-grid">
            {albums.map((album) => (
                 <div className="album-card" key={album._id}>
        {album.coverImage ? (
           <img src={album.coverImage} alt={album.title} />
          ) : (
         <div className="no-cover">No Cover Image</div>
              )}

                <h3>{album.title}</h3>
        <button
         className="explore-btn"
            onClick={() => {
         setNewAlbumId(album._id);
           navigate("/admin/albumCollection",
             { state: { newAlbumId: album._id }});  }}
                > Explore  </button>
        <button
           className="manage-btn"
            onClick={() => {
             setNewAlbumId(album._id);
           setStep(2)  }}>Manage Photos
                </button>
            <button
             className="delete-btn"
             onClick={() => deleteAlbum(album._id)}
             >
            Delete Album
           </button>
          </div>
            ))}
          </div>

          {step === 1 && (
            <div className="addNewAlbum">
              <h2>Create Album</h2>

              <input
                type="text"
                placeholder="Album Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <button onClick={createAlbum}>Save Album</button>

              <button
                onClick={() => {
                  setStep(0);
                  setTitle("");
                }}
              > Cancel
              </button>
            </div>
          )}
        </>
      )}

      {step === 2 && (
        <div className="PhotoManagement">
          <h1>Photo Management</h1>

          <div className="add-photo-section">
       <input
         type="file"
        multiple
        accept="image/*"
        onChange={(e) => setSelectedFiles(Array.from(e.target.files))}/>

            <button onClick={addPhoto}>Upload Photos</button>
          </div>

         
          {selectedFiles.length > 0 && (
  <>
    <h3>Selected Photos</h3>
    <div className="selected-grid">
      {selectedFiles.map((file, index) => (
        <div className="photo-card" key={index}>
          <img src={URL.createObjectURL(file)} alt={file.name} />
          <p>{file.name}</p>
        </div>
      ))}
    </div>
  </>
)}

          <hr />
          <h2>Uploaded Photos</h2>
      <div className="preview-section">
          <div className="photo-grid">
            {photos.length === 0 ? (
              <p>No photos uploaded yet.</p>
            ) : (
              photos.map((photo) => (
                <div className="photo-card" key={photo._id}>
                  <img src={photo.url} alt="Uploaded" />
                  <button onClick={() => deletePhoto(photo._id)}>delete</button>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => {
              setStep(0);
              setPhotos([]);
              setSelectedFiles([]);
            }}
          >
            Done
          </button>
           </div>
        </div>
      )}
    </div>
  );
}

export default Album_admin;