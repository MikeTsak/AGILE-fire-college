// src/components/Footer.js
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/Footer.module.css'; // Update the path as needed

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className={styles.footer}>
            <Image src="/images/logo.svg" alt={t('footerLogoAlt')} className={styles.logo} width={150} height={50} />

            <Image src="/media/ub1njcvy/logo-capita.png" alt={t('capitaLogoAlt')} title={t('capitaLogoTitle')} className={styles.capitaLogo} width={150} height={50} />

            <address className={styles.address}>
                <p>{t('collegeName')}</p>
                <p>{t('collegeAddress')}</p>
                <p>{t('collegePhone')}</p>
            </address>

            <div className={styles.socials}>
                {/* Add your social media links here */}
            </div>

            <nav className={styles.nav}>
                <a href="/contact-us/" className={styles.link}>{t('contactUs')}</a>
                <a href="/legal/" className={styles.link}>{t('legal')}</a>
                {/* Add more navigation links as needed */}
            </nav>

            <p className={styles.credit}>
                <a href="https://www.thinkology.co.uk" target="_blank">{t('createdWith')}</a>
            </p>

            <p className={styles.copyright}>
                © {new Date().getFullYear()} {t('copyrightText')}
            </p>
        </footer>
    );
};

export default Footer;
