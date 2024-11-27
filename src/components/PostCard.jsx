// import React, { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   Avatar,
//   CardMedia,
//   CardContent,
//   Typography,
//   CardActions,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import { red } from "@mui/material/colors";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import BookmarksIcon from "@mui/icons-material/Bookmarks";
// import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
// import PropTypes from "prop-types";
// import { useDispatch, useSelector } from "react-redux";
// import { createComment, likePost } from "../state/Post/post.action";

// function PostCard({ post }) {
//   const currentUserId = useSelector((state) => state.auth.user.id);
//   const [showComments, setShowComments] = useState(false);
//   const [isLiked, setIsLiked] = useState(post.likedBy.some((user) => user.id === currentUserId));
//   const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false); // Assume `isBookmarked` comes from post
//   const [commentInput, setCommentInput] = useState("");

//   const dispatch = useDispatch();

//   const handleCreateComment = (caption) => {
//     const reqData = {
//       postId: post.id,
//       data: { caption },
//     };
//     dispatch(createComment(reqData))
//       .then(() => {
//         setCommentInput(""); // Clear the input after successful submission
//       })
//       .catch((error) => console.error("Error creating comment", error)); // Handle comment error
//   };

//   const handleLikePost = () => {
//     dispatch(likePost(post.id))
//       .then(() => setIsLiked((prev) => !prev))
//       .catch((error) => console.error("Error liking post", error));
//   };

//   const handleCommentKeyDown = (e) => {
//     if (e.key === "Enter" && commentInput.trim()) {
//       e.preventDefault(); // Prevent default behavior
//       handleCreateComment(commentInput);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader
//         avatar={<Avatar sx={{ bgcolor: red[500] }}>{post.user.fname ? post.user.fname[0] : '?'}</Avatar>}
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={`${post.user.fname} ${post.user.lname}`}
//         subheader={`@${post.user.fname?.toLowerCase() || 'user'}_${post.user.lname?.toLowerCase() || 'name'}`}
//       />

//       <CardContent>
//         {post.caption?.trim() ? (
//           <Typography variant="body2" color="text.secondary">
//             {post.caption}
//           </Typography>
//         ) : (
//           <Typography variant="body2" color="text.secondary" align="center">
//             No content available.
//           </Typography>
//         )}
//       </CardContent>

//       {post.image ? (
//         <CardMedia component="img" height="100" image={post.image} alt="Post image" />
//       ) : (
//         <Typography variant="body2" color="text.secondary" align="center" sx={{ padding: 2 }}>
          
//         </Typography>
//       )}

      
//       <CardActions className="flex justify-between" disableSpacing>
//         <div>
//           <IconButton onClick={handleLikePost} aria-label="like post">
//             {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
//           </IconButton>

//           <IconButton onClick={() => setShowComments((prev) => !prev)} aria-label="toggle comments">
//             <ChatBubbleIcon />
//           </IconButton>

//           <IconButton aria-label="share post">
//             <ShareIcon />
//           </IconButton>
//         </div>

//         <IconButton onClick={() => setIsBookmarked((prev) => !prev)} aria-label="bookmark post">
//           {isBookmarked ? <BookmarksIcon /> : <BookmarksOutlinedIcon />}
//         </IconButton>
//       </CardActions>

//       {showComments && (
//         <section>
//           <div className="flex items-center space-x-5 mx-3 my-5">
//             <Avatar />
//             <input
//               value={commentInput}
//               onChange={(e) => setCommentInput(e.target.value)}
//               onKeyDown={handleCommentKeyDown}
//               type="text"
//               className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
//               placeholder="Write a comment..."
//             />
//           </div>
//           <Divider />
//           <div className="mx-3 my-5 space-y-2 text-xs">
//             {Array.isArray(post.comments) ? (
//               post.comments.map((comment, index) => (
//                 <div key={index} className="flex items-center space-x-5">
//                   <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}>
//                     {comment.user.fname ? comment.user.fname[0] : '?'}{comment.user.lname ? comment.user.lname[0] : '?'}
//                   </Avatar>
//                   <Typography variant="body2">{comment.content}</Typography>
//                 </div>
//               ))
//             ) : (
//               <Typography variant="body2" color="text.secondary" align="center">
//                 No comments available.
//               </Typography>
//             )}
//           </div>
//         </section>
//       )}
//     </Card>
//   );
// }

