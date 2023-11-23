// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/navbar.module.css'; // Make sure to create a corresponding CSS module file

export default function Navbar({ onLanguageToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.nav}>
      <button className={styles.hamburger} onClick={toggleMenu}>
        &#9776;
      </button>
      <div className={`${styles.menu} ${isOpen ? styles.show : ''}`}>
        <Link href="/" onClick={closeMenu}>
          Home
        </Link>
        <Link href="/about-us" onClick={closeMenu}>
          About Us
        </Link>
        <Link href="/contact-us" onClick={closeMenu}>
          Contact Us
        </Link>
        <Link href="/news" onClick={closeMenu}>
          News
        </Link>
        <Link href="/courses" onClick={closeMenu}>
          Courses
        </Link>
        <div className={styles.languageToggle}>
          <button onClick={onLanguageToggle}>GR/EN</button>
        </div>

        <footer className={styles.footer}>
      <p className={styles.info}>The Fire Service College</p>
      <p className={styles.info}>London Road, Moreton-in-Marsh, Gloucestershire, GL56 0RH</p>
      <p className={styles.info}>+44 (0)1608 650 831</p>
    </footer>
      </div>
    </nav>
  );
}
