import {Link,useLocation} from 'react-router'
import { FaRegCalendarAlt,FaCalendarAlt } from "react-icons/fa";
import { IoSchoolOutline,IoSchool,IoMenu, IoMapOutline,IoMap, IoHome} from "react-icons/io5";

export const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path ? true : false;

  return (
    <div id='sidebar'>
      <div id='menu'>
        <button>
          <IoMenu />
        </button>
      </div>
      <div id='dashboard'>
        <Link to="/DashBoard">
          <button>
            ({isActive("/DashBoard")} ? 
              <FaCalendarAlt />
            ):(
              <FaRegCalendarAlt />
            )
          </button>
        </Link>
      </div>
      <div id='school'>
        <Link to="/PersonalActivity">
          <button>
            ({isActive("PersonalActivity")} ? 
              <IoSchool />
            ):(
              <IoSchoolOutline />
            )
          </button>
        </Link>
      </div>
      <div id='dashboard'>
        <Link to="SchoolActivity">
          <button>
            ({isActive("SchoolActivity")} ? 
              <IoMap />
            ):(
              <IoMapOutline />
            )
          </button>
        </Link>
      </div>
      <div id='bottom-part'>
        <Link to="/">
          <button>
            <IoHome/>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;