// PostCard.propTypes = {
//   post: PropTypes.object.isRequired,
// };

// export default PostCard;

// import React, { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   Avatar,
//   CardMedia,
//   CardContent,
//   Typography,
//   CardActions,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import { red } from "@mui/material/colors";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import BookmarksIcon from "@mui/icons-material/Bookmarks";
// import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
// import SendIcon from "@mui/icons-material/Send"; // Import the send icon
// import PropTypes from "prop-types";
// import { useDispatch, useSelector } from "react-redux";
// import { createComment, likePost } from "../state/Post/post.action";

// function PostCard({ post, updatePostComments }) {
//   const currentUserId = useSelector((state) => state.auth.user.id);
//   const [showComments, setShowComments] = useState(false);
//   const [isLiked, setIsLiked] = useState(post.likedBy.some((user) => user.id === currentUserId));
//   const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
//   const [commentInput, setCommentInput] = useState("");

//   const dispatch = useDispatch();

//   const handleCreateComment = (caption) => {
//     const reqData = {
//       postId: post.id,
//       data: { caption },
//     };
//     dispatch(createComment(reqData))
//       .then((newComment) => {
//         updatePostComments(post.id, newComment); // Update the comments in parent component
//         setCommentInput(""); // Clear the input after successful submission
//       })
//       .catch((error) => console.error("Error creating comment", error)); // Handle comment error
//   };

//   const handleLikePost = () => {
//     dispatch(likePost(post.id))
//       .then(() => setIsLiked((prev) => !prev))
//       .catch((error) => console.error("Error liking post", error));
//   };

//   const handleCommentKeyDown = (e) => {
//     if (e.key === "Enter" && commentInput.trim()) {
//       e.preventDefault();
//       handleCreateComment(commentInput);
//     }
//   };

//   const handleSendComment = () => {
//     if (commentInput.trim()) {
//       handleCreateComment(commentInput);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader
//         avatar={<Avatar sx={{ bgcolor: red[500] }}>{post.user.fname ? post.user.fname[0] : '?'}</Avatar>}
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={`${post.user.fname} ${post.user.lname}`}
//         subheader={`@${post.user.fname?.toLowerCase() || 'user'}_${post.user.lname?.toLowerCase() || 'name'}`}
//       />

//       <CardContent>
//         {post.caption?.trim() ? (
//           <Typography variant="body2" color="text.secondary">
//             {post.caption}
//           </Typography>
//         ) : (
//           <Typography variant="body2" color="text.secondary" align="center">
//             No content available.
//           </Typography>
//         )}
//       </CardContent>

//       {post.image ? (
//         <CardMedia component="img" height="100" image={post.image} alt="Post image" />
//       ) : (
//         <Typography variant="body2" color="text.secondary" align="center" sx={{ padding: 2 }} />
//       )}

//       <CardActions className="flex justify-between" disableSpacing>
//         <div>
//           <IconButton onClick={handleLikePost} aria-label="like post">
//             {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
//           </IconButton>

//           <IconButton onClick={() => setShowComments((prev) => !prev)} aria-label="toggle comments">
//             <ChatBubbleIcon />
//           </IconButton>

//           <IconButton aria-label="share post">
//             <ShareIcon />
//           </IconButton>
//         </div>

//         <IconButton onClick={() => setIsBookmarked((prev) => !prev)} aria-label="bookmark post">
//           {isBookmarked ? <BookmarksIcon /> : <BookmarksOutlinedIcon />}
//         </IconButton>
//       </CardActions>

