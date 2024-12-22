import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Optional

const StarRating = ({ rating, totalStars = 5 }) => {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} color="#FFD700" />); // Filled star
    } else if (i - rating < 1) {
      stars.push(<FaStarHalfAlt key={i} color="#FFD700" />); // Half-filled star
    } else {
      stars.push(<FaRegStar key={i} color="#FFD700" />); // Empty star
    }
  }

  return <h5 style={{ display: "flex", gap: "4px" }}>{stars}</h5>;
};

export default StarRating;
