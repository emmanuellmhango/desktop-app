import React from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function ClaimMapDisplay() {
  const { selectedClaim } = useSelector((state) => state.selectedClaim);

  return selectedClaim.length > 0 ? (
    <div className="testMapDisplay">
      <MapContainer
        center={[selectedClaim[0], selectedClaim[1]]}
        zoom={16}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[selectedClaim[0], selectedClaim[1]]}>
          <Popup>{selectedClaim[2]}</Popup>
        </Marker>
      </MapContainer>
    </div>
  ) : (
    <div className="mapLoading">Map Loading...</div>
  );
}

export default ClaimMapDisplay;
