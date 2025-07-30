import React from 'react'
import Navbar from '../../navbar/Navbar'
import Header from '../../signupheader.jsx/Header'
import HomeView from '../../Home/Home'

const HomePage = () => {
  return (
    <div>
      <Header/>
      <Navbar />
      <HomeView />
    </div>
  )
}

export default HomePage