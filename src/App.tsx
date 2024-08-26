import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
// import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import SignupPage from "./Pages/SignUpPage/SignUpPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
// import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";



function App() {
  

  return (
    <>
      <p>Home Page</p>
    
    
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
npm           }
        /> */}

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
    
    </Routes>
    </>

    
  )
}

export default App
