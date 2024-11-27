import React, { useEffect, useState } from 'react'; // Properly import useState and useEffect
import { Avatar, Card, IconButton } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from './StoryCircle';
import PostCard from './PostCard';
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import CreatePostModal from './CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from "../state/Post/post.action";

function Feed() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function handleOpenCreatePostModel() {
    setOpen(true);
  }

  const comments = useSelector((state) => state.post.comments);
  const handleCloseCreatePostModel = () => setOpen(false);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [comments, dispatch]); // Add dispatch to the dependency array

  const posts = useSelector((state) => state.post.posts);

  const auth = useSelector((state) => state.auth);
  const userFirstName = auth.user?.fName || ''; // Default to "U" if no first name available
  const userInitial = userFirstName.charAt(0).toUpperCase();

  return (
    <div className="px-8 mx-auto max-w-full md:max-w-6xl">
      
      <Card className="p-5 mt-5">
        <div className="flex justify-between items-center">
          <Avatar>{userInitial}</Avatar>
          <input
            readOnly
            onClick={handleOpenCreatePostModel}
            className="ml-5 h-10 outline-none w-full bg-slate-300 rounded-full px-5 bg-transparent border border-[#133466] cursor-text"
            type="text"
            placeholder="What's on your mind today???"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ArticleIcon />
            </IconButton>
            <span>Article</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ImageIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
        </div>
      </Card>

      <div className="mt-5 space-y-5">
        {posts.map((post, index) => <PostCard key={index} post={post} />)}
      </div>

      <div>
        <CreatePostModal open={open} handleClose={handleCloseCreatePostModel} />
      </div>
    </div>
  );
}

export default Feed;


// // import { useEffect, useState } from 'react';
// import { Avatar, Card, IconButton } from '@mui/material';
// import AddIcon from "@mui/icons-material/Add";
// import StoryCircle from './StoryCircle';
// import PostCard from './PostCard';
// import ImageIcon from "@mui/icons-material/Image";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import ArticleIcon from "@mui/icons-material/Article";
// import CreatePostModal from './CreatePostModal';
// import { useDispatch } from 'react-redux';
// import { getAllPosts } from "../state/Post/post.action";
// import { useSelector } from 'react-redux';

// function Feed() {
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

//   function handleOpenCreatePostModel() {
//     setOpen(true);
//   }

//   const comments = useSelector((state) => state.post.comments);
//   const handleCloseCreatePostModel = () => setOpen(false);

//   useEffect(() => {
//     dispatch(getAllPosts());
//   }, [comments]);

//   const posts = useSelector((state) => state.post.posts);

//   // Get user information from state (adjust according to your state structure)
//   const auth = useSelector((state) => state.auth);
//   const userFirstName = auth.user?.fName || 'u'; // Default to "U" if no first name available
//   const userInitial = userFirstName.charAt(0).toUpperCase(); // Get the first letter and convert it to uppercase

//   return (
//     <div className="px-8 mx-auto max-w-full md:max-w-6xl"> {/* More flexible for small screens */}
//       <Card className="p-5 mt-5">
//         <div className="flex justify-between items-center">
//           <Avatar>{userInitial}</Avatar> {/* Display the first letter in the Avatar */}
//           <input
//             readOnly
//             onClick={handleOpenCreatePostModel}
//             className="ml-5 h-10 outline-none w-full bg-slate-300 rounded-full px-5 bg-transparent border border-[#babdc9] cursor-text"
//             type="text"
//             placeholder="What's on your mind today???"
//           />
//         </div>
//         <div className="flex justify-center space-x-9 mt-5">
//           <div className="flex items-center">
//             <IconButton color="primary" onClick={handleOpenCreatePostModel}>
//               <ArticleIcon />
//             </IconButton>
//             <span>Article</span>
//           </div>
//           <div className="flex items-center">
//             <IconButton color="primary" onClick={handleOpenCreatePostModel}>
//               <ImageIcon />
//             </IconButton>
//             <span>Media</span>
//           </div>
//           <div className="flex items-center">
//             <IconButton color="primary" onClick={handleOpenCreatePostModel}>
//               <VideocamIcon />
//             </IconButton>
//             <span>Video</span>
//           </div>
//         </div>
//       </Card>

//       <div className="mt-5 space-y-5">
//         {posts.map((post, index) => <PostCard key={index} post={post} />)}
//       </div>

//       <div>
//         <CreatePostModal open={open} handleClose={handleCloseCreatePostModel} />
//       </div>
//     </div>
//   );
// }

// export default Feed;