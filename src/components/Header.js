import React from 'react'
import { useLocation, useNavigate } from 'react-router'
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  function pathMathRoute(route){
    if(route === location.pathname){
      return true;
    }
  }
  return (
    <header className='flex justify-between items-center px-4 py-4 max-w-6xl mx-auto border-b shadow-sm sticky top-0 z-50 bg-green-700'>
      <div className='flex justify-start items-center'>
        <img className="h-12 cursor-pointer" src="https://lh3.googleusercontent.com/fffd_n92QwSdVuSBqHX2JhR5mZ3O6E1EYPGc8AYiVk-PJFWBz89sbF1sj-AjR3mqust4SvCXKAVDBn-_PFrfVco=w16383" alt="home" onClick={()=>navigate("/")}/>
        <h1 className='pl-4 text-white text-xl'>PLAY Daycare volunteer</h1>
      </div>
      <nav>
        <ul className='flex space-x-10'>
          <li className={`pointer-cursor py-3 text-sm font-semibold text-gray-200 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "text-white border-b-orange-500"}`}><a href="/">Home</a></li>
          <li className={`pointer-cursor py-3 text-sm font-semibold text-gray-200 border-b-[3px] border-b-transparent ${pathMathRoute("/activities") && "text-white border-b-orange-500"}`}><a href="/activities">Activities</a></li>
          <li className={`pointer-cursor py-3 text-sm font-semibold text-gray-200 border-b-[3px] border-b-transparent ${pathMathRoute("/signIn") && "text-white border-b-orange-500"}`}><a href="/signIn">Sign In</a></li>
        </ul>
      </nav>
    </header>
  )
}
