import React from "react";
import { RxDashboard } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";


function Navbar({ search, setSearch }){
    return(
        <>
        <div className="bar">
            <h2><RxDashboard /> Dashboard</h2>
            <div className="find">
                <div>
                    <IoSearchSharp className="searchicon" />
                    <input className='search' type="text" placeholder="Search task" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <FaUser className="usericon"/>
            </div>
        </div>
        </>
    )
}

export default Navbar;

