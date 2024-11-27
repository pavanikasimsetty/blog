import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import HomeRight from "../components/HomeRight";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Feed from "../components/Feed";
import Reels from "../components/Reels";
import CreateReelsForm from "../components/CreateReelsForm";
import Profile from "./Profile";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../state/Auth/authActions";

/*<Route path="/home/reels" element={<Reels />} />
<Route path="/home/create-reels" element={<CreateReelsForm />} />*/
function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("Current pathname:", location.pathname);

  useEffect(() => {
    dispatch(getUserProfile(localStorage.getItem("token")));
  }, []);

  return (
    <div className="px-20"
    // style={{
    //   backgroundColor: "#F5F5F5", // Change this to your desired background color
    //   minHeight: "100vh", // Ensures the background covers the entire feed area
    // }}
    >
      
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          lg={location.pathname.startsWith("/home/profile") ? 9 : 6}
          className="px-5 flex justify-center" // Center content takes full width on smaller screens
          
        >
          {/* <Outlet /> */}
          <Routes>
            <Route index path="/home" element={<Feed />} />
            <Route path="/home/feed" element={<Feed />} />
            <Route path="/home/profile/:id" element={<Profile />} />
          </Routes>
        </Grid>

        {!location.pathname.startsWith("/home/profile") && (
          <Grid item xs={12} lg={3}>
            <div>
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default HomePage;
