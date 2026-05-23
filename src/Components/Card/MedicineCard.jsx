import { useNavigate } from 'react-router-dom';
import './MedicineCard.css';

export const MedicineCard = ({ medicine }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/medicine/${medicine._id}`);
  };

  return (
    <div className="medicine-card" onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
      <div className="medicine-card__icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
            stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="medicine-card__body">
        <h5 className="medicine-card__name">{medicine.trade_name}</h5>
        {medicine.scientific_name && (
          <p className="medicine-card__scientific">{medicine.scientific_name}</p>
        )}
        {medicine.category && (
          <span className="medicine-card__badge">{medicine.category}</span>
        )}
        <p className="medicine-card__desc">
          {medicine.description
            ? medicine.description.substring(0, 80) + (medicine.description.length > 80 ? '…' : '')
            : 'No description available'}
        </p>
      </div>

      <div className="medicine-card__footer">
        <span className="medicine-card__cta">View Details →</span>
      </div>
    </div>
  );
};
