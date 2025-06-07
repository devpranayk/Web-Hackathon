import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authenication from './authenication/Authenication';
import InterviewerLogin from './authenication/InterviewerLogin';
import StudentSidebar from './students/Studentbar';
import InterViewSideBar from './interviewer/InterviewSidebar';
import FacultyLogin from './authenication/FacultyAuth';
import FacultySidebar from './faculty/FacultySidebar';
import Home from './Home';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/auth" element={<Authenication />} />
          <Route path='/inter' element={<InterViewSideBar />} />
          <Route path='/faculty-auth' element={<FacultyLogin />} />
          <Route path='/profile' element={<StudentSidebar />} />
          <Route path='/faculty' element={<FacultySidebar />} />
          <Route path='/in' element={<InterviewerLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
