// src/components/Footer.js
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/Footer.module.css'; // Update the path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.logoSection}>
                    <img src="https://upload.wikimedia.org/wikipedia/el/d/d1/Fireserviccegr.png" alt='FD-LOGO' className={styles.logo} width={105} height={105} />
                    <Image src='/images/niarxos.jpg' alt='Niarxos-Logo' title='SNF' width={250} height={105} />
                </div>
                <div className={styles.addressSocials}>
                <address className={styles.address}>
                    <p>{t('collegeName')}</p>
                    <p>{t('collegeAddress')}</p>
                    <p>
                        <a href={`tel:${t('collegePhone')}`}>
                            {t('collegePhone')}
                        </a>
                    </p>
                </address>
                <div className={styles.socials}>
                <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
                </a>
                </div>
                </div>
                <div className={styles.addressSocials}>
                <div className={styles.navLinks}>
                    <a href="/contact-us/" className={styles.link}>{t('contactUs')}</a>
                    <a href="/legal/" className={styles.link}>{t('legal')}</a>
                    <a href="/terms-and-conditions/" className={styles.link}>{t('termsAndConditions')}</a>
                </div>
                <p className={styles.credit}>
                    <a href="https://agileadvisors.gr/" target="_blank">Made by agileadvisors.gr</a>
                </p>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p className={styles.copyright}>
                    © {new Date().getFullYear()} {t('copyrightText')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
