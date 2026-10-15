import App from "./App"; 
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Admin from "../Admin/Admin"
import Teacher_admin from "../Admin/Teacher_admin";
import Student_admin from "../Admin/Student_admin";
import Album_admin from "../Admin/Album_admin";
import Album_Collection from "../Admin/Album_Collection";
import Signup from "../Admin/Signup";
import Signin_admin from "../Admin/Signin_admin";
import AdminDashboard from "../Admin/AdminDashboard";   
//teacher
import Album_Teacher from "../Teacher/Album_Teacher";
import Teacher from "../Teacher/Teacher";
import Signin_teacher from "../Teacher/Signin_teacher";
import Profile from "../Teacher/Profile";
import Student_Teacher from "../Teacher/Student_Teacher";
import TeacherCollection from "../Teacher/TeacherCollection"
import TeacherDashboard from "../Teacher/TeacherDashBoard";
//student
import Student from "../Student/Student";
import Signin_student from "../Student/Signin_student";
import Profile_student from "../Student/Profile_student";
import Album_Student from "../Student/Album_student";
import StudentCollection from "../Student/StudentCollection";
import StudentDashboard from "../Student/StudentDashBoard";


function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>


        <Route path="admin" element={<Admin />}>
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin_admin />} />
            <Route path="albumCollection" element={<Album_Collection />} />

            <Route element={<AdminDashboard />}>
              <Route element={<div>AdminDashboard</div>} />

              <Route index element={<Navigate to="teacher" replace />} />
              <Route path="teacher" element={<Teacher_admin />} />
              <Route path="student" element={<Student_admin />} />
              <Route path="album" element={<Album_admin />} />
            </Route>
          </Route>

         
        <Route path="teacher" element={<Teacher />}>
         
          <Route path="signin" element={<Signin_teacher />} /> 
         <Route path="albumCollection" element={<TeacherCollection />} />

          <Route element={<TeacherDashboard />}>
            <Route index element={<div>TeacherDashboard </div> } />
            <Route path="profile" element={<Profile />} />
            <Route path="student" element={<Student_Teacher />} />
            <Route path="album" element={<Album_Teacher />} />
            
          </Route>
        </Route>

          <Route path="student" element={<Student />}>
          <Route path="signin" element={<Signin_student />} />
          <Route path="albumCollection" element={<StudentCollection />} />
          
          <Route element={<StudentDashboard />}>
            <Route index element={<div>StudentDashboard </div> } />
            <Route path="profile" element={<Profile_student />} />
            <Route path="album" element={<Album_Student />} />
            
          </Route>
        </Route>

        
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);