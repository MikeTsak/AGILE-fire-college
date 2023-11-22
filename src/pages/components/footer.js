// Footer.js
import Image from 'next/image';
import styles from '../../styles/Footer.module.css'; // Update the path as needed

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Image src="/images/logo.svg" alt="Fire Service College" className={styles.logo} width={150} height={50} />

            <Image src="/media/ub1njcvy/logo-capita.png" alt="Capita" title="Capita" className={styles.capitaLogo} width={150} height={50} />

            <address className={styles.address}>
                <p>The Fire Service College</p>
                <p>London Road, Moreton-in-Marsh, Gloucestershire, GL56 0RH</p>
                <p>+44 (0)1608 650 831</p>
            </address>

            <div className={styles.socials}>
                {/* Add your social media links here */}
            </div>

            <nav className={styles.nav}>
                <a href="/contact-us/" className={styles.link}>Contact Us</a>
                <a href="/legal/" className={styles.link}>Legal</a>
                {/* Add more navigation links as needed */}
            </nav>

            <p className={styles.credit}>
                <a href="https://www.thinkology.co.uk" target="_blank">created with Thinkology®</a>
            </p>

            <p className={styles.copyright}>
                © {new Date().getFullYear()} Fire Service College Limited. All rights reserved
            </p>
        </footer>
    );
};

export default Footer;