//       {showComments && (
//         <section>
//           <div className="flex items-center space-x-5 mx-3 my-5">
//             <Avatar />
//             <input
//               value={commentInput}
//               onChange={(e) => setCommentInput(e.target.value)}
//               onKeyDown={handleCommentKeyDown}
//               type="text"
//               className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
//               placeholder="Write a comment..."
//             />
//             <IconButton onClick={handleSendComment} aria-label="send comment">
//               <SendIcon />
//             </IconButton>
//           </div>
//           <Divider />
//           <div className="mx-3 my-5 space-y-2 text-xs">
//             {Array.isArray(post.comments) && post.comments.length > 0 ? (
//               post.comments.map((comment, index) => (
//                 <div key={index} className="flex items-center space-x-5">
//                   <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}>
//                     {comment.user.fname ? comment.user.fname[0] : '?'}{comment.user.lname ? comment.user.lname[0] : '?'}
//                   </Avatar>
//                   <Typography variant="body2">{comment.content}</Typography>
//                 </div>
//               ))
//             ) : (
//               <Typography variant="body2" color="text.secondary" align="center">
//                 No comments available.
//               </Typography>
//             )}
//           </div>
//         </section>
//       )}
//     </Card>
//   );
// }

// PostCard.propTypes = {
//   post: PropTypes.object.isRequired,
//   updatePostComments: PropTypes.func.isRequired, // Function to update comments in the parent component
// };

// export default PostCard;



import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Divider,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createComment, likePost } from "../state/Post/post.action";

function PostCard({ post, updatePostComments }) {
  const currentUserId = useSelector((state) => state.auth.user.id);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likedBy.some((user) => user.id === currentUserId));
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [commentInput, setCommentInput] = useState("");

  const dispatch = useDispatch();

  const handleCreateComment = (caption) => {
    const reqData = {
      postId: post.id,
      data: { caption },
    };
    console.log("Submitting comment:", reqData);
    dispatch(createComment(reqData))
      .then((newComment) => {
        console.log("Comment created:", newComment);
        if (updatePostComments) {
          updatePostComments(post.id, newComment);
        }
        setCommentInput("");
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  const handleCommentKeyDown = (e) => {
    if (e.key === "Enter" && commentInput.trim()) {
      e.preventDefault();
      handleCreateComment(commentInput);
    }
  };

  const handleSendComment = () => {
    if (commentInput.trim()) {
      handleCreateComment(commentInput);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{post.user.fname ? post.user.fname[0] : '?'}</Avatar>}
        action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
        title={`${post.user.fname} ${post.user.lname}`}
        subheader={`@${post.user.fname?.toLowerCase() || "user"}_${post.user.lname?.toLowerCase() || "name"}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption?.trim() || "No content available."}
        </Typography>
      </CardContent>
      {post.image && <CardMedia component="img" height="100" image={post.image} alt="Post image" />}
      <CardActions disableSpacing>
        <div>
          <IconButton onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={() => setShowComments(!showComments)}>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </div>
        <IconButton onClick={() => setIsBookmarked(!isBookmarked)}>
          {isBookmarked ? <BookmarksIcon /> : <BookmarksOutlinedIcon />}
        </IconButton>
      </CardActions>
      {showComments && (
        <section>
          <div className="flex items-center mx-3 my-5">
            <Avatar />
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={handleCommentKeyDown}
              placeholder="Write a comment..."
              className="w-full outline-none border px-3 py-1 rounded-full"
            />
            <IconButton onClick={handleSendComment}>
              <SendIcon />
            </IconButton>
          </div>
          <Divider />
          <div>
            {Array.isArray(post.comments) && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="flex items-center space-x-3 my-3">
                  <Avatar>{comment.user?.fname?.[0] || "?"}</Avatar>
                  <Typography>{comment.caption}</Typography>
                </div>
              ))
            ) : (
              <Typography>No comments yet.</Typography>
            )}
          </div>
        </section>
      )}
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  updatePostComments: PropTypes.func.isRequired,
};

export default PostCard;
