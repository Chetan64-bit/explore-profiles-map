import React, { useState, useEffect } from "react";

const AdminPanel = () => {
  const [profiles, setProfiles] = useState(() => {
    const stored = localStorage.getItem("profiles");
    return stored ? JSON.parse(stored) : [];
  });

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
    if (!formData.name || !formData.address) {
      alert("Name and address are required!");
      return;
    }

    const newProfile = {
      ...formData,
      id: Date.now() // unique ID
    };

    setProfiles((prev) => [...prev, newProfile]);

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
    <div>
      <h2>Add New Profile</h2>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="photo" placeholder="Photo URL" value={formData.photo} onChange={handleChange} />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
      <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} />
      <input name="interests" placeholder="Interests" value={formData.interests} onChange={handleChange} />
      <button onClick={handleAdd}>Add Profile</button>

      <h2>All Profiles</h2>
      <ul>
        {profiles.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.address}
            <button onClick={() => handleDelete(p.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
