const SearchFilter = ({
  searchQuery,
  onSearchChange,
  locationFilter,
  onLocationChange,
  uniqueLocations
}) => {
  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)} // updates live
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // prevent form submission
            onSearchChange(e.target.value); // re-triggers filtering
          }
        }}
        style={{ padding: "8px", width: "200px" }}
      />

      <select
        value={locationFilter}
        onChange={(e) => onLocationChange(e.target.value)}
        style={{ padding: "8px", width: "200px" }}
      >
        <option value="">All Locations</option>
        {uniqueLocations.map((loc, idx) => (
          <option key={idx} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
