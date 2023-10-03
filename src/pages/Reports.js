import React from 'react'
import Spinner from '../components/Spinner'
import {db} from '../firebase'
import { collection, orderBy, query, getDocs} from 'firebase/firestore';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export default function Activities() {
  const auth = getAuth();
  const [registrations, setRegistrations] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
    // let total_hours = 0
    setLoading(true)
    const fetch_registrations = async () => {
      const registrationsRef = collection(db, 'registrations');
      const q = query(registrationsRef ,orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q)
      let registrations = []
      querySnapshot.forEach((doc) => {
        const userExist = registrations.find((registration) => registration.userName === doc.data().userName)
        if (!userExist) {
          registrations.push({
            userName: doc.data().userName,
            records:[],
            total_hours: 0
          })
        }
        const userIndex = registrations.findIndex((registration) => registration.userName === doc.data().userName)
        registrations[userIndex].records.push({
          id: doc.id,
          data: doc.data(),
        })
        registrations[userIndex].total_hours += Number(doc.data().timereported)
      })
      setRegistrations(registrations)
      console.log(registrations)
      console.log(typeof(registrations))
      setLoading(false);
    }
    fetch_registrations();
  },[auth.currentUser])
  
  return (
    <div className='w-full max-w-[800px] mx-auto'>
      <h1 className='text-2xl text-center mt-4'>Reports</h1>
      {loading ? <Spinner/> : (
        <div className="flex flex-row mt-4">
          <section className="w-[60%] ml-4 p-4 bg-green-200">
            <h2 className='text-xl text-center'>Families</h2>
            <div>
              {registrations && registrations.map((registration, index) => (
                <div className='bg-white p-4 mt-4'>
                  <h3 key={index} className='text-lg'>Family {registration.userName}</h3>
                  <p>email: {registration.records[0].data.userEmail}</p>
                  <ul>
                    {registration.records.map((record, index) => (
                      <li className='my-1 p-2 bg-gray-200'>
                        <p className='text-sm'>{record.data.description}</p>
                        <p className='text-sm'>Hours earned: {record.data.timereported}</p>
                      </li>
                    ))}
                  </ul>
                  <p className='bg-red-300 mt-4 p-2 '>Total hours earned: {registration.total_hours}</p>
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
