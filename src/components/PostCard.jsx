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
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
} from "@mui/material/colors";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";

function PostCard({ post, profileImage }) { // Accept profileImage as a prop
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const handleLikePost = () => setIsLiked(!isLiked);
  const handleBookmarkPost = () => setIsBookmarked(!isBookmarked);

  const handleAddComment = () => {
    if (commentInput.trim()) {
      const newComment = {
        id: Date.now(),
        user: { fname: "Current", lname: "User", profilePhoto: profileImage }, // Use profileImage
        content: commentInput.trim(),
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={
          profileImage ? ( // Use profileImage if available
            <Avatar src={profileImage} alt="User Profile Photo" />
          ) : (
            <Avatar sx={{ bgcolor: red[500] }}>
              {post.user?.fname?.[0]?.toUpperCase() || "?"}
            </Avatar>
          )
        }
        title={`${post.user?.fname || "Unknown"} ${post.user?.lname || ""}`}
        subheader={`@${post.user?.fname?.toLowerCase() || "user"}_${
          post.user?.lname?.toLowerCase() || "name"
        }`}
      />
      {post.image && (
        <CardMedia component="img" height="140" image={post.image} alt="Post" />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption?.trim() || "No content available."}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleLikePost}>
          {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton onClick={() => setShowComments(!showComments)}>
          <ChatBubbleIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
        <IconButton onClick={handleBookmarkPost}>
          {isBookmarked ? <BookmarksIcon /> : <BookmarksOutlinedIcon />}
        </IconButton>
      </CardActions>
      {showComments && (
        <section>
          <Divider />
          <div className="flex items-center mx-3 my-5">
            <Avatar src={profileImage || ""} />
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a comment..."
              className="w-full outline-none border px-3 py-1 rounded-full"
            />
            <IconButton onClick={handleAddComment}>
              <SendIcon />
            </IconButton>
          </div>
          <Divider />
          <div className="mx-3 my-5 space-y-2">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="flex items-center space-x-3 my-3">
                  <Avatar src={comment.user.profilePhoto || ""}>
                    {!comment.user.profilePhoto &&
                      (comment.user?.fname?.[0]?.toUpperCase() || "?")}
                  </Avatar>
                  <Typography>{comment.content}</Typography>
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
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      fname: PropTypes.string.isRequired,
      lname: PropTypes.string.isRequired,
    }).isRequired,
    caption: PropTypes.string,
    image: PropTypes.string,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        user: PropTypes.shape({
          fname: PropTypes.string.isRequired,
          lname: PropTypes.string.isRequired,
          profilePhoto: PropTypes.string,
        }).isRequired,
      })
    ),
  }).isRequired,
  profileImage: PropTypes.string, // Add profileImage as a prop
};

export default PostCard;
