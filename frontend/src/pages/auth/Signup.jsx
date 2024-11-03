import Navbar from '@/components/elements/Navbar'
// import React from 'react'

function Signup() {
  return (
    <section>
      <Navbar/>
      <div className='w-full max-w-md flex justify-center items-center p-6 mx-auto bg-[#f7f7f7] rounded-lg shadow-lg'>
         <form>
           <div >
            <input placeholder='Name'/> 
            </div>
            <div>
            <input placeholder='Name'/> 
            </div>
            <div>
            <input placeholder='Name'/> 
            </div>
        </form>  
      </div>
    </section>
  )
}

export default Signup