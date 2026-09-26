import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import MapView from "../components/MapView";
import styles from "./Home.module.css";
import { loadProfiles } from "../data/profileStore";

const Home = () => {
  const [profiles] = useState(loadProfiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const filteredProfiles = profiles.filter((profile) => {
    const query = searchQuery.trim().toLowerCase();
    const queryMatch = [profile.name, profile.description, profile.address]
      .some((value) => value.toLowerCase().includes(query));
    const locationMatch = locationFilter ? profile.address === locationFilter : true;
    return queryMatch && locationMatch;
  });

  const uniqueLocations = [...new Set(profiles.map((p) => p.address))];
  const selectedProfile = filteredProfiles.find((profile) => profile.id === selectedId) || filteredProfiles[0];

  return (
    <div className={styles.container}>
      <header className={styles.topbar}>
        <Link to="/" className={styles.wordmark}><span className={styles.brandMark}>E</span> EXPLORE</Link>
        <nav className={styles.navigation} aria-label="Main navigation">
          <a href="#directory">DIRECTORY</a>
          <Link to="/admin">ADMIN <span className={styles.onlineDot} /></Link>
        </nav>
      </header>

      <main>
        <section className={styles.intro}>
          <div className={styles.eyebrow}><span /> DIRECTORY / {profiles.length} ENTRIES LOGGED</div>
          <div className={styles.introRow}>
            <div>
              <h1>Explore the field roster<span>.</span></h1>
              <p>Every profile pinned to a coordinate. Search a name or narrow by location to survey the map.</p>
            </div>
            <div className={styles.coordinates} aria-hidden="true">
              <span>FIELD STATUS</span>
              <strong>LIVE <i /></strong>
            </div>
          </div>
        </section>

        <section className={styles.workspace} id="directory" aria-label="Profile directory and map">
          <div className={styles.directoryPane}>
            <div className={styles.toolbar}>
              <label className={styles.searchBox}>
                <span className={styles.searchIcon} aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search profiles or coordinates..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label="Search profiles or coordinates"
                />
                {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear search">×</button>}
              </label>
              <label className={styles.locationSelect}>
                <span className={styles.filterLabel}>AREA</span>
                <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)} aria-label="Filter by location">
                  <option value="">All locations</option>
                  {uniqueLocations.map((location) => <option key={location} value={location}>{location}</option>)}
                </select>
              </label>
            </div>

            <div className={styles.listHeading}>
              <span>ROSTER <b>{String(filteredProfiles.length).padStart(2, "0")}</b></span>
              <span>SELECT A PROFILE TO LOCATE</span>
            </div>

            {filteredProfiles.length > 0 ? (
              <div className={styles.grid}>
                {filteredProfiles.map((profile, index) => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    selected={selectedProfile?.id === profile.id}
                    index={index}
                    onSummaryClick={() => setSelectedId(profile.id)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}><span>NO SIGNAL</span><p>No profiles match this search. Adjust your filters and try again.</p></div>
            )}
          </div>

          <aside className={styles.mapPanel} aria-label="Selected profile location">
            <div className={styles.mapHeader}>
              <div><span className={styles.panelKicker}>LIVE ATLAS</span><h2>Field map</h2></div>
              <span className={styles.mapScale}>MAP / 01</span>
            </div>
            <div className={styles.mapFrame}>
              {selectedProfile ? (
                <MapView address={selectedProfile.address} name={selectedProfile.name} coordinates={selectedProfile.coordinates} />
              ) : (
                <div className={styles.mapEmpty}>Select a profile to load its coordinates.</div>
              )}
              <div className={styles.mapCorner} aria-hidden="true"><span>N</span><b>↑</b></div>
              {selectedProfile && (
                <div className={styles.mapTag}>
                  <span>ACTIVE COORDINATE</span>
                  <strong>{selectedProfile.name}</strong>
                  <small>{selectedProfile.address}</small>
                </div>
              )}
            </div>
            {selectedProfile && <div className={styles.mapFooter}><span><i /> LOCKED TO PROFILE</span><span>OPENSTREETMAP DATA</span></div>}
          </aside>
        </section>
      </main>
      <footer className={styles.footer}><span>EXPLORE / FIELD DIRECTORY</span><span>BUILT FOR FINDING YOUR PEOPLE <b>↗</b></span></footer>
    </div>
  );
};

export default Home;
