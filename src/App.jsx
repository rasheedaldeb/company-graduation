import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import { StatesProvider } from "./Context/Context";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Pages/Profile";
import MyPosts from "./Pages/MyPosts";
import RegisteredPosts from "./Pages/RegisteredPosts";
import UpdatePost from "./Pages/UpdatePost";
function App() {
  return (
    <>
      <StatesProvider>
        <Routes>
          <Route path="/company-signin" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
            <Route path="/registered-posts" element={<RegisteredPosts />} />
          </Route>
        </Routes>
      </StatesProvider>
    </>
  );
}

export default App;
