import React from 'react'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { toast } from 'react-toastify'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
export default function ForgetPassword() {
  const [email, setEmail] = React.useState("")
  const onChange = (e) => {
    setEmail(e.target.value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth()
      toast.success("Reset password email has been sent")
    } catch (error) {
      toast.error("Could not send reset password email")
    }
  }
  return (
    <section className="max-w-6xl mx-auto">
      <h1 className='text-2xl text-center mt-6 font-bold text-green-800'>Forget password</h1>
      <div className='flex justify-center items-center flex-wrap px-6 py-6 mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img className="w-full rounded-md" src="church.jpeg" alt="key"/>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-md transition ease-in-out mb-5" type="email" id="email" value={email} onChange={onChange} placeholder='Email address'/>
              <div className='flex justify-between text-sm sm:text-lg whitespace-nowrap'>
              <p className='mb-6 '>Don't have a account?
                <Link className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1" to="/signup">Register</Link>
              </p>
              <p>
                <Link className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out" to="/signin">Sign in instead</Link>
              </p>
            </div>
            <button className='w-full py-3 text-md text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 active:bg-green-900 transition duration-200 ease-in-out'>Send reset password</button>
            <div className='my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'><p className="text-center font-semibold text-sm mx-4">OR</p></div>
            <OAuth/>
            </form>
        </div>
      </div>
    </section>
  )
}
