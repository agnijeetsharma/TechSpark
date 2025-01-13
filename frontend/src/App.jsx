import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import { LoginProvider } from "./utils/LoginContext";
import About from "./components/About";
function App() {
  return (
    <>
    <LoginProvider>

    <Provider store={appStore}>

      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </LoginProvider>
    </>
  );
}

export default App;
