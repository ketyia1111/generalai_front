import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Contact.module.css';

const TwitterProfile = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <Navbar />
            <h2 className={styles.text}>X(Twiter)をやってます！<br/>よかったらフォローお願いします</h2>
            <div className={styles.content}>
                <a className="twitter-timeline" data-width="500" data-height="400" href="https://twitter.com/keita38992370?ref_src=twsrc%5Etfw">Tweets by keita38992370</a>
            </div>
        </div>
    );
};

export default TwitterProfile;
