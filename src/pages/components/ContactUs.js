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
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    company: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendMail', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          subject: 'New Contact Form Submission'  
        })
      });


      if (response.ok) {
        alert('Message sent successfully');
        setFormData({  // Clear the form after successful submission
          firstName: '',
          surname: '',
          company: '',
          email: '',
          message: ''
        });
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

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
                <img src='/images/contact-popup.png' alt='Building' width="250"/> {/*!!! IN CASE YOU CHANGR THE WIDTH OF THE IMAGE CHANGE "contactFormHeader" IT IN THE CSS TOO !!!*/}
                <div className={styles.contactFormHeader}>
                    <span>{t('SpeekWithUs')}</span>
                </div>
                <span className={styles.phone}>{t('collegePhone')}</span>
            </div>


        {/* Up is the image and text down is the form */}

            <div className={styles.contactFormContainer}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="firstName">{t('FirstName')}*</label>
                                <input type="text" className={styles.input} id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="surname">{t('Surname')}*</label>
                                <input type="text" className={styles.input} id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="company">{t('Company')}</label>
                                <input type="text" className={styles.input} id="company" name="company" value={formData.company} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">{t('Email')}*</label>
                                <input type="email" className={styles.input} id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message">{t('Message')}*</label>
                            <textarea id="message" className={styles.input} rows={5} name="message" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <div className={styles.privacyPolicy}>
                            <span>{t('DataInForm')}</span>
                            <Link href="/legal/" className={styles.privacyPolicyLink}>{t('PrivacyPolicy')}
                            </Link>
                        </div>
                        <span className={styles.required}>*{t('Required')}</span>
                        <div className={styles.submitButtonContainer}>
                            <button className={styles.closeButton} onClick={toggleForm}>
                                {t('Close')}
                            </button>
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
