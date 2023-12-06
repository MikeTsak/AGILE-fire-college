//components/Logo.js
import React from 'react';
import Link from 'next/link';
import styles from '../../styles/TopLeftImage.module.css'; // Path to your CSS module

const Logo = ({ src, alt }) => {
  return (
    <Link href='/' className={styles.logo}>
      <img src={'images/sxoli_sima_full.png'} alt='logo' />
    </Link>
  );
};

export default Logo;
