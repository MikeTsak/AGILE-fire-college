import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import LoadingFire from './components/LoadingFire';
import Logo from './components/Logo';
import { useTranslation } from 'react-i18next';

const Custom404 = () => {
    const { t } = useTranslation();
    
    return (
        <div className="container">
        <Head>
            <title>{t('pageNotFound')}</title>
        </Head>
            <Logo />
            <h1 className='aboutMainHeader'>{t('pageNotFound')}</h1>
            <p className='collegenameForPage'>{t('pageNotFoundDescription')}</p>
            <br />
            <Link href="/">
                <h2 className='collegenameForPage'>{t('goBackHome')}</h2>
            </Link>

            <LoadingFire mode="animationOnly" />

            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    text-align: center;
                    position: relative;
                    background: #f5f5f5;
                }

                .fire {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    height: 100px;
                    width: 200px;
                }

                .flame {
                    position: absolute;
                    bottom: 0;
                    border-radius: 50%;
                    background: red;
                    opacity: 0.9;
                    animation: flicker 1s infinite;
                    width: 100px;
                    height: 100px;
                }

                .flame:nth-child(2) {
                    background: orange;
                    animation-delay: 0.2s;
                    height: 80px;
                    width: 80px;
                    bottom: 20px;
                }

                .flame:nth-child(3) {
                    background: yellow;
                    animation-delay: 0.4s;
                    height: 60px;
                    width: 60px;
                    bottom: 40px;
                }

                .flame:nth-child(4) {
                    background: white;
                    animation-delay: 0.6s;
                    height: 40px;
                    width: 40px;
                    bottom: 60px;
                }

                @keyframes flicker {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }

                h1 {
                    font-size: 2em;
                    margin-bottom: 0.5em;
                }

                p {
                    margin-bottom: 1em;
                }

                a {
                    color: #0070f3;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                a:hover {
                    color: #0056b3;
                }
                .aboutMainHeader {
                    color: var(--red01);
                    font-family: 'Roboto Condensed', sans-serif;
                    font-weight: bold;
                    text-transform: uppercase;
                    line-height: 1;
                    font-size: 120px;
                  }
                  .collegenameForPage {
                    font-family: 'Sofia Sans Semi Condensed', sans-serif;
                    font-size: 30px;
                    color: black;
                    margin: 0 0 0px 0px;
                    font-weight: 600;
                    font-style: normal;
                  }
            `}</style>
        </div>
    );
}

export default Custom404;
