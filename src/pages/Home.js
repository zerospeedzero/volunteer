import { collection, orderBy, query, getDocs, addDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../firebase';
import Spinner from '../components/Spinner'
import { serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate()
  const auth = getAuth();
  const [activities, setActivities] = React.useState(false)
  const [loading, setLoading] = React.useState(false) 
  useEffect(() => {
    setLoading(true)
    const fetch_activities = async () => {
      const activitiesRef = collection(db, 'activities');
      const q = query(activitiesRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q)
      let activities = []
      querySnapshot.forEach((doc) => {
        return activities.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setActivities(activities)
      setLoading(false);
      console.log(activities)
    }
    fetch_activities();
  },[])
  const onSubmit = async (id) => {
    setLoading(true)
    const formDataCopy = {
      activity_id: id,
      userRef: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      userEmail: auth.currentUser.email,
      description: activities.find((activity) => activity.id === id).data.description,
      timestamp: serverTimestamp(),
      timereported: 0
    }
    const docRef = await addDoc(collection(db, "registrations"), formDataCopy)
    setLoading(false)
    toast.success("Activity created successfully")
    navigate("/activities")
    console.log(docRef)
  }
  return (
    <div className='w-full max-w-3xl mx-auto'>
      <h1 className='text-3xl text-center mt-4'>All activities</h1>
      {loading && <Spinner/>}
      <div>
        {activities && activities.map((activity, index) => (
          <div key={index} className='mt-4 p-4 bg-green-200'>
            <div className='flex justify-start items-center text-xl mb-2'>
              <h3 className=''>Category: </h3>
              <p >{activity.data.category}</p>
            </div>

            <div className='flex mt-4 py-4 justify-start items-center mb-2 space-x-4'>
              <p className='text-xl'>Description:</p>
              <p className='p-2 w-full bg-green-100'>{activity.data.description}</p>
            </div>
            <p className='text-xl'>Hours earned per month</p>
            <p className='p-2 bg-green-100'>{activity.data.hours_earned}</p>
            <p className='text-xl'>Timing</p>
            <p className='p-2 bg-green-100'>{activity.data.timing}</p>
            <p className='text-xl'>Remark</p>
            <p className='p-2 bg-green-100'>{activity.data.remark}</p>
            <div className='flex justify-start items-center text-xl mb-2'>
              <h3 className=''>Created at : </h3>
              <p >{activity.data.timestamp.seconds}</p>
            </div>
            <button className={`w-full mt-4 p-4 bg-blue-500 text-white rounded-md shadow-md hover:shadow-lg hover:bg-blue-700`}
              onClick={()=>{onSubmit(activity.id)}}
            >
              Register activity
            </button>      
          </div>
        ))}
      </div>
    </div>
  )
}
