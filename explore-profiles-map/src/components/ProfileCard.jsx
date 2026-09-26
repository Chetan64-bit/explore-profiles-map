import React from "react";
import styles from "./ProfileCard.module.css";
import { Link } from 'react-router-dom';

const ProfileCard =({profile, onSummaryClick, selected, index = 0}) => {
    return(
        <article className={`${styles.card} ${selected ? styles.selected : ""}`} style={{ "--card-index": index }}>
            <div className={styles.cardTopline}><span>ENTRY / {String(profile.id).padStart(2, "0")}</span><span className={styles.pin} aria-label={selected ? "Pinned on map" : "Not pinned"} /></div>
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
            <p className={styles.description}>{profile.description}</p>
            <p className={styles.address}>{profile.address}</p>
            <button
                className={styles.button}
                onClick={onSummaryClick}
                aria-pressed={Boolean(selected)}
            >
                <span>VIEW ON MAP</span><b aria-hidden="true">↗</b>
            </button>
        </article>
    );

};

export default ProfileCard;
// ProfileCard.jsx
// This component is used to display individual profile cards in the Explore Profiles Map.
// It takes a profile object and a callback function as props.
// The profile object contains the photo, name, description, and id of the profile.


