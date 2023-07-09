import React, { useContext, useState } from "react"
import { getUserData } from "../utils/auth/Auth"
import { useNavigate } from "react-router-dom"
import donwArrow from "../assets/images/downArrow.png"
import { tableContext } from "../contexts/Context"
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const userData = getUserData();
  const [logoutBtn, setLogoutBtn] = useState(false);
  const { isAdmin } = useContext(tableContext);
  let name
  // if (userData) {
  //   name = userData.email.split('@');
  // }


  const logout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('accessToken');
    toast.success("Logout sucessful");
    navigate('/');
  };

  return (
    <>
      <nav>
        <div className="left-menu">
          <h3>Task Management System</h3>
        </div>
        {userData &&
          <div className="menu-items">

            <div >{isAdmin ? "Admin" : "User"}</div>
            {userData && (
              <div onClick={() => setLogoutBtn(!logoutBtn)}>
                {"user"} <img src={donwArrow} alt="Down Arrow" />
                {logoutBtn && <div onClick={logout}>Logout</div>}
              </div>
            )}
          </div>
        }
      </nav>
    </>
  );
}

export default Navbar