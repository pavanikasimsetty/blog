

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { logoutUser } from "c:/Users/hp/Desktop/SEMO/HCI - DUMP/Java_Springboot_Social_Media-main/Java_Springboot_Social_Media-main/client/src/state/Auth/authActions"; // Import the logout thunk
import { navigationMenu } from "./SidebarNav"; // Adjust the import path as needed

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({ fname: "", lname: "" }); // User state
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // Dispatch the logout thunk
      localStorage.removeItem("user"); // Clear additional user info
      handleClose();

      // Redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 300);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      {/* Top Section */}
      <div className="space-y-8 pl-5">
        
        <div>
          <span className="logo font-bold text-pretty text-4xl">BlogSphere</span>
        </div>

        {/* Dynamic Navigation Menu */}
        <div className="space-y-4">
          {navigationMenu.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 cursor-pointer hover:text-primary"
              onClick={() => handleNavigation(item.path)}
            >
              <div className="text-lg">{item.icon}</div>
              <div className="text-md font-medium">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      {/* <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar
              src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=826&t=st=1711805221~exp=1711805821~hmac=8000422d501b4b12b39e9fcfc545165eb3c23276533c4ab4637b81ec9b88386c"
              alt="User Avatar"
            />
            <div>
              {/* Dynamic User Information */}
              {/* <p className="font-bold text-xl">{user.fname || "Guest"}</p>
              <p className="opacity-70">{user.lmail || "guest@example.com"}</p>
            </div>
          </div> */}

          {/* <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon focusable="false" aria-hidden="true" />
          </Button> */}
          {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu> */}
        {/* </div> */}
       {/* </div>  */}

       {/* Bottom Section */}
       <div>
  <Divider />
  <div className="flex flex-col items-center pt-5 space-y-4">
    
    {/* <Avatar
      src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=826&t=st=1711805221~exp=1711805821~hmac=8000422d501b4b12b39e9fcfc545165eb3c23276533c4ab4637b81ec9b88386c"
      alt="User Avatar"
      className="w-20 h-20" // Optional size customization
    /> */}

    {/* Logout Button */}
    <Button
      variant="contained"
      onClick={handleLogout}
      className="logout-button"
    >
      Logout
    </Button>
  </div>
</div>

{/* Additional CSS */}
<style jsx>
  {`
    .logout-button {
      background-color: #4169E1; /* Unique dark purple shade */
      color: #fff; /* White text for contrast */
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      border-radius: 8px; /* Slight rounding for modern look */
      text-transform: none; /* Prevent uppercase transformation */
    }
    .logout-button:hover {
      background-color: #5A7DFF; /* Slightly lighter purple on hover */
    }
  `}
</style>



    </Card>
  );
}

export default Sidebar;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Divider from "@mui/material/Divider";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Card from "@mui/material/Card";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { navigationMenu } from "./SidebarNav"; // Adjust the import path as needed

// function Sidebar() {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [user, setUser] = useState({ name: "", email: "" }); // User state
//   const open = Boolean(anchorEl);

//   useEffect(() => {
//     // Retrieve user data from local storage
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//     handleClose();

//     // Add a slight delay before navigation
//     setTimeout(() => {
//       navigate("/login");
//     }, 300); // 300ms delay to ensure state has been updated
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     handleClose();
//   };

//   return (
//     <Card className="card h-screen flex flex-col justify-between py-5">
//       {/* Top Section */}
//       <div className="space-y-8 pl-5">
//         <div>
//           <span className="logo font-bold text-pretty text-4xl">BlogSphere</span>
//         </div>

//         {/* Dynamic Navigation Menu */}
//         <div className="space-y-4">
//           {navigationMenu.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center space-x-3 cursor-pointer hover:text-primary"
//               onClick={() => handleNavigation(item.path)}
//             >
//               <div className="text-lg">{item.icon}</div>
//               <div className="text-md font-medium">{item.title}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div>
//         <Divider />
//         <div className="pl-5 flex items-center justify-between pt-5">
//           <div className="flex items-center space-x-3">
//             <Avatar
//               src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=826&t=st=1711805221~exp=1711805821~hmac=8000422d501b4b12b39e9fcfc545165eb3c23276533c4ab4637b81ec9b88386c"
//               alt="User Avatar"
//             />
//             <div>
//               {/* Dynamic User Information */}
//               <p className="font-bold text-xl">{user.name || "Guest"}</p>
//               <p className="opacity-70">{user.email || "guest@example.com"}</p>
//             </div>
//           </div>

//           <Button
//             id="basic-button"
//             aria-controls={open ? "basic-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//             onClick={handleClick}
//           >
//             <MoreVertIcon focusable="false" aria-hidden="true" />
//           </Button>
//           <Menu
//             id="basic-menu"
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             MenuListProps={{
//               "aria-labelledby": "basic-button",
//             }}
//           >
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </div>
//       </div>
//     </Card>
//   );
// }

// export default Sidebar;
