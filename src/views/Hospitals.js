import React, { useState, useEffect, useContext } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import { store } from "../store/contexts/store";

const Hospitals = () => {
  const { hospitals, hospitalsLoaded, loadHospitals } = useContext(store);
  const [position, setPosition] = useState({
    lat: 27.700769,
    lng: 85.30014,
    zoom: 10,
  });

  useEffect(() => {
    loadHospitals();
  }, [loadHospitals]);

  return (
    <Map center={[position.lat, position.lng]} zoom={position.zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hospitalsLoaded &&
        hospitals.length > 0 &&
        hospitals.map((hosp) => (
          <Marker key={hosp._id} position={[...hosp.location.coordinates]}>
            <Popup>{hosp.name}</Popup>
          </Marker>
        ))}
    </Map>
  );
};

export default Hospitals;
