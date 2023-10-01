import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SingUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import Activities from "./pages/Activities";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/SignUp" element={<SingUp />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Activities" element={<Activities />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
