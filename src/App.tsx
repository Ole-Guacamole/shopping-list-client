import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import SignupPage from "./Pages/SignUpPage/SignUpPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import ShoppingListPage from "./Pages/ShoppingListPage/ShoppingListPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <div className="App flex flex-col items-center justify-center min-h-screen max-w-xl mx-auto">
        <Navbar />
        <Routes>
          <Route path="*" element={<Navbar />} />
          <Route path="/" element={<IsPrivate><HomePage /></IsPrivate>} />

          <Route
            path="/profile"
            element={
              <IsPrivate>
                <ProfilePage />
              </IsPrivate>
            }
          />

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

          <Route
            path="/shopping-list/:shoppingListId"
            element={
              <IsPrivate>
                <ShoppingListPage />
              </IsPrivate>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
