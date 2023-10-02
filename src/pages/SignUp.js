import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import OAuth from '../components/OAuth'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {db} from '../firebase'
import { serverTimestamp } from 'firebase/firestore'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

export default function SingUp() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    email: '',
    password: '',
  })
  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const { name, email, password } = formData;
  const navigate =useNavigate()
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      // toast.success("Sign up successfully")
      navigate("/")
      console.log(user)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong with the registration")
    }
  }

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className='text-2xl text-center mt-6 font-bold text-green-800'>Sign Up</h1>
      <div className='flex justify-center items-center flex-wrap px-6 py-6 mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img className="w-full rounded-md" src="church.jpeg" alt="key"/>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-md transition ease-in-out mb-5" type="text" id="name" value={name} onChange={onChange} placeholder='Name'/>
            <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-md transition ease-in-out" type="email" id="email" value={email} onChange={onChange} placeholder='Email address'/>
            <div className='relative my-4'>  
              <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-md transition ease-in-out" 
                type={showPassword ? "text": "password"} id="password" value={password} placeholder='password' onChange={onChange}
              />
              {showPassword? 
                (<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>)
                : 
                (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>)}
            </div>
            <div className='flex justify-between text-sm sm:text-lg whitespace-nowrap'>
              <p className='mb-6 '>Have a account?
                <Link className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1" to="/signin">Sign Up</Link>
              </p>
              <p>
                <Link className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out" to="/forgetpassword">Forget password?</Link>
              </p>
            </div>
            <button className='w-full py-3 text-md text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 active:bg-green-900 transition duration-200 ease-in-out'>Sign Up</button>
            <div className='my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'><p className="text-center font-semibold text-sm mx-4">OR</p></div>
            <OAuth/>
            </form>
        </div>
      </div>
    </section>
  )
}
