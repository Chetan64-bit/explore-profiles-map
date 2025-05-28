import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapView from "./MapView";

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("profiles");
    if (stored) {
      const allProfiles = JSON.parse(stored);
      console.log("Loaded ID from URL:", id);
      const matched = allProfiles.find((p) => String(p.id) === String(id));
      console.log("Matched profile:", matched);
      setProfile(matched); 
    }
  }, [id]);

  if (!profile) {
    return <p style={{ padding: "20px" }}>Profile not found.</p>;
  }

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <img
        src={profile.photo}
        alt={profile.name}
        style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/150";
        }}
      />

      <h1>{profile.name}</h1>
      <p><strong>Description:</strong> {profile.description}</p>
      <p><strong>Contact:</strong> {profile.contact}</p>
      <p><strong>Interests:</strong> {profile.interests}</p>
      <p><strong>Address:</strong> {profile.address}</p>

      <div style={{ marginTop: "30px" }}>
        <h3>Location on Map:</h3>
        <MapView address={profile.address} />
      </div>
    </div>
  );
};

export default ProfileDetail;
