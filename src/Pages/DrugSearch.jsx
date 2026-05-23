import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback } from 'react';
import { MedicineCard } from '../Components/Card/MedicineCard';
import { searchMedicinesApi } from '../services/api';

export default function DrugSearch() {
  const [medicineValue, setMedicineValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [drugData, setDrugData] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (value) => {
    if (!value.trim()) {
      setDrugData([]);
      setSearched(false);
      return;
    }
    try {
      setLoading(true);
      const res = await searchMedicinesApi(value);
      setDrugData(res.data || []);
      setSearched(true);
    } catch (error) {
      console.error('Search error:', error);
      setDrugData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMedicineValue(value);
    handleSearch(value);
  };

  return (
    <div className="drug-search-page">
      <div className="container py-5">
        {/* ── Search Box (fixed at top) ── */}
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
              value={medicineValue}
              onChange={handleInputChange}
              placeholder="Search medicine..."
              className="search-input"
            />
            <button
              onClick={() => handleSearch(medicineValue)}
              className="search-btn"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* ── Results Grid ── */}
        {drugData.length > 0 && (
          <div className="mt-5">
            <p className="search-results-count">
              {drugData.length} result{drugData.length !== 1 ? 's' : ''} found
            </p>
            <div className="row g-4">
              {drugData.map((medicine) => (
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={medicine._id}>
                  <MedicineCard medicine={medicine} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Empty State ── */}
        {searched && drugData.length === 0 && !loading && (
          <div className="text-center mt-5">
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
              No medicines found for "<strong style={{ color: '#fff' }}>{medicineValue}</strong>"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
