import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router'

export default function OAuth() {
  const navigate = useNavigate()
  async function onGoogleClick() {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // check for the user in the firebase database and create a new user if not exists
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          timestamp: serverTimestamp(),
        })
      }
      navigate("/")
      console.log(user)
    } catch (error) {
      toast.error("Could not sign in with Google")
      console.log(error)
    }
  }
  return (
    <button type="button" className='flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 rounded-md hover:bg-red-800 active:bg-red-900 transition duration-200 ease-in-out shadow-md'
      onClick={onGoogleClick} 
    >
      <FcGoogle className='mr-4 text-2xl bg-white rounded-full'/>
      Continue with Google
    </button>
  )
}
