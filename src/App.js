import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SingUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import Activities from "./pages/Activities";
import CreateActivity from "./pages/CreateActivity";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/SignUp" element={<SingUp />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Activities" element={<Activities />} />
          <Route path="/CreateActivity" element={<CreateActivity />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"dark"}
      />

    </>
  );
}
export default App;
