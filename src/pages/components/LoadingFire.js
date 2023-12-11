import React, { useEffect, useState } from 'react';
import styles from '../../styles/LoadingFire.module.css'; // Update the import path as needed

const LoadingFire = ({ mode = "animationOnly" }) => {
    const [loadingText, setLoadingText] = useState('Loading .');

    useEffect(() => {
        if (mode === "animationAndText") {
            const interval = setInterval(() => {
                setLoadingText(prev => {
                    if (prev === 'Loading .') return 'Loading ..';
                    if (prev === 'Loading ..') return 'Loading ...';
                    return 'Loading .';
                });
            }, 500); // Change the speed of the text change as needed

            return () => clearInterval(interval);
        }
    }, [mode]);

    return (
        <>
        <div className={`${styles.fire} ${mode === "animationAndText" ? styles.centered : ''}`}>

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
        {mode === "animationAndText" && <p className={styles.loadingText}>{loadingText}</p>}
        </>
    );
}

export default LoadingFire;
