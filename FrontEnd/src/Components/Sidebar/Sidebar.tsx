import {Link} from 'react-router'
import { FaRegCalendarAlt,FaCalendarAlt } from "react-icons/fa";
import { IoSchoolOutline,IoSchool,IoMenu } from "react-icons/io5";
import { IoMapOutline,IoMap } from "react-icons/io5";
import { useEffect, useState } from 'react';


export const Sidebar = () => {
  const[iconSelect,setIconSelect] = useState<string>()
  useEffect(() => {

  },[setIconSelect])

  return (
    <div id='sidebar'>
      <div id='menu'>
        <button>
          <IoMenu />
        </button>
      </div>
      <div id='dashboard'>
        <Link to="/DashBoard">
          <button onClick={() => setIconSelect("dashboard")}>
            ({iconSelect === "dashboard"} ? 
              <FaCalendarAlt />
            ):(
              <FaRegCalendarAlt />
            )
          </button>
        </Link>
      </div>
      <div id='school'>
        <Link to="/PersonalActivity">
          <button onClick={() => setIconSelect("school")}>
            ({iconSelect === "school"} ? 
              <IoSchool />
            ):(
              <IoSchoolOutline />
            )
          </button>
        </Link>
      </div>
      <div id='dashboard'>
        <Link to="SchoolActivity">
          <button onClick={() => setIconSelect("dashboard")}>
            ({iconSelect === "dashboard"} ? 
              <IoMap />
            ):(
              <IoMapOutline />
            )
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;
