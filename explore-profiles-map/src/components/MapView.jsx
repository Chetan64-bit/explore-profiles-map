import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ address }) => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setError("Address not found.");
        }
      } catch (err) {
        setError("Map loading failed.");
      }
    };

    fetchCoords();
  }, [address]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!coords) return <p>Loading map...</p>;

  return (
    <MapContainer center={coords} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coords}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
