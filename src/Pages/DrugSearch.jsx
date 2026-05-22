import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function DrugSearch() {
  const [medicinValue, setMedicinValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [drugData, setDrugData] = useState(null);

  async function handleSearch() {
    if (!medicinValue.trim()) {
      alert("Please enter a medicine name");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.example.com/drugs?name=${medicinValue}`,
      );

      const data = await response.json();

      setDrugData(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="drug-search-page">
      <div className="container py-5">
        <div className="search-box mx-auto">
          <h1 className="search-title">Find Your Medicine Instantly</h1>

          <p className="search-subtitle">
            Search medications and get detailed information quickly.
          </p>

          <div className="search-input-group">
            <div className="search-icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>

            <input
              type="text"
              value={medicinValue}
              onChange={(e) => setMedicinValue(e.target.value)}
              placeholder="Search medicine..."
              className="search-input"
            />

            <button onClick={handleSearch} className="search-btn">
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {drugData && (
          <div className="drug-card mx-auto mt-5">
            <div className="card-body">
              <h3 className="drug-name">{drugData.name}</h3>

              <h6 className="drug-info-title">Medicine Information</h6>

              <p className="drug-description">{drugData.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
