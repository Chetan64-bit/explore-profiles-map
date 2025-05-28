import { useState, useRef, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import MapView from "../components/MapView";
import SearchFilter from "../components/SearchFilter";
import styles from "./Home.module.css";
import ProfilesData from "../data/profiles.json";

const Home = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("profiles");
    if (stored) {
      try {
        setProfiles(JSON.parse(stored));
      } catch {
        setProfiles([]);
      }
    } else {
      localStorage.setItem("profiles", JSON.stringify(ProfilesData));
      setProfiles(ProfilesData);
    }
  }, []);

  const handleSummaryClick = (address) => {
    setSelectedAddress(address);
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const nameMatch = profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = locationFilter ? profile.address.includes(locationFilter) : true;
    return nameMatch && locationMatch;
  });

  const uniqueLocations = [...new Set(profiles.map((p) => p.address))];

  return (
    <div className={styles.container}>
      <h1>Profile Directory</h1>

      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        uniqueLocations={uniqueLocations}
      />

      {filteredProfiles.length > 0 ? (
        <div className={styles.grid}>
          {filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onSummaryClick={() => handleSummaryClick(profile.address)}
            />
          ))}
        </div>
      ) : (
        <p>No matching profiles found.</p>
      )}

      {selectedAddress && (
        <div ref={mapRef} style={{ marginTop: "40px" }}>
          <h2>Address on map:</h2>
          <MapView key={selectedAddress} address={selectedAddress} />
        </div>
      )}
    </div>
  );
};

export default Home;
