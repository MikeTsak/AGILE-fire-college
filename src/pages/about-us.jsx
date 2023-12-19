import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Logo from './components/Logo';
import ContactUs from './components/ContactUs';

import styles from '../styles/AboutUs.module.css';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Head from 'next/head';

const About = () => {
  const { t } = useTranslation();

  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [ ref3, inView3 ] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInLeftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };
  const fadeInVariant = {
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, x: -100 },
  };

  return (
    <div>
      <Head>
        <title>{t('AboutHeaderMeta')}</title>
        <meta name="description" content={t('AboutTextP1')} />
        <meta name="keywords" content={'Πυροσβεστικό Σώμα Ελλαδας, Fire Department Training Center, Κέντρο Εκπαίδευσης Πυροσβεστικού Σώματος'} />
        <meta name="author" content={t('collegeName')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <Logo />
      {/* TOP */}
      <div className={styles.aboutHeaderContainer}>
        <div className={styles.aboutHeaderContainerForText}>
        <div className={styles.aboutHeaderText}>
          <h2 className={styles.aboutSubHeader}>{t('AboutUs')}</h2>
          <h1 className={styles.aboutMainHeader}>{t('AboutHeader')}</h1>
        </div>
        </div>
        <div className={styles.aboutHeaderImage}>
          <Image
            src="/images/fireman-about.png"
            alt="Firefighter"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
      {/* About */}
      <div className={styles.redContainer}>
        <h2 className={styles.redContainerHeader}>{t('AboutHeaderP1')}</h2>
        <p className={styles.aboutMainText}>{t('AboutTextP1')}</p>
        <br />
        <p className={styles.aboutMainText}>{t('AboutTextP2')}</p>
        <br />
        <p className={styles.aboutMainText}>{t('AboutTextP3')}</p>
        <br />
        <p className={styles.aboutMainText}>{t('AboutTextP4')}</p>
        <br />
        <p className={styles.aboutMainText}>{t('AboutTextEnd')}{t('collegeName')}</p>
        <br />
        <b className={styles.aboutMainText}>{t('AboutTextSignature')}</b>
      </div>
      {/* People */}
      <div className={styles.leadingSection}>
      <motion.div
          ref={ref1}
          initial="hidden"
          animate={inView1 ? 'visible' : 'hidden'}
          variants={fadeInLeftVariant}
          className={styles.imageWrapper}
        >
          <Image
            src="/images/Leader.JPG" // Change to the path of your image
            alt="Firefighters Training"
            layout="responsive"
            width={700} // Adjust according to your aspect ratio
            height={400} // Adjust according to your aspect ratio
          />
        </motion.div>
        <motion.div
          ref={ref1}
          initial="hidden"
          animate={inView1 ? 'visible' : 'hidden'}
          variants={fadeInLeftVariant}
          className={styles.textWrapper}
        >
          <h1 className={styles.leadingTitle}>{t('OurDirector')}</h1>
          <h2 className={styles.aboutSubHeader}>{t('DirectorName')}</h2>
          <h3 className={styles.aboutSubHeader2}>{t('DirectorTitle')}</h3>
          <br />
          <p className={styles.leadingText}>
            {t('AboutDirector')}
          </p>
        </motion.div>
      </div>
      <div className={styles.leadingSection}>
      <motion.div
          ref={ref2}
          initial="hidden"
          animate={inView2 ? 'visible' : 'hidden'}
          variants={fadeInRightVariant }
          className={styles.imageWrapper}
        >
          <h1 className={styles.leadingTitle}>{t('OurTeacher')}</h1>
          <h2 className={styles.aboutSubHeader}>{t('TeacherName')}</h2>
          <h3 className={styles.aboutSubHeader2}>{t('TeacherTitle')}</h3>
          <br />
          <p className={styles.leadingText}>
            {t('AboutTeacher')}
          </p>
        </motion.div>        
        <motion.div
          ref={ref2}
          initial="hidden"
          animate={inView2 ? 'visible' : 'hidden'}
          variants={fadeInRightVariant }
          className={styles.textWrapper}
        >
          <Image
            src="/images/Teatcher.webp" // Change to the path of your image
            alt="Firefighters Training"
            layout="responsive"
            width={700} // Adjust according to your aspect ratio
            height={400} // Adjust according to your aspect ratio
          />
        </motion.div>
      </div>
      {/* About */}
      <div className={styles.redContainer}>
        <h2 className={styles.redContainerHeader}>{t('AboutTextTitle2')}</h2>
        <br />
        <p className={styles.aboutMainText}>{t('AboutText2P1')}</p>
        <br />
        <p className={styles.aboutMainText}>{t('AboutText2P2')}</p>
      </div>
      {/* About With Image Backgrond */}
      <motion.div
      ref={ref3}
      initial="hidden"
      animate={inView3 ? 'visible' : 'hidden'}
      variants={fadeInVariant}
      className={styles.networkingSection}
    >
      <div className={styles.networkingContent}>
        <h2 className={styles.leadingTitle}>{t('AnotherTitle3')}</h2>
        <p className={styles.networkingText}>
          {t('AnotherText3')}
        </p>
      </div>
    </motion.div>
      <ContactUs />
      <Footer />
    </div>
  );
}

export default About;
