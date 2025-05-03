import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register";
import { StatesProvider } from "./Context/Context";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Pages/Profile";
import MyPosts from "./Pages/MyPosts";
import RegisteredPosts from "./Pages/RegisteredPosts";
import UpdatePost from "./Pages/UpdatePost";
import SinglePost from "./Pages/SinglePost";
import AddEstate from "./Pages/AddEstate";
function App() {
  return (
    <>
      <StatesProvider>
        <Routes>
          <Route path="/company-signin" element={<SignIn />} />
          <Route path="/company-register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/add-estate" element={<AddEstate />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/update-post/:postId/:type" element={<UpdatePost />} />
            <Route path="/single-post/:id" element={<SinglePost />} />
            <Route path="/registered-posts" element={<RegisteredPosts />} />
          </Route>
        </Routes>
      </StatesProvider>
    </>
  );
}

export default App;
