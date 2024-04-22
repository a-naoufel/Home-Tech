// 
 import React from "react";
 import { FaStar, FaStarHalf } from "react-icons/fa";

export default function RatingStars({ rating }) {
  const renderStars = () => {
    const stars = [];
    const totalStars = 5; // Total number of stars
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest half star
    const fullStars = Math.floor(roundedRating); // Number of full stars
    const hasHalfStar = roundedRating % 1 !== 0; // Check if there's a half star

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-300" />);
    }

    // Render half star if applicable
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="text-yellow-300" />);
    }

    // Fill remaining stars with empty stars
    const remainingStars = totalStars - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} />);
    }

    return stars;
  };

  return <div className="flex gap-1">{renderStars()}</div>;
}
