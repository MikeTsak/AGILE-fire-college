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
        <form className={styles.contactForm} action="mailto:your-email@example.com" method="GET">
          <input type="text" name="first_name" placeholder="First name" required />
          <input type="text" name="surname" placeholder="Surname" required />
          <input type="text" name="company" placeholder="Company" />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
