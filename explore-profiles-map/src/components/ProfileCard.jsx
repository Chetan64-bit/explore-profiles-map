import React from "react";
import styles from "./ProfileCard.module.css";
import { Link } from 'react-router-dom';

const ProfileCard =({profile, onSummaryClick}) => {
    return(
        <div className={styles.card}>
            <img
               src={profile.photo}
               alt={profile.name}
               onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                }}
                className={styles.photo}
            />
              <Link to={`/profile/${profile.id}`} className={styles.nameLink}>
                <h3>{profile.name}</h3>
              </Link>
            <div className={styles.name}>{profile.name}</div>
            <div className={styles.descreption}>{profile.description}</div>
            <button
                className={styles.button}
                onClick={() => onSummaryClick(profile.id)}

            >
                Summary 
            </button>
        </div>
    );

};

export default ProfileCard;
// ProfileCard.jsx
// This component is used to display individual profile cards in the Explore Profiles Map.
// It takes a profile object and a callback function as props.
// The profile object contains the photo, name, description, and id of the profile.


