import React from "react";
import { FaStar } from "react-icons/fa";

export default function RatingStars() {
  return (
    <div className="flex gap-1">
      <FaStar className="text-yellow-300" />
      <FaStar className="text-yellow-300" />
      <FaStar className="text-yellow-300" />
      <FaStar />
      <FaStar />
    </div>
  );
}


