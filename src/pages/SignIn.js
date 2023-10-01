import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import OAuth from '../components/OAuth'
export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const onChange = (e) => {
    console.log(e.target.value);
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const { email, password } = formData;
  return (
    <section className="max-w-6xl mx-auto">
      <h1 className='text-2xl text-center mt-6 font-bold text-green-800'>Sign In</h1>
      <div className='flex justify-center items-center flex-wrap px-6 py-12 mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img className="w-full rounded-md" src="https://lh4.googleusercontent.com/_BQfoaONnvHtgxYxXNyuAzMfNcBt1J8qoFUeCONMvj-5uLQ6x9nowXcFnWF8AKT426SYXKhrM4TC3IM9XnZdbtwk9A5OsoJ2sr1YYTn_VRSPM7pYa00gwJpXmM62LLZw=w1280" alt="key"/>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
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
              <p className='mb-6 '>Don't have a account?
                <Link className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1" to="/signup">Register</Link>
              </p>
              <p>
                <Link className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out" to="/forgetpassword">Forget password?</Link>
              </p>
            </div>
            <button className='w-full py-3 text-md text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 active:bg-green-900 transition duration-200 ease-in-out'>Sign in</button>
            <div className='my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'><p className="text-center font-semibold text-sm mx-4">OR</p></div>
            <OAuth/>
            </form>
        </div>
      </div>
    </section>
  )
}
