import React from 'react'
// import spinner from 'spinner.svg'
export default function Spinner() {
  return (
    <div>
      <div className='bg-black bg-opacity-50 fixed left-0 right-0 top-0 bottom-0 z-50 flex justify-center items-center'>
        <img className="h-24" src="spinner.svg" alt="Loading"/>
      </div>
    </div>
  )
}
