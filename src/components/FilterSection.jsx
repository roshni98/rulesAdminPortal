import React, { useState } from "react";
import "../FilterSection.css";

const FilterSection = () => {
  const [filtersEnabled, setFiltersEnabled] = useState(false);
  const [filtersLocked, setFiltersLocked] = useState(false);
  const [segmentEnabled, setSegmentEnabled] = useState(false);
  const [filters, setFilters] = useState({
    numRecs: "",
    locationEnabled: false,
    location: "New York",
    repeatEnabled: false,
    repeatValue: "",
    availabilityEnabled: false,
    availability: "",
    numTranches: "",
    selectEachTranche: false,
    combineTranches: false,
    combineTranchesValue: ""
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="filter-panel">
      {/* Toggle to enable filters */}
      <div className="toggle-container">
        <label>Enable Filters</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={filtersEnabled}
            onChange={() => setFiltersEnabled(!filtersEnabled)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {filtersEnabled && (
        <div className="filters">
          {/* Filters Section */}
          <div className="filter-item">
            <label># of Recs</label>
            <input
              type="number"
              name="numRecs"
              value={filters.numRecs}
              onChange={handleFilterChange}
              disabled={filtersLocked}
            />
          </div>

          <div className="filter-item">
            <label>
              <input
                type="checkbox"
                name="locationEnabled"
                checked={filters.locationEnabled}
                onChange={handleFilterChange}
                disabled={filtersLocked}
              />
              Location
            </label>
            {filters.locationEnabled && (
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                disabled={filtersLocked}
              >
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
              </select>
            )}
          </div>

          <div className="filter-item">
            <label>
              <input
                type="checkbox"
                name="repeatEnabled"
                checked={filters.repeatEnabled}
                onChange={handleFilterChange}
                disabled={filtersLocked}
              />
              Repeat
            </label>
            {filters.repeatEnabled && (
              <input
                type="number"
                name="repeatValue"
                value={filters.repeatValue}
                onChange={handleFilterChange}
                disabled={filtersLocked}
              />
            )}
          </div>

          <div className="filter-item">
            <label>
              <input
                type="checkbox"
                name="availabilityEnabled"
                checked={filters.availabilityEnabled}
                onChange={handleFilterChange}
                disabled={filtersLocked}
              />
              Availability
            </label>
            {filters.availabilityEnabled && (
              <input
                type="text"
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
                disabled={filtersLocked}
              />
            )}
          </div>

          {/* Segment Toggle */}
          <div className="toggle-container">
            <label>Segment</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={segmentEnabled}
                onChange={() => setSegmentEnabled(!segmentEnabled)}
                disabled={filtersLocked}
              />
              <span className="slider"></span>
            </label>
          </div>

          {segmentEnabled && (
            <div className="segment-section">
              <div className="filter-item">
                <label># of Tranches</label>
                <input
                  type="number"
                  name="numTranches"
                  value={filters.numTranches}
                  onChange={handleFilterChange}
                  disabled={filtersLocked}
                />
              </div>

              <div className="filter-item">
                <label>
                  <input
                    type="checkbox"
                    name="selectEachTranche"
                    checked={filters.selectEachTranche}
                    onChange={handleFilterChange}
                    disabled={filtersLocked}
                  />
                  Select from Each Tranche
                </label>
              </div>

              <div className="filter-item">
                <label>
                  <input
                    type="checkbox"
                    name="combineTranches"
                    checked={filters.combineTranches}
                    onChange={handleFilterChange}
                    disabled={filtersLocked}
                  />
                  Combine Tranches
                </label>
                {filters.combineTranches && (
                  <input
                    type="number"
                    name="combineTranchesValue"
                    value={filters.combineTranchesValue}
                    onChange={handleFilterChange}
                    disabled={filtersLocked}
                  />
                )}
              </div>
            </div>
          )}

          {/* Save/Edit Button */}
          <button onClick={() => setFiltersLocked(!filtersLocked)}>
            {filtersLocked ? "Edit" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
