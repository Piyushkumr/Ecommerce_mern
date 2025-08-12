import React, { useState } from 'react';
import profilePng from '../../images/Profile.png'; // or your image path
import { Rating } from '@mui/material';

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const maxChars = 150; // Limit before showing "Read More"

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const isLong = review.comment.length > maxChars;

  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      {/* <ReactStars value={review.rating} edit={false} size={24} color2="#ffd700" /> */}
      <Rating {...options} />
      
      <span className="reviewCardComment">
        {isLong && !expanded
          ? `${review.comment.substring(0, maxChars)}...`
          : review.comment}
        
        {isLong && (
          <button className="readMoreBtn" onClick={toggleExpand}>
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </span>
    </div>
  );
};

export default ReviewCard;
