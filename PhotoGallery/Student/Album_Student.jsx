import React,{useEffect,useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../CSS/Album.css";

  function Album_Student(){

  const navigate=useNavigate();
  const token=localStorage.getItem("token");

    const [albums,setAlbums]=useState([]);
    const [loading,setLoading]=useState(true);

    const config={
    headers:{
    Authorization:`Bearer ${token}`,
    },
    };

        const getAlbum=async()=>{
        try{
        const res=await axios.get(
        "http://localhost:3000/student/viewAlbum",
        config
        );

        setAlbums(res.data);
        }catch(err){
        console.log(err);
        }
        finally{
        setLoading(false);
        }
        };

        useEffect(()=>{
        getAlbum();
        },[]);

        const exploreAlbum=(albumId)=>{
        navigate("/student/albumCollection",{
        state:{newAlbumId:albumId},
        });
        };

        return(
        <div className="Album_admin">

        <h1>Photo Albums</h1>

        <div className="album-grid">

        {loading?(
           <p className="noAlbum">Loading Albums...</p>
        ):albums.length===0?(
        <p className="noAlbum">No Albums Available</p>
           ):(
           albums.map((album)=>(
          <div className="album-card" key={album._id}>

           {album.coverImage?(
          <img src={album.coverImage} alt={album.title}/>
          ):(
        <div className="no-cover">
        No Cover Image
        </div>
        )}

        <h3>{album.title}</h3>

       <button
        className="explore-btn"
        onClick={() => exploreAlbum(album._id)}
      >
        Explore
      </button>

        </div>
        ))
        )}

        </div>

        </div>
        );
          }

        export default Album_Student;