import React from 'react'
import header from './../images/jjheader.jpg' // Tell webpack this JS file uses this image

function Header() {
  // Import result is the URL of your image
  return <img src={header} alt='Joining Jill' />
}

export default Header
