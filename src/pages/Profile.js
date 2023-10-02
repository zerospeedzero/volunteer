import { getAuth, updateProfile } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails, setChangeDetails] = React.useState(false)
  const [fromData, setFormData] = React.useState({name: auth.currentUser.displayName, email: auth.currentUser.email})
  const {name, email} = fromData
  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const onsubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name) {
        // update name in the auth  
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name: name,
        })
      }
      toast.success("Profile details updated successfully")
    } catch (error) {
      toast.error("Could not update the profile details")
    }
  }
  return (
    <>
      <section className='max-w-5xl mx-auto'>
        <h1 className='text-3xl text-center mt-4 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mx-auto mt-5'>
          <form>
            <input className={`mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white border border-gray-300 rounded-md transition ease-in-out ${changeDetails && "bg-red-200 focus:bg-red-200"}`} type="text" id="name" value={name} disabled={!changeDetails} onChange={onChange}/>
            <input className="mb-6 w-full px-4 py-2 text-xl text-gray-500 bg-white border border-gray-300 rounded-md transition ease-in-out" type="email" id="email" value={email}/>
            <div className='flex justify-between whitespace-nowrap text-sm  items-center'>
              <p className='flex items-center mb-6'>Do you want to change your name?
                <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'
                  onClick={() => { changeDetails && onsubmit(); setChangeDetails((prevState) => !prevState)}}
                >
                  {changeDetails ? "Apply Change" : "Edit"}
                </span>
              </p>
              <p onClick={onLogout} className='text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 mb-6 cursor-pointer'>Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
