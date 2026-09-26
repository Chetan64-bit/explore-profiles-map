import { Link, useParams } from 'react-router-dom';
import MapView from "../components/MapView";
import { loadProfiles } from "../data/profileStore";
import styles from "./ProfileDetail.module.css";

const ProfileDetail = () => {
    const { id } = useParams();
    const profiles = loadProfiles();
    const profile = profiles.find((item) => String(item.id) === id);

    if (!profile) {
        return <main className={styles.page}><Link className={styles.backLink} to="/">← BACK TO DIRECTORY</Link><p className={styles.notFound}>Profile not found.</p></main>;
    }

    return (
        <main className={styles.page}>
            <header className={styles.topbar}>
                <Link to="/" className={styles.wordmark}><span>E</span> EXPLORE</Link>
                <Link to="/admin" className={styles.adminLink}>ADMIN <i /></Link>
            </header>
            <Link className={styles.backLink} to="/">← BACK TO DIRECTORY</Link>
            <section className={styles.profileLayout}>
                <div className={styles.profileMain}>
                    <div className={styles.entryLabel}><span /> FIELD ENTRY / {String(profile.id).padStart(2, "0")}</div>
                    <div className={styles.identity}>
                        <div className={styles.portraitWrap}>
                            <img src={profile.photo} alt={profile.name} onError={(event) => { event.currentTarget.src = "/images/characters/tony-stark.jpg"; }} />
                            {profile.photoSource && <a href={profile.photoSource} target="_blank" rel="noreferrer">{profile.photoCredit || "IMAGE CREDIT"}</a>}
                        </div>
                        <div>
                            <h1>{profile.name}<span>.</span></h1>
                            <p>{profile.description}</p>
                        </div>
                    </div>
                    <div className={styles.dataGrid}>
                        <div><span>LOCATION</span><strong>{profile.address}</strong></div>
                        <div><span>CONTACT</span><strong>{profile.contact || "Not listed"}</strong></div>
                        <div className={styles.interests}><span>INTERESTS</span><strong>{profile.interests || "Not listed"}</strong></div>
                    </div>
                </div>
                <aside className={styles.mapPanel}>
                    <div className={styles.mapHeading}><div><span>LIVE ATLAS</span><h2>Field location</h2></div><small>MAP / 01</small></div>
                    <div className={styles.mapFrame}><MapView address={profile.address} name={profile.name} coordinates={profile.coordinates} /></div>
                    <div className={styles.mapFoot}><span><i /> LOCKED TO PROFILE</span><span>OPENSTREETMAP DATA</span></div>
                </aside>
            </section>
        </main>
    );

};

export default ProfileDetail;
// This code defines a ProfileDetail component that displays detailed information about a specific profile.
// It uses the useParams hook to get the profile ID from the URL, and then finds the corresponding profile from the Profiles array.
// If the profile is not found, it displays a "Profile not found" message.
// If the profile is found, it displays the profile's image, name, description, contact information, interests, and address.