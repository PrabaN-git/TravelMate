import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  return (
    <div className="place-card">
      <img src={place.imageUrl} alt={place.name} />
      <h3>{place.name}</h3>
      <p>{place.location}</p>
      <p>Rating: {place.rating}</p>
      <Link to={`/places/${place._id}`} className="btn">View Details</Link>
    </div>
  );
}
export default PlaceCard;
