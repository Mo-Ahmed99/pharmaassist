import React from 'react'
import './TabSwitch.css'

function TabSwitch({ activeTab, onTabChange }) {
  return (
    <div className="tab-switch">
      <button
        className={`tab-switch__btn ${activeTab === 'signin' ? 'tab-switch__btn--active' : ''}`}
        onClick={() => onTabChange('signin')}
      >
        Sign in
      </button>
      <button
        className={`tab-switch__btn ${activeTab === 'signup' ? 'tab-switch__btn--active' : ''}`}
        onClick={() => onTabChange('signup')}
      >
        Sign up
      </button>
    </div>
  )
}

export default TabSwitch
