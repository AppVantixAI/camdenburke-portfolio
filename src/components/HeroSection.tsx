'use client'

import React, { useState } from 'react'
import AgentOrb from './AgentOrb'
import ContactDropdown from './ContactDropdown'
import ChatOverlay from './ChatOverlay'
import styles from './HeroSection.module.css'

const HeroSection: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleOrbClick = () => {
    setIsChatOpen(true)
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
  }

  return (
    <section className={styles.heroSection}>
      <ContactDropdown />
      
      <div className={styles.heroCard}>
        <h1 className={styles.name}>Camden Burke</h1>
        <h2 className={styles.title}>Founder & AI Integration Consultant</h2>
        <h3 className={styles.company}>AppVantix LLC</h3>
      </div>

      <AgentOrb onClick={handleOrbClick} />
      
      {isChatOpen && <ChatOverlay onClose={handleCloseChat} />}
    </section>
  )
}

export default HeroSection