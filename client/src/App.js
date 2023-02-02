import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";


import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';


function App() {
// console.log(process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN);


  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN} >

      <Navbar />



      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />


      </Routes>



    </GoogleOAuthProvider>









  );
}

export default App;
