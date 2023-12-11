import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/LoadingFire.module.css'; // Update the import path as needed

const LoadingFire = ({ mode = "animationOnly" }) => {
    const { t, i18n } = useTranslation();
    const [loadingText, setLoadingText] = useState('Loading .');

    useEffect(() => {
        if (mode === "animationAndText") {
            const interval = setInterval(() => {
                setLoadingText(prev => {
                    if (prev === t('Loading') + ' .') return t('Loading') + ' ..';
                    if (prev === t('Loading') + ' ..') return t('Loading') + ' ...';
                    return t('Loading') + ' .';
                });
            }, 500); // Change the speed of the text change as needed

            return () => clearInterval(interval);
        }
    }, [mode]);

    
    const getText = () => {
        switch (mode) {
            case "latestNews":
                return t('gettingLatestNews');
            case "latestCourses":
                return t('gettingLatestCourses');
            default:
                return loadingText;
        }
    };

    return (
        <>
         <div className={`${styles.fire} ${["animationAndText", "latestNews", "latestCourses"].includes(mode) ? styles.centered : ''}`}>

            <div className={styles.blur}>
                <div className={styles.fire__flame_big}></div>
            </div>
            <main className={styles.fire__spark}></main>
            <main className={styles.fire__spark}></main>
            <main className={styles.fire__spark}></main>
            <main className={styles.fire__spark}></main>
            <div className={styles.blur + ' ' + styles.fix}>
                <div className={styles.fire__flame}></div>
            </div>
            <div className={styles.fire__light}></div>
        </div>
        {["animationAndText", "latestNews", "latestCourses"].includes(mode) && <p className={styles.loadingText}>{getText()}</p>}
        </>
    );
}

export default LoadingFire;
