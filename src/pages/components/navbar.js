// components/Navbar.js
import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css'; // Make sure to create a corresponding CSS module file

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleStateChange = (state) => {
        setIsOpen(state.isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
      <div>
      <Menu 
        right 
        isOpen={isOpen}
        onStateChange={(state) => handleStateChange(state)}
        
      >
        <Link href="/" id="home" className="menu-item" onClick={closeMenu}>Home</Link>
        <Link href="/about" id="about" className="menu-item" onClick={closeMenu}>About Us</Link>
        <Link href="/training" id="training" className="menu-item" onClick={closeMenu}>Training</Link>
        <Link href="/what-we-do" id="what-we-do" className="menu-item" onClick={closeMenu}>What We Do</Link>
        <div className="menu-footer">
          <p>The Fire Service College</p>
          <p>London Road, Moreton-in-Marsh</p>
        </div>
      </Menu>
      <button className={styles.bmBurgerButton} onClick={() => setIsOpen(!isOpen)}>
          <span className={styles.bmBurgerBars}></span>
        </button>
      </div>
  );
};

export default Navbar;
