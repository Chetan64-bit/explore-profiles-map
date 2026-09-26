import React, { useState, useEffect } from "react";
import { loadProfiles } from "../data/profileStore";
import styles from "./AdminPanel.module.css";

const AdminPanel = () => {
  const [profiles, setProfiles] = useState(loadProfiles);
  const [feedback, setFeedback] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
    address: "",
    contact: "",
    interests: ""
  });

  //  Save to localStorage whenever profiles change
  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!formData.name.trim() || !formData.address.trim()) {
      setFeedback("Name and location are required.");
      return;
    }

    const newProfile = {
      ...formData,
      id: Date.now() // unique ID
    };

    setProfiles((prev) => [...prev, newProfile]);
    setFeedback(`${newProfile.name} added to the roster.`);

    setFormData({
      name: "",
      photo: "",
      description: "",
      address: "",
      contact: "",
      interests: ""
    });
  };

  const handleDelete = (id) => {
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
  };

  return (
    <div className={styles.adminGrid}>
      <section className={styles.formPanel}>
        <div className={styles.sectionHeading}><div><span>NEW RECORD</span><h2>Add profile</h2></div><b>01 / 02</b></div>
        <div className={styles.formGrid}>
          <label>Name <input name="name" placeholder="Full name" value={formData.name} onChange={handleChange} /></label>
          <label>Location <input name="address" placeholder="City, region, country" value={formData.address} onChange={handleChange} /></label>
          <label className={styles.wide}>Description <input name="description" placeholder="Role or short description" value={formData.description} onChange={handleChange} /></label>
          <label>Photo URL <input name="photo" type="url" placeholder="https://" value={formData.photo} onChange={handleChange} /></label>
          <label>Contact <input name="contact" type="email" placeholder="name@example.com" value={formData.contact} onChange={handleChange} /></label>
          <label className={styles.wide}>Interests <input name="interests" placeholder="Separate interests with commas" value={formData.interests} onChange={handleChange} /></label>
        </div>
        <div className={styles.formActions}>
          <p role="status">{feedback || "Required fields are marked by the form."}</p>
          <button onClick={handleAdd}><span>ADD TO ROSTER</span><b>+</b></button>
        </div>
      </section>

      <section className={styles.rosterPanel}>
        <div className={styles.sectionHeading}><div><span>LOCAL DATABASE / {String(profiles.length).padStart(2, "0")} RECORDS</span><h2>Current roster</h2></div><b>02 / 02</b></div>
        <ul className={styles.rosterList}>
          {profiles.map((profile, index) => (
            <li key={profile.id}>
              <span className={styles.recordIndex}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.recordDetails}><strong>{profile.name}</strong><span>{profile.address}</span></div>
              <button className={styles.deleteButton} aria-label={`Remove ${profile.name}`} title={`Remove ${profile.name}`} onClick={() => handleDelete(profile.id)}>×</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
