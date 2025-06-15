import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import { LoginProvider } from "./utils/LoginContext";
import About from "./components/About";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import UserProfileView from "./components/UserProfilePage";
import ChatFeature from "./components/Chat";
import ReadMorePage from "./components/PostContent";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatePost";
import UserPosts from "./components/UserPosts";
import TermsAndConditions from "./components/TermsAndConditions";
import ContactUs from "./components/ContactUs";
import ProtectedRoute from "./utils/ProtectedRoutes";

function App() {
  return (
    <>
      <LoginProvider>
        <Provider store={appStore}>
          <BrowserRouter basename="/">
            <Routes>
              <Route
                path="/"
                element={
                  //  <ProtectedRoute>
                  <Body />
                  // </ProtectedRoute>
                }
              >
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route
                  path="/requests"
                  element={
                    <ProtectedRoute>
                      <Requests />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/connections"
                  element={
                    <ProtectedRoute>
                      <Connections />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile/:id"
                  element={
                    <ProtectedRoute>
                      <UserProfileView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat/:id"
                  element={
                    <ProtectedRoute>
                      <ChatFeature />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/posts"
                  element={
                    <ProtectedRoute>
                      <PostFeed />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/post/content/:postId"
                  element={
                    <ProtectedRoute>
                      <ReadMorePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/createPost"
                  element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/myPost"
                  element={
                    <ProtectedRoute>
                      <UserPosts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="/contact" element={<ContactUs />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </LoginProvider>
    </>
  );
}

export default App;
