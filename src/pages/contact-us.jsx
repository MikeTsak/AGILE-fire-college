/*contact-us page*/
import Navbar from './components/navbar';
import Footer from './components/footer';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';
import styles from '../styles/ContactUs.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';


const ContactUsPage = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    company: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
  return (
      <div>
            <Head>
                <title>{t('ContactHeader')}</title>
                <meta name="description" content={t('ContactTextP1')} />
                <meta name="keywords" content={'Πυροσβεστικό Σώμα Ελλαδας, Fire Department Training Center, Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
                <meta name="author" content={t('collegeName')} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
          <Navbar />
          <Logo />
          <div className={styles.contactContainerForPage}>
          <h2 className={styles.collegenameForPage}>{t('collegeName')}</h2>
          <h1 className={styles.headerForPage}>{t('contactUs')}</h1>

          {/* Down is the form and up is the image and text */}
          <div className={styles.formGroupContainer}>

              <div className={styles.contactFormContainer}>
              <h2 className={styles.detailsForPage}>{t('ContactDetails')}</h2>

              <h2 className={styles.detailsCildrenForPage}>{t('Phone')}</h2>
              <a href={`tel:${t('collegePhone')}`} className={styles.addressLink}>
                <span className={styles.address}>{t('collegePhone')}</span>
              </a>

              <h2 className={styles.detailsCildrenForPage}>{t('Email')}</h2>
              <a href={`mailto:${t('collegeEmail')}`} className={styles.addressLink}>
                <span className={styles.address}>{t('collegeEmail')}</span>
              </a>

              <h2 className={styles.detailsCildrenForPage}>{t('Address')}</h2>
              <span className={styles.address}>{t('collegeAddress')}</span>

              <h2 className={styles.detailsCildrenForPage}>{t('OpeningHours')}</h2>
              <span className={styles.address}>{t('collegeOpeningHours')}</span>

            </div>


        {/* Up is the image and text down is the form */}

            <div className={styles.contactFormContainer}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="first_name">{t('FirstName')}*</label>
          <input
            type="text"
            className={styles.input}
            id="first_name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="surname">{t('Surname')}*</label>
          <input
            type="text"
            className={styles.input}
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="company">{t('Company')}</label>
          <input
            type="text"
            className={styles.input}
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">{t('Email')}*</label>
          <input
            type="email"
            className={styles.input}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">{t('Message')}*</label>
        <textarea
          id="message"
          className={styles.input}
          rows={5}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className={styles.privacyPolicy}>
        <span>{t('DataInForm')}</span>
        <Link href="/legal/"className={styles.privacyPolicyLink}>{t('PrivacyPolicy')}
        </Link>
      </div>

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
          <ContactUs />
          <Footer />
      </div>
  );
}

export default ContactUsPage;
