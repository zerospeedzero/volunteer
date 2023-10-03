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
  const [registrations, setRegistrations] = React.useState(false)
  const [timereported, setTimereported] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
    setLoading(true)
    const fetch_registrations = async () => {
      const registrationsRef = collection(db, 'registrations');
      const q = query(registrationsRef, where('userRef', '==', auth.currentUser.uid) ,orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q)
      let registrations = []
      querySnapshot.forEach((doc) => {
        return registrations.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setRegistrations(registrations)
      setLoading(false);
      console.log(registrations)
    }
    fetch_registrations();
  },[])

  const onsubmit = async (id, timereported) => {
    console.log(id)
    console.log(timereported)
    try {
      const docRef = doc(db, "registrations", id)
      await updateDoc(docRef, {
        timereported: timereported,  
      })
      toast.success("Hours earned updated successfully")
    } catch (error) {
      toast.error("Could not update the hours earned")
    }
  }
  const onChange = (e) => {
    setTimereported(e.target.value)
    console.log(timereported)
  } 
  return (
    <div className='w-full max-w-[800px] mx-auto'>
      <h1 className='text-2xl text-center mt-4'>Activities</h1>
      {loading ? <Spinner/> : (
        <div className="flex flex-row mt-4">
          <aside className="w-[30%] bg-orange-200 p-4">
            <h2 className='text-xl '>Menu</h2>
            <ul className='mt-4'>
              <li className='text-lg bg-green-100 rounded-md shadow-md hover:bg-gray-300 p-1'><Link to="/CreateActivity">Create activity</Link></li>
            </ul>
          </aside>
          <section className="w-[60%] ml-4 p-4 bg-green-200">
            <h2 className='text-xl text-center'>My activities</h2>
            <div>
              {registrations && registrations.map((registration,index) => (
                <form>
                  <h3>Activity:</h3>
                  <p>{registration.data.description}</p>
                  <h3>Time reported: </h3>
                  <input type="number" id="timereported" name="timereported" value={registration.data.timereported} disabled/>
                  <h3>Time reported (New): </h3>
                  <input type="number" id="timereported" name="timereported" value={timereported} onChange={onChange}/>
                  <button type="button" className={`w-full mt-4 p-4 bg-blue-500 text-white rounded-md shadow-md hover:shadow-lg hover:bg-blue-700`}
                    onClick={() => onsubmit(registration.id, timereported)}
                  >
                    Update hours
                  </button>      

                </form>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
