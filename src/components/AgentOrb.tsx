'use client'

import React from 'react'
import styles from './AgentOrb.module.css'

interface AgentOrbProps {
  onClick: () => void
}

const AgentOrb: React.FC<AgentOrbProps> = ({ onClick }) => {
  return (
    <button
      className={styles.agentOrb}
      onClick={onClick}
      aria-label="Open AI Assistant Chat"
      aria-expanded={false}
    >
      <div className={styles.orbInner}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.orbIcon}
        >
          <circle cx="16" cy="16" r="14" fill="currentColor" />
          <circle cx="16" cy="16" r="8" fill="white" opacity="0.3" />
          <circle cx="16" cy="16" r="4" fill="white" opacity="0.6" />
        </svg>
        <span className={styles.statusDot} aria-label="Online" />
      </div>
    </button>
  )
}

export default AgentOrb