import {useParams} from 'react-router-dom';
import profiles from "../data/profiles.json";

const ProfileDetail = () => {
    const{id}= useParams();
    const profile = profiles.find((P) => P.id === id ===parseInt(id));

    if (!profile) return <div>Profile not found</div>;
    return (
        <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
            <img
            src={profile.image}
            alt={profile.name}
            style={{ width: "150px", borderRadius: "50%" }}
            />

            <h1 style={{ fontSize: "28px", marginTop: "20px" }}>{profile.name}</h1>
            <p style={{ fontStyle: "italic" }}>{profile.descreption}</p>
            <p><strong>Contact:</strong>{profile.contact}</p>
            <p><strong>Interests:</strong>{profile.intresrt}</p>
            <p><strong>Address:</strong>{profile.address}</p>

            <div style={{ marginTop: "30px" }}>
                <h3>Location on Map:</h3>
                <mapView address={profile.address} />
            </div>

        </div>
    );

};

export default ProfileDetail;
// This code defines a ProfileDetail component that displays detailed information about a specific profile.
// It uses the useParams hook to get the profile ID from the URL, and then finds the corresponding profile from the Profiles array.
// If the profile is not found, it displays a "Profile not found" message.
// If the profile is found, it displays the profile's image, name, description, contact information, interests, and address.