//components/Logo.js
import React from 'react';
import Link from 'next/link';
import styles from '../../styles/TopLeftImage.module.css'; // Path to your CSS module

const Logo = ({ src, alt }) => {
  return (
    <Link href='/' className={styles.logo}>
      <img src={'https://www.alt.gr/wp-content/uploads/2020/03/Pyrosvestiko-soma_logo-1200x675.jpg'} alt='logo' />
    </Link>
  );
};

export default Logo;
