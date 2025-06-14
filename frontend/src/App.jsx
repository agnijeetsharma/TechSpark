import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import { LoginProvider } from "./utils/LoginContext";
import About from "./components/About";
import Connections from "./components/Connections";
import  Requests  from "./components/Requests";
import UserProfileView from "./components/UserProfilePage";
import ChatFeature from "./components/Chat";
import ReadMorePage from "./components/PostContent";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatePost";
import UserPosts from "./components/UserPosts";
import TermsAndConditions from "./components/TermsAndConditions";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    < >
    <LoginProvider>

    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/requests" element={<Requests/>} />
            <Route path="/connections" element={<Connections/>} />
            <Route path="/profile/:id" element={<UserProfileView />} />
            <Route path="/chat/:id" element={<ChatFeature />} />
            <Route path="/posts" element={<PostFeed/>} />
            <Route path="/post/content/:postId" element={<ReadMorePage/>} />
            <Route path="/createPost" element={<CreatePost/>} />
            <Route path="/myPost" element={<UserPosts/>} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/contact" element={<ContactUs/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </LoginProvider>
    </>
  );
}

export default App;
