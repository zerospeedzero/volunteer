import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
export default function Header() {
  const [pageState, setPageState] = React.useState("Sign In") 
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setPageState("Profile")
      }else{
        setPageState("Sign In")
      }
    })
  }, [auth])
  function pathMatchRoute(route){
    if(route === location.pathname){
      return true;
    }
  }
  return (
    <header className='flex justify-between items-center px-4 py-4 max-w-6xl mx-auto border-b shadow-sm sticky top-0 z-40 bg-green-700'>
      <div className='flex justify-start items-center'>
        <img className="h-12 cursor-pointer" src="icon.png" alt="home" onClick={()=>navigate("/")}/>
        <h1 className='pl-4 text-white text-xl'>PLAY Daycare volunteer</h1>
      </div>
      <nav>
        <ul className='flex space-x-10'>
          <li className={`pointer-cursor py-3 text-sm font-semibold text-gray-200 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-white border-b-red-500"}`}><Link to="/">Home</Link></li>
          <li className={`pointer-cursor py-3 text-sm font-semibold text-gray-200 border-b-[3px] border-b-transparent ${pathMatchRoute("/activities") && "text-white border-b-red-500"}`}><Link to="/activities">Activities</Link></li>
          <li className={`pointer-cursor py-3 text-sm font-semibold text-gray-200 border-b-[3px] border-b-transparent ${(pathMatchRoute("/signIn") || pathMatchRoute("/profile")) && "text-white border-b-red-500 cursor-pointer"}`} onClick={()=> navigate("/profile")}>{pageState}</li>
        </ul>
      </nav>
    </header>
  )
}
