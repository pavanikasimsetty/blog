/* eslint-disable no-unused-vars */
import { Grid, Card } from "@mui/material";
import React from 'react';
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Authentication() {

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh', // Full height of the viewport
        backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY7i2HjYbWtYQBOWsjloD0PAOD9yHRUmsZVAsz4VKMEaPTvaaS515vV3G48QQpFSqS0gM&usqp=CAU")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Keeps the background fixed while scrolling
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent dark overlay
        }}
      ></div>

      <Grid container
        className="h-full"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ maxWidth: '80%', margin: 'auto' }}
      >
        <Grid item xs={12} md={7}>
          <img
            style={{
              width: '90%',  // Increased width of the image
              maxHeight: '90%', // Increased max height of the image
              objectFit: 'contain',
              marginTop: '20px',
            }}
            //src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPDJKa2bZtTe0MQdpO3yRbuuF1hM1JcNUbIw&s"
            src="https://media.licdn.com/dms/image/C5612AQFmUcAa9_NgCw/article-cover_image-shrink_600_2000/0/1520211954544?e=2147483647&v=beta&t=JX6pEOC98S9y2LRMyibaZEL1qckbPecIh6uUbRj-abI"
            alt="social"
          />
        </Grid>

        <Grid item xs={12} md={5} className="flex justify-start justify-center items-center h-full pl-4">
          <div className="px-20 flex flex-col justify-center h-full">
            <Card className="card p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', width: '400px' }}> {/* Increased width of the card */}
              <div className="flex flex-col items-center mb-5 space-y-1">
                <h1 className="logo text-center text-pretty text-4xl font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                BlogSphere
                </h1>
                <p 
                  className="text-center text-pretty w-[70%]" 
                  style={{
                    fontFamily: "'Roboto', sans-serif", 
                    textAlign: 'center', // Horizontal center
                    marginTop: '20px', // Adds some spacing on top
                    display: 'flex',
                    justifyContent: 'center', // Center vertically within the container
                    alignItems: 'center',
                    flexDirection: 'column', // Stack the text vertically
                  }}
                >
                  <p>Connecting Lives Sharing Stories</p>
                  
                </p>
              </div>

              {/* <Outlet /> */}
              <Routes>
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Authentication;
