import React from "react";
import SearchUser from "./SearchUser";
import { Card, Typography } from "@mui/material";

function HomeRight() {
  // Array of promotional content (video links or GIFs)
  const ads = [
    {
      id: 1,
      type: "video",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Learn React Today!",
    },
    {
      id: 2,
      type: "gif",
      src: "https://media.giphy.com/media/3o6ZsYm5G7mJdEY3S0/giphy.gif",
      title: "Boost Your Coding Skills!",
    },
  ];

  return (
    <div className="pr-5 space-y-6">
      {/* Search Bar */}
      <SearchUser />

      {/* Ads or Promotional Content */}
      <Card className="p-5">
        <Typography variant="h6" className="font-semibold opacity-70 mb-4">
          Sponsored Ads
          
        </Typography>
        <div className="space-y-4">
          {ads.map((ad) => (
            <div key={ad.id} className="space-y-2">
              <Typography variant="body1" className="font-medium">
                {ad.title}
              </Typography>
              {ad.type === "video" ? (
                <video
                  controls
                  className="w-full rounded-lg shadow"
                  style={{ maxHeight: "150px" }}
                >
                  <source src={ad.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={ad.src}
                  alt={ad.title}
                  className="w-full rounded-lg shadow"
                />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default HomeRight;
