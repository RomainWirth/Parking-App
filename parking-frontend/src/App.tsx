import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Place,
  fetchPlaces,
  occupyPlace,
  vacatePlace,
  selectPlaces,
  selectLoading,
} from './redux/placeSlice';
import { RootState } from './redux/store';
import { unwrapResult, ThunkDispatch } from '@reduxjs/toolkit';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const places = useSelector(selectPlaces);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchPlaces() as any);
  }, [dispatch]);

  const handlePlaceClick = async (place: Place) => {
    const updatedPlace = { ...place, occupied: !place.occupied };
    const resultAction = await dispatch(occupyPlace(updatedPlace.id) as any);
    if (resultAction.payload) {
      const updatedData = unwrapResult(resultAction);
      console.log('Place updated:', updatedData);
    }
  };

  return (
    <div>
      <h1>Parking Management App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button>Add Parking Place</button>
          <div>
            {places.map((place) => (
              <div
                key={place.id}
                onClick={() => handlePlaceClick(place)}
                style={{ backgroundColor: place.occupied ? 'red' : 'green' }}
              >
                Place {place.id}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
