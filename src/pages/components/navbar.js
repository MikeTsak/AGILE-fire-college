// components/Navbar.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { slide as Menu } from 'react-burger-menu';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css'; // Make sure to create a corresponding CSS module file

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { t, i18n } = useTranslation();
      const [currentLanguage , setCurrentLang] = useState(i18n.language);

    const toggleLanguage = () => {
      const currentLanguage = i18n.language;
      const newLanguage = currentLanguage === 'en' ? 'el' : 'en';
      i18n.changeLanguage(newLanguage);
      setCurrentLang(newLanguage);
    }

    const handleStateChange = (state) => {
        setIsOpen(state.isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const burgerButtonClassName = isOpen ? `${styles.bmBurgerButton} ${styles.bmBurgerButtonOpen}` : styles.bmBurgerButton;

    const menuStyles = {
      bmMenu: {
        background: 'white',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
      },  bmOverlay: styles.bmOverlay,
    };

    return (
      <div>
      <Menu 
        right 
        isOpen={isOpen}
        customBurgerIcon={false}
        customCrossIcon={false}
        onStateChange={(state) => handleStateChange(state)}
        className={styles.bmMenuWrap}
        menuClassName={styles.bmMenu}
        itemListClassName={styles.bmItemList}
        itemClassName={styles.bmItem}
      >
        <div className={styles.menuHeader}></div>
        <Link href="/" id="home" className={styles.menuItem} onClick={closeMenu}>{t('NavHome')}</Link>
        <Link href="/about" id="about" className={styles.menuItem} onClick={closeMenu}>{t('NavAbout')}</Link>
        <Link href="/courses" id="courses" className={styles.menuItem} onClick={closeMenu}>{t('NavCourses')}</Link>
        <Link href="/news" id="news" className={styles.menuItem} onClick={closeMenu}>{t('NavNews')}</Link>
        <Link href="/contact" id="contact" className={styles.menuItem} onClick={closeMenu}>{t('NavContact')}</Link>
        <button onClick={toggleLanguage} className={styles.languageToggle}>
          <img 
            src={currentLanguage  === 'en' ? '/images/greece.png' : '/images/united-kingdom.png'} 
            alt={currentLanguage  === 'en' ? 'Greek Flag' : 'English Flag'} 
          />
        </button>
        <address className={styles.menuFooter} onClick={(e) => e.stopPropagation()}>
          <p>{t("collegeName")}</p>
          <p>{t("collegeAddress")}</p>
          <br></br>
          <p>{t("PhoneSort")}: {t("collegePhone")}</p>
        </address>
      </Menu>
        <button className={burgerButtonClassName} onClick={() => setIsOpen(!isOpen)}>
          <span className={styles.bmBurgerBars}></span>
          <span className={styles.bmBurgerBars}></span>
          <span className={styles.bmBurgerBars}></span>
        </button>
      </div>
  );
};

export default Navbar;
