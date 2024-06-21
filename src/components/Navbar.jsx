import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className='h-20 text-white flex items-center gap-10 justify-center bg-black'>
       <Link to={"/"}>Level 1</Link>
       <Link to={"/level2"}>Level 2</Link>
       <Link to={"/level3"}>Level 3</Link>
    </nav>
  )
}

export default Navbar