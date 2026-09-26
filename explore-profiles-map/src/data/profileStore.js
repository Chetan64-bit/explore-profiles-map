import ProfilesData from "./profiles.json";

const seedVersion = "5";
const legacyDefaultPhotos = {
  "1": "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/tony_stark.png",
  "2": "https://images.alphacoders.com/112/thumb-1920-1127535.jpg",
  "3": "https://images8.alphacoders.com/107/thumb-1920-1072048.jpg",
  "4": "https://images4.alphacoders.com/651/thumb-1920-651028.jpg",
  "5": "https://artfiles.alphacoders.com/978/thumb-1920-97812.jpg"
};
const legacySeedPortraitPaths = new Set([
  "/images/characters/wanda-maximoff.png"
]);

export const loadProfiles = () => {
  try {
    const stored = localStorage.getItem("profiles");
    if (!stored) {
      localStorage.setItem("profiles", JSON.stringify(ProfilesData));
      localStorage.setItem("profilesSeedVersion", seedVersion);
      return ProfilesData;
    }

    const profiles = JSON.parse(stored);
    if (!Array.isArray(profiles)) throw new Error("Stored profiles must be an array");
    if (localStorage.getItem("profilesSeedVersion") === seedVersion) return profiles;

    const seedById = new Map(ProfilesData.map((profile) => [String(profile.id), profile]));
    const savedIds = new Set(profiles.map((profile) => String(profile.id)));
    const migratedProfiles = profiles.map((profile) => {
      const seed = seedById.get(String(profile.id));
      if (!seed) return profile;

      const isSeedPortrait = !profile.photo
        || profile.photo.includes("placehold.co")
        || profile.photo === seed.photo
        || legacySeedPortraitPaths.has(profile.photo)
        || profile.photo === legacyDefaultPhotos[String(profile.id)];

      return {
        ...profile,
        ...(isSeedPortrait ? {
          photo: seed.photo,
          photoCredit: seed.photoCredit,
          photoSource: seed.photoSource
        } : {}),
        ...(profile.coordinates ? {} : { coordinates: seed.coordinates })
      };
    });
    const additions = ProfilesData.filter((profile) => !savedIds.has(String(profile.id)));
    const mergedProfiles = [...migratedProfiles, ...additions];

    localStorage.setItem("profiles", JSON.stringify(mergedProfiles));
    localStorage.setItem("profilesSeedVersion", seedVersion);
    return mergedProfiles;
  } catch {
    return ProfilesData;
  }
};