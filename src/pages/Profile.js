import { getAuth } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router'

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [fromData, setFormData] = React.useState({name: auth.currentUser.displayName, email: auth.currentUser.email})
  const {name, email} = fromData
  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }
  return (
    <>
      <section className='max-w-5xl mx-auto'>
        <h1 className='text-3xl text-center mt-4 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mx-auto mt-5'>
          <form>
            <input className="mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white border border-gray-300 rounded-md transition ease-in-out" type="text" id="name" value={name} disabled/>
            <input className="mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white border border-gray-300 rounded-md transition ease-in-out" type="email" id="email" value={email} disabled/>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg items-center'>
              <p className='flex items-center mb-6'>Do you want to change your name?
                <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>Edit</span>
              </p>
              <p onClick={onLogout} className='text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 mb-6 cursor-pointer'>Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
