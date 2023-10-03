import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import {db} from '../firebase'
import { collection, orderBy, query, getDocs, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Activities() {
  const auth = getAuth();
  const navigate = useNavigate()
  const [registrations, setRegistrations] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
    let total_hours = 0
    setLoading(true)
    const fetch_registrations = async () => {
      const registrationsRef = collection(db, 'registrations');
      const q = query(registrationsRef ,orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q)
      let registrations = []
      querySnapshot.forEach((doc) => {
        if (typeof registrations[doc.data().userRef] === 'undefined') {
          registrations[doc.data().userRef] = []
        }
        registrations[doc.data().userRef].push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setRegistrations(registrations)
      console.log(registrations)
      console.log(typeof(registrations))
      setLoading(false);
    }
    fetch_registrations();
  },[])
  
  return (
    <div className='w-full max-w-[800px] mx-auto'>
      <h1 className='text-2xl text-center mt-4'>Reports</h1>
      {loading ? <Spinner/> : (
        <div className="flex flex-row mt-4">
          <section className="w-[60%] ml-4 p-4 bg-green-200">
            <h2 className='text-xl text-center'>Families</h2>
            <div>
              {registrations && registrations.map((registration, index) => (
                <div>
                <h3 key={index} className='text-lg'>{index}</h3>
                <p>{registration[0]}</p>
                </div>
              ))}
            </div>
            <div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
