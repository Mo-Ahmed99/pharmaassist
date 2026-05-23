import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMedicineByIdApi, getAlternativesApi } from '../services/api';
import './MedicineDetail.css';

export default function MedicineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      setMedicine(null);
      setAlternatives([]);

      try {
        const [medRes, altRes] = await Promise.all([
          getMedicineByIdApi(id),
          getAlternativesApi(id),
        ]);

        if (medRes.data) {
          setMedicine(medRes.data);
        } else {
          setError('Medicine not found');
        }

        setAlternatives(altRes.data || []);
      } catch {
        setError('Failed to load medicine details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
        <div className="medicine-detail-page d-flex align-items-center justify-content-center">
          <div className="detail-loading">
            <div className="detail-spinner"></div>
            <p style={{ color: 'white' }}>Loading medicine details...</p>
          </div>
        </div>
    );
  }

  if (error || !medicine) {
    return (
        <div className="medicine-detail-page d-flex align-items-center justify-content-center">
          <div className="text-center" style={{ color: 'white' }}>
            <p>{error || 'Not found'}</p>
            <button className="detail-back-btn mt-3" onClick={() => navigate(-1)}>← Go Back</button>
          </div>
        </div>
    );
  }

  return (
      <div className="medicine-detail-page">
        <div className="container py-5">
          <button className="detail-back-btn mb-4" onClick={() => navigate(-1)}>
            ← Back
          </button>

          {/* ── بطاقة التفاصيل الرئيسية ── */}
          <div className="detail-card">
            <div className="detail-header">
              <div className="detail-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
                        stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h1 className="detail-name">{medicine.trade_name}</h1>
                {medicine.scientific_name && (
                    <p className="detail-scientific">{medicine.scientific_name}</p>
                )}
                <div className="detail-badges">
                  {medicine.category && <span className="detail-badge">{medicine.category}</span>}
                  {medicine.dosage_form && <span className="detail-badge">{medicine.dosage_form}</span>}
                  {medicine.requires_prescription && (
                      <span className="detail-badge detail-badge--rx">Prescription Required</span>
                  )}
                </div>
              </div>
            </div>

            <div className="detail-grid">
              {medicine.description && (
                  <DetailSection  title="Description" content={medicine.description} />
              )}
              {medicine.active_ingredient && (
                  <DetailSection  title="Active Ingredient" content={medicine.active_ingredient} />
              )}
              {medicine.active_ingredient_concentration && (
                  <DetailSection  title="Concentration" content={medicine.active_ingredient_concentration} />
              )}
              {medicine.side_effects && (
                  <DetailSection  title="Side Effects" content={medicine.side_effects} highlight />
              )}
              {medicine.manufacturer && (
                  <DetailSection  title="Manufacturer" content={medicine.manufacturer} />
              )}
            </div>
          </div>

          {/* ── قسم البدائل ── */}
          <div className="alternatives-section">
            <div className="alternatives-header">
              <h2 className="alternatives-title">
                <span className="alternatives-icon"></span>
                Alternative Medicines
              </h2>
              {medicine.active_ingredient && (
                  <p className="alternatives-subtitle">
                    Same active ingredient: <strong>{medicine.active_ingredient}</strong>
                  </p>
              )}
            </div>

            {alternatives.length === 0 ? (
                <div className="alternatives-empty">
                  <p>No alternatives found for this medicine.</p>
                </div>
            ) : (
                <div className="row g-3">
                  {alternatives.map((alt) => (
                      <div className="col-12 col-sm-6 col-lg-4" key={alt._id}>
                        <AlternativeCard medicine={alt} />
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
}


function AlternativeCard({ medicine }) {
  const navigate = useNavigate();

  return (
      <div
          className="alt-card"
          onClick={() => navigate(`/medicine/${medicine._id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(`/medicine/${medicine._id}`)}
      >
        <div className="alt-card__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
                  stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="alt-card__body">
          <h6 className="alt-card__name">{medicine.trade_name}</h6>
          {medicine.scientific_name && (
              <p className="alt-card__scientific">{medicine.scientific_name}</p>
          )}
          {medicine.dosage_form && (
              <span className="alt-card__form">{medicine.dosage_form}</span>
          )}
        </div>
        <span className="alt-card__arrow">→</span>
      </div>
  );
}

function DetailSection({ icon, title, content, highlight }) {
  return (
      <div className={`detail-section ${highlight ? 'detail-section--warn' : ''}`}>
        <h6 className="detail-section__title">
          <span className="detail-section__icon">{icon}</span>
          {title}
        </h6>
        <p className="detail-section__content">{content}</p>
      </div>
  );
}