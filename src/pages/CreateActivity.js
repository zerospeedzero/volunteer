import React from 'react'
import Spinner from '../components/Spinner'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { serverTimestamp } from 'firebase/firestore'

export default function CreateActivity() {
  const [changeDetails, setChangeDetails] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const [formData, setFormData] = React.useState({
    type: "one",
    description: "",
    timing: "",
    hours_earned: "0",
    remark: "",
  })
  const {type, description, timing, hours_earned, remark} = formData 
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formDataCopy = {...formData, timestamp: serverTimestamp()}
    const docRef = await addDoc(collection(db, "activities"), formDataCopy)
    setLoading(false)
    toast.success("Activity created successfully")
    console.log(docRef)
  }
  if (loading)  {
    return <Spinner/>
  }
  return (
    <main className='w-full max-w-lg mx-auto'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Create a activity</h1>
      <form className='' onSubmit={onSubmit}>
        <p className='text-lg mt-8 mb-2 font-semibold '>Activity category</p>
        <div className='flex justify-center items-center'>
          <button id="category" type="button" value="one" onClick={onChange}
            className={`px-4 py-2 mr-2 text-lg bg-green-200 text-white rounded-md shadow-md hover:shadow-lg active:shadow-lg transition ease-in-out hover:bg-slate-400 w-full 
            ${type == "one" ? "bg-green-200 text-black" : "bg-slate-600 text-white"}`}
          >
            One time
          </button>
          <button id="category" type="button" value="repeat" onClick={onChange}
            className={`px-4 py-2 ml-2 text-lg bg-green-200 text-white rounded-md shadow-md hover:shadow-lg active:shadow-lg transition ease-in-out hover:bg-slate-400 w-full
            ${type == "one" ? "bg-green-200 text-black" : "bg-slate-600 text-white"}`}
          >
            Repeat
          </button>
        </div>
        <p className='text-lg mt-4 mb-2 font-semibold '>Activities description</p>
        <textarea className={`w-full px-4 py-2 text-xl text-gray-500 bg-white border border-gray-300 rounded-md transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 ${changeDetails && "bg-red-200 focus:bg-red-200"}`} 
          id="description" name="description" rows="5" value={description} onChange={onChange} placeholder='Input the description of the activity'
        />
        <p className='text-lg mt-4 mb-2 font-semibold '>Timing</p>
        <textarea className={`w-full px-4 py-2 text-xl text-gray-500 bg-white border border-gray-300 rounded-md transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 ${changeDetails && "bg-red-200 focus:bg-red-200"}`} 
          id="timing" name="timing" value={timing} rows="3" onChange={onChange} placeholder='Input the timing of the activity'
        />
        <div className='mt-4 flex justify-center items-center'>
          <p className='w-[60%] text-lg font-semibold '>Hours Earned per month:</p> 
          <input className={`w-[40%] px-4 py-2 text-xl text-gray-500 bg-white border border-gray-300 rounded-md transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 ${changeDetails && "bg-red-200 focus:bg-red-200"}`} 
          id="hours_earned" name="hours_earned" type="number" max="1000" min="0" value={hours_earned} onChange={onChange} placeholder='Input the hours earned per month'
          />
        </div>
        <p className='text-lg mt-4 mb-1 font-semibold '>Remark</p>
        <textarea className={`w-full px-4 py-2 text-xl text-gray-500 bg-white border border-gray-300 rounded-md transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 ${changeDetails && "bg-red-200 focus:bg-red-200"}`} 
          id="remark" name="remark" value={remark} rows="3" onChange={onChange} placeholder='Input the timing of the activity'
        />
        <button className={`w-full mt-4 p-4 bg-blue-500 text-white rounded-md shadow-md hover:shadow-lg hover:bg-blue-700`}>Create activity</button>      
      </form>
    </main>
  )
}
