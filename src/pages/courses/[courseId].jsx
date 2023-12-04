//[courseId].jsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Logo from '../components/Logo';
import styles from '../../styles/Course.module.css';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CourseItemDetail = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { courseId } = router.query;
  const [courseItem, setCourseItem] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

  const fadeInVariant = {
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, x: -100 },
  };
  const fadeInLeftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    const fetchCourseItem = async () => {
      try {
        const response = await axios.get(`${apiUrl}/firedep/courses/${courseId}`);
        setCourseItem(response.data);
      } catch (error) {
        console.error('Error fetching course item:', error);
      }
    };

    if (courseId) {
      fetchCourseItem();
    }
  }, [courseId]);

  const renderTemplate = () => {
    switch (courseItem.templateType) {
      case '1':
        return renderTemplateType1();
      case '2':
        return renderTemplateType2();
      case '3':
        return renderTemplateType3();
      default:
        return <p>Invalid template type</p>;
    }
  };

  const renderVideo = () => {
    if (!courseItem.videoURL) return null;
    const videoId = courseItem.videoURL.split('v=')[1];
    const embedURL = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div className={styles.videoContainer}>
        <iframe
          width="560"
          height="315"
          src={embedURL}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
//   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~renderTemplateType1~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const renderTemplateType1 = () => {
    // Adjust the following to match your data structure and desired layout
    return (
    <>
      <div className={styles.newsItemDetailContainer} >
            <div className={styles.aboutHeaderText}>
            <h2 className={styles.aboutSubHeader}>{t('Courses')}</h2>
            <h1 className={styles.aboutMainHeader}>{courseItem.title}</h1>
            <h2 className={styles.aboutSubHeader}>{courseItem.subTitle}</h2>
        </div>
        <div className={styles.newsImageContainer}>
        <img
                src={`data:image/jpeg;base64,${courseItem.image}`}
                alt="Image1"
                layout="fill"
                objectFit="cover"
                priority
                className={styles.newsImage}
        />
        </div>
        <div className={styles.Overview}>
            <div className={styles.OverviewStats}>
                <h2>{t('Length')}</h2>
                <p className={styles.BlueWow}>{courseItem.length}</p>
                <h2>{t('Sectors')}</h2>
                <p className={styles.BlueWow}>{courseItem.sectors}</p>
            </div>
            <div className={styles.OverviewText}>
                <h2 className={styles.newsTitle}>{t('CourseOverview')}</h2>
                <p>{courseItem.overview}</p>
            </div>
        </div>
        </div>
        <div className={styles.courseItemDetailContainer}>
            {/* Content With Image Backgrond */}
            <motion.div
            ref={ref3}
            initial="hidden"
            animate={inView3 ? 'visible' : 'hidden'}
            variants={fadeInVariant}
            className={styles.networkingSection}
            style={{ backgroundImage: `url(${`data:image/jpeg;base64,${courseItem.image2}`})` }}
            >
            <div className={styles.networkingContent}>
                <p className={styles.networkingText}>
                {courseItem.content}
                </p>
            </div>
            </motion.div>


            <div className={styles.redContainer}>
                <h2 className={styles.redContainerHeader}>{t('Welcome')}</h2>
                <p className={styles.aboutMainText}>{courseItem.content2}</p>
                <br />
            </div>

        <div className={styles.leadingSection}>
        <motion.div
          ref={ref2}
          initial="hidden"
          animate={inView2 ? 'visible' : 'hidden'}
          variants={fadeInRightVariant }
          className={styles.imageWrapper}
        >
          <h1 className={styles.leadingTitle}>{courseItem.accreditations}</h1>
          <p className={styles.leadingText}>
            {courseItem.content3}
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
            src={`data:image/jpeg;base64,${courseItem.image3}`}
            alt="Firefighters Training"
            layout="responsive"
            width={700} 
            height={400} 
          />
        </motion.div>
        </div>
      </div>
      </>
    );
  };

  //~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~renderTemplateType2~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const renderTemplateType2 = () => {
    // Adjust the following to match your data structure and desired layout
    return (
      <>
      <div className={styles.newsItemDetailContainer} >
            <div className={styles.aboutHeaderText}>
            <h2 className={styles.aboutSubHeader}>{t('Courses')}</h2>
            <h1 className={styles.aboutMainHeader}>{courseItem.title}</h1>
            <h2 className={styles.aboutSubHeader}>{courseItem.subTitle}</h2>
        </div>
        <div className={styles.newsImageContainer}>
        <img
                src={`data:image/jpeg;base64,${courseItem.image}`}
                alt="Image1"
                layout="fill"
                objectFit="cover"
                priority
                className={styles.newsImage}
        />
        </div>
        <div className={styles.Overview}>
            <div className={styles.OverviewStats}>
                <h2>{t('Length')}</h2>
                <p className={styles.BlueWow}>{courseItem.length}</p>
                <h2>{t('Sectors')}</h2>
                <p className={styles.BlueWow}>{courseItem.sectors}</p>
            </div>
            <div className={styles.OverviewText}>
                <h2 className={styles.newsTitle}>{t('CourseOverview')}</h2>
                <p>{courseItem.overview}</p>
            </div>
        </div>
        </div>


        <div className={styles.redContainer}>
                <h2 className={styles.redContainerHeader}>{courseItem.accreditations}</h2>
                <p className={styles.aboutMainText}>{courseItem.content}</p>
                <br />
        </div>


      </>
    );
  };

  //~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~renderTemplateType3~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const renderTemplateType3 = () => {
    // Adjust the following to match your data structure and desired layout
    return (
      <>
      <div className={styles.newsItemDetailContainer} >
            <div className={styles.aboutHeaderText}>
            <h2 className={styles.aboutSubHeader}>{t('Courses')}</h2>
            <h1 className={styles.aboutMainHeader}>{courseItem.title}</h1>
            <h2 className={styles.aboutSubHeader}>{courseItem.subTitle}</h2>
        </div>
        <div className={styles.newsImageContainer}>
        <img
                src={`data:image/jpeg;base64,${courseItem.image}`}
                alt="Image1"
                layout="fill"
                objectFit="cover"
                priority
                className={styles.newsImage}
        />
        </div>
        <div className={styles.Overview}>
            <div className={styles.OverviewStats}>
                <h2>{t('Length')}</h2>
                <p className={styles.BlueWow}>{courseItem.length}</p>
                <h2>{t('Sectors')}</h2>
                <p className={styles.BlueWow}>{courseItem.sectors}</p>
            </div>
            <div className={styles.OverviewText}>
                <h2 className={styles.newsTitle}>{t('CourseOverview')}</h2>
                <p>{courseItem.overview}</p>
            </div>
        </div>
        </div>

        <div className={styles.redContainer}>
                <h2 className={styles.redContainerHeader}>{courseItem.accreditations}</h2>
                <p className={styles.aboutMainText}>{courseItem.content}</p>
                <br />
        </div>

        <motion.div
            ref={ref3}
            initial="hidden"
            animate={inView3 ? 'visible' : 'hidden'}
            variants={fadeInVariant}
            className={styles.networkingSection}
            style={{ backgroundImage: `url(${`data:image/jpeg;base64,${courseItem.image2}`})` }}
            >
            <div className={styles.networkingContent}>
                <p className={styles.networkingText}>
                {courseItem.content2}
                </p>
            </div>
          </motion.div>
      </>
    );
  };

  if (!courseItem) {
    return <div>Loading...</div>;
  }
  return (
    <> 
      <Logo />
      <Navbar />
      <div className={styles.courseItemDetailContainer}>
        {renderTemplate()}
        <div className={styles.newsItemDetailContainer}>
          {renderVideo()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseItemDetail;
