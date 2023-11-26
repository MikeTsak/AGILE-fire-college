// components/ContactUs.js
import React, { useState } from 'react';
import styles from '../../styles/ContactUs.module.css'
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const pageDimClass = isOpen ? styles.dimContent : '';

  return (
    <>
        {isOpen && <div className={styles.overlay} onClick={toggleForm}></div>}
        {isOpen ? (
            <div className={styles.contactTabOpen} onClick={toggleForm}>
                <b>{t('ContactUsQ')}</b>
                <button className={styles.closeButton} onClick={toggleForm}>
                    {t('Close')}
                </button>
            </div>
        ) : (
            <div className={styles.contactTab} onClick={toggleForm}>
                <b>{t('ContactUsQ')}</b>
            </div>
        )}
        <div className={`${styles.contactContainer} ${isOpen ? styles.contactContainerOpen : ''}`}>
        <div className={styles.formGroupContainer}>
            <div className={pageDimClass}></div>
            
            <div className={styles.contactFormContainer}>
                <img src='/images/building.webp' alt='Building' width="250"/> {/*!!! IN CASE YOU CHANGR THE WIDTH OF THE IMAGE CHANGE "contactFormHeader" IT IN THE CSS TOO !!!*/}
                <div className={styles.contactFormHeader}>
                    <span>{t('SpeekWithUs')}</span>
                </div>
                <span className={styles.phone}>{t('collegePhone')}</span>
            </div>


        {/* Up is the image and text down is the form */}

            <div className={styles.contactFormContainer}>
            <form className={styles.contactForm} action="mailto:your-email@example.com" method="GET">
                <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="first_name">{t('FirstName')}*</label>
                    <input type="text" className={styles.input} id="first_name" name="first_name" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="surname">{t('Surname')}*</label>
                    <input type="text" className={styles.input} id="surname" name="surname" required />
                </div>
                </div>
                <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="company">{t('Company')}</label>
                    <input type="text" className={styles.input} id="company" name="company" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">{t('Email')}*</label>
                    <input type="email" className={styles.input} id="email" name="email" required />
                </div>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="message">{t('Message')}*</label>
                <textarea id="message" className={styles.input} rows={5} name="message" required></textarea>
                </div>
                <div className={styles.privacyPolicy}><span>{t('DataInForm')}</span> <Link href="/legal/"className={styles.privacyPolicyLink}>{t('PrivacyPolicy')}</Link></div>
                <span className={styles.required}>*{t('Required')}</span>
                <div className={styles.submitButtonContainer}>
                <button type="submit" className={styles.submitButton}>
                    {t('Submit')}
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
                </div>
            </form>
            </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
