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
// import { PersistGate } from 'redux-persist/integration/react';
function App() {
  return (
    <>
    <LoginProvider>

    <Provider store={appStore}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/requests" element={<Requests/>} />
            <Route path="/connections" element={<Connections/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    {/* </PersistGate> */}
    </Provider>
    </LoginProvider>
    </>
  );
}

export default App;
