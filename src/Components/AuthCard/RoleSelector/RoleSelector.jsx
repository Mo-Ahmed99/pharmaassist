import React from 'react'
import './RoleSelector.css'

function RoleSelector({ selectedRole, onRoleChange }) {
  return (
    <div className="role-selector">
      <span className="role-selector__label">I am a</span>
      <div className="role-selector__options">
        <button
          type="button"
          className={`role-selector__btn ${selectedRole === 'patient' ? 'role-selector__btn--active' : ''}`}
          onClick={() => onRoleChange('patient')}
        >
          <svg
            className="role-selector__icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          </svg>
          Patient
        </button>
        <button
          type="button"
          className={`role-selector__btn ${selectedRole === 'pharmacy' ? 'role-selector__btn--active' : ''}`}
          onClick={() => onRoleChange('pharmacy')}
        >
          <svg
            className="role-selector__icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <polyline
              points="9 22 9 12 15 12 15 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Pharmacy
        </button>
      </div>
    </div>
  )
}

export default RoleSelector
