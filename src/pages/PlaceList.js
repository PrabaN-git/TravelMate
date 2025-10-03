import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces } from "../store/placeSlice";
import PlaceCard from "../components/PlaceCard";

function PlaceList() {
  const dispatch = useDispatch();
  const { places, loading } = useSelector(state => state.places);

  useEffect(() => { dispatch(fetchPlaces()); }, [dispatch]);

  return (
    <div className="place-list">
      <h2>Tourist Places</h2>
      {loading ? <p>Loading...</p> :
        <div className="cards">
          {places.map(place => <PlaceCard key={place._id} place={place} />)}
        </div>
      }
    </div>
  );
}
export default PlaceList;
