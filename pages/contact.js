import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Contact.module.css';

const TwitterProfile = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = process.env.NEXT_PUBLIC_TWITTER_WIDGETS_URL;
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <Navbar />
            <h2 className={styles.text}>X(Twiter)をやってます！<br/>よかったらフォローお願いします</h2>
            <div className={styles.content}>
                <a className="twitter-timeline" data-width="500" data-height="400" href={process.env.NEXT_PUBLIC_TWITTER_PROFILE_URL}>Tweets by keita38992370</a>
            </div>
        </div>
    );
};

export default TwitterProfile;
