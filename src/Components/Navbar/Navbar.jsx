import React from 'react'
import './Navbar.css'
//In JavaScript, you cannot use hyphens (-) in variable names because they are 
// interpreted as the minus operator. so we cannot write menu-icon here
import MenuIcon from '../../assets/menu.png' 
import Logo from '../../assets/logo-2.png'
import SearchIcon from '../../assets/search.png'
import UploadIcon from '../../assets/upload.png'
import MoreIcon from '../../assets/more.png'
import NotificationIcon from '../../assets/notification.png'
import ProfileIcon from '../../assets/jack.png'

import { Link } from 'react-router-dom'


const Navbar = ({setSidebar}) => {
  return (
    <nav className='flex-div'>
        <div className='nav-left flex-div'>
            <img className='menu-icon' src={MenuIcon} onClick={()=>setSidebar(prev=>(prev===false)?true:false)} alt="" />
            <Link to='/'><img className = 'logo' src={Logo} alt="" /></Link>
        </div>

        <div className='nav-middle flex-div'>
            <div className='search-box flex-div'>
            <input type="text" placeholder='Search' />
            <img  src={SearchIcon} alt="" />
            </div>

        </div>

        <div className='nav-right flex-div'>
            <img src={UploadIcon} alt="" />
            <img src={MoreIcon} alt="" />
            <img src={NotificationIcon} alt="" />
            <img className='user-icon' src={ProfileIcon} alt="" />

        </div>

    </nav>
  )
}

export default Navbar