import React from 'react'
import Gym from '../../../images/gym.svg'
import Casual from '../../../images/casual.svg'
import Formal from '../../../images/formal.svg'
import Party from '../../../images/party.svg'

const DressStyle = () => {
  return (
    <div className="bg-[#F0F0F0] px-6 md:px-20 py-16 max-w-5xl mx-auto border border-gray-300 rounded-md">
      <h2 className="text-center text-2xl font-bold mb-8">BROWSE BY DRESS STYLE</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="col-span-1 flex flex-col items-center">
          <img src={Casual} alt="Casual" className="w-full h-auto object-cover" />
          <span className="mt-2 font-medium">Casual</span>
       </div>
        <div className="col-span-2 flex flex-col items-center">
          <img src={Formal} alt="Formal" className="w-full h-auto object-cover" />
          <span className="mt-2 font-medium">Formal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col items-center">
          <img src={Party} alt="Party" className="w-full h-auto object-cover" />
          <span className="mt-2 font-medium">Party</span>
        </div>
        <div className="col-span-1 flex flex-col items-center">
          <img src={Gym} alt="Gym" className="w-full h-auto object-cover" />
          <span className="mt-2 font-medium">Gym</span>
        </div>
      </div>
    </div>
  )
}

export default DressStyle
