import React from 'react'
import { Link } from 'react-router-dom'

/**
 * The home page
 * @returns
 */
const Home = () => {
  return (
    <div
      className='w-full h-screen bg-gradient-to-r from-baby-blue/10 
        to-azure/10 grid content-center justify-items-center'
    >
      <p className='w-4/5 m-3 font-bold text-3xl text-center'>Mel Survey</p>

      <p className='w-4/5 m-2 font-bold text-2xl text-center'>
        Create surveys or take one of the many surveys that we have.
      </p>

      <div className='inline-flex flex-col sm:flex-row items-center'>
        <Link
          className='bg-baby-blue px-10 pt-3 pb-4 rounded-2xl m-5
                        hover:bg-azure transition-all font-bold text-xl text-white 
                        shadow-lg shadow-baby-blue/50 hover:shadow-azure/40'
          to='/surveys'
        >
          Get surveys
        </Link>

        <Link
          className='bg-baby-blue px-10 pt-3 pb-4 rounded-2xl m-5
                        hover:bg-azure transition-all font-bold text-xl text-white 
                        shadow-lg shadow-baby-blue/50 hover:shadow-azure/40'
          to='/newsurvey'
        >
          Create survey
        </Link>
      </div>
    </div>
  )
}

export default Home
