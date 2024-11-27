import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Button, Card } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import ProfileModal from "../components/ProfileModal";
import CameraAltIcon from "@mui/icons-material/CameraAlt";  // Importing Camera Icon

const tabs = [
  { value: "post", name: "Posts" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];

const saved = [1, 2, 3, 4, 5];

function Profile() {
  const posts = useSelector((state) => state.post.posts);
  const { id } = useParams();
  console.log(id);

  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState("post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = useSelector((state) => state.auth.user);

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedBackground = localStorage.getItem("backgroundImage");
    const savedProfile = localStorage.getItem("profileImage");

    if (savedBackground) {
      setBackgroundImage(savedBackground);
    }
    if (savedProfile) {
      setProfileImage(savedProfile);
    }
  }, []);

  // State for images
  const [backgroundImage, setBackgroundImage] = useState(
    "https://plus.unsplash.com/premium_photo-1669359806362-6bd0218a4fd2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [profileImage, setProfileImage] = useState(
    ""
  );

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        setBackgroundImage(newImage);
        localStorage.setItem("backgroundImage", newImage); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        setProfileImage(newImage);
        localStorage.setItem("profileImage", newImage); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="my-10 w-[100%]">
      <div className="rounded-md">
        {/* Background Image with Camera Icon */}
        <div className="h-[15rem] relative">
          <img
            className="w-full h-full object-cover rounded-t-md"
            src={backgroundImage} // Using the state here
            alt="background"
          />
          <label
            htmlFor="background-upload"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: "2",
              cursor: "pointer",
            }}
          >
            <CameraAltIcon
              style={{
                fontSize: "3rem",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                borderRadius: "50%",
                padding: "10px",
              }}
            />
          </label>
          <input
            type="file"
            id="background-upload"
            accept="image/*"
            onChange={handleBackgroundImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Profile Image with Camera Icon */}
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <div className="relative">
            <Avatar
              className="transform -translate-y-24"
              sx={{ width: "10rem", height: "10rem" }}
              src={profileImage} // Using the state here
            />
            <label
              htmlFor="profile-upload"
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                zIndex: "2",
                cursor: "pointer",
              }}
            >
              <CameraAltIcon
                style={{
                  fontSize: "3rem",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
            </label>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
            />
          </div>

          {true ? (
            <Button variant="outlined" sx={{ borderRadius: "20px" }} onClick={handleOpenProfileModal}>
              Edit Profile
            </Button>
          ) : (
            <Button variant="outlined" sx={{ borderRadius: "20px" }}>
              Follow
            </Button>
          )}
        </div>

        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {user.fname + " " + user.lname}
            </h1>
            {/* <p>@{user.fname.toLowerCase() + "_" + user.lname.toLowerCase()}</p> */}
          </div>

          <div>
            {/* <p>This is {user.fname}</p> */}
          </div>
        </div>

        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
              {tabs.map((tab) => (
                <Tab value={tab.value} label={tab.name} key={tab.name} wrapped />
              ))}
            </Tabs>
          </Box>

          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {posts.map((post, index) => (
                  <div className="border border-slate-100 rounded-md" key={index}>
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {saved.map((save, index) => (
                  <div className="border border-slate-100 rounded-md" key={index}>
                    <PostCard />
                  </div>
                ))}
              </div>
            ) : (
              <div>repost</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal 
          open={open} 
          handleClose={handleClose} 
          profileImage={profileImage} // Pass the updated profile image
          backgroundImage={backgroundImage} // Pass the updated background image
        />
      </section>
    </Card>
  );
}

export default Profile;
