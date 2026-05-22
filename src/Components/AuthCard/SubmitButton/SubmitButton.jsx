import React from 'react'
import './SubmitButton.css'

function SubmitButton({ label, loading = false, onClick }) {
  return (
    <button
      type="submit"
      className={`submit-btn ${loading ? 'submit-btn--loading' : ''}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <span className="submit-btn__spinner" aria-hidden="true" />
      ) : null}
      <span className="submit-btn__label">{loading ? 'Please wait...' : label}</span>
    </button>
  )
}

export default SubmitButton
