import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const fallbackCoords = [34.0259, -118.7798];
const markerIcon = L.divIcon({
  className: "field-marker-wrap",
  html: '<span class="field-marker"><i></i></span>',
  iconSize: [30, 38],
  iconAnchor: [15, 34]
});

const MapCenter = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(coords, 12, { duration: 1.1 });
  }, [coords, map]);

  return null;
};

const MapView = ({ address, name, coordinates }) => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setCoords(null);
    setError("");

    if (coordinates?.length === 2 && coordinates.every(Number.isFinite)) {
      setCoords(coordinates);
      return () => controller.abort();
    }

    const fetchCoords = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Geocoding request failed");
        const data = await res.json();
        if (data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setError("Address not found.");
        }
      } catch (err) {
        if (err.name !== "AbortError") setError("Map coordinates could not be loaded.");
      }
    };

    fetchCoords();
    return () => controller.abort();
  }, [address, coordinates]);

  return (
    <>
      <MapContainer center={coords || fallbackCoords} zoom={12} scrollWheelZoom className="atlas-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coords && <MapCenter coords={coords} />}
        {coords && <Marker position={coords} icon={markerIcon}><Popup>{name}<br />{address}</Popup></Marker>}
      </MapContainer>
      {!coords && <div className="mapStatus">{error || "ACQUIRING COORDINATE"}<span>{error ? "CHECK CONNECTION" : "CONNECTING TO FIELD ATLAS"}</span></div>}
    </>
  );
};

export default MapView;
