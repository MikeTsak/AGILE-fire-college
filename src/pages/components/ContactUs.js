// components/ContactUs.js
import React, { useState } from 'react';
import styles from '../../styles/ContactUs.module.css'
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactTab} onClick={toggleForm}>
        <b>{t('ContactUsQ')}</b>
      </div>
      
      {isOpen && (

        <div className={styles.formGroup}>
        <div className={styles.contactFormContainer}>
            <img src='/images/building.webp' alt='Building' width="250"/> {/*!!! IN CASE YOU CHANGR THE WIDTH OF THE IMAGE CHANGE "contactFormHeader" IT IN THE CSS TOO !!!*/}
            <div className={styles.contactFormHeader}>
                <span>{t('SpeekWithUs')}</span>
            </div>
            <span className={styles.phone}>{t('collegePhone')}</span>
        </div>


        {/* Up is the image and text down is the form */}

        <div className={styles.contactFormContainer}>
          <div className={styles.contactFormHeader}>
            {/* <span>{t('AnyQuestions')}</span> */}
            <button onClick={toggleForm} className={styles.closeButton}>{t('Close')}</button>
          </div>
          <form className={styles.contactForm} action="mailto:your-email@example.com" method="GET">
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="first_name">{t('FirstName')}</label>
                <input type="text" id="first_name" name="first_name" placeholder={t('FirstName')} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="surname">{t('Surname')}</label>
                <input type="text" id="surname" name="surname" placeholder={t('Surname')} required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="company">{t('Company')}</label>
                <input type="text" id="company" name="company" placeholder={t('Company')} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">{t('Email')}</label>
                <input type="email" id="email" name="email" placeholder={t('Email')} required />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">{t('Message')}</label>
              <textarea id="message" name="message" placeholder={t('Message')} required></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>{t('Submit')}</button>
          </form>
        </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
