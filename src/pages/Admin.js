import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'

export default function Activities() {
  const [loading, setLoading] = React.useState(false)
  return (
    <div className='w-full max-w-[800px] mx-auto'>
      <h1 className='text-2xl text-center mt-4'>Activities</h1>
      {loading ? <Spinner/> : (
        <div className="flex flex-row mt-4">
          <aside className="w-[30%] bg-orange-200 p-4">
            <h2 className='text-xl '>Menu</h2>
            <ul className='mt-4'>
              <Link to="/CreateActivity"><li className='mt-4 text-lg bg-green-100 rounded-md shadow-md hover:bg-gray-300 p-1'>Create activity</li></Link>
              <Link to="/Reports"><li className='mt-4 text-lg bg-green-100 rounded-md shadow-md hover:bg-gray-300 p-1'>Report</li></Link>
            </ul>
          </aside>
        </div>
      )}
    </div>
  )
}
