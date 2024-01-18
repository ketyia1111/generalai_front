// pages/complete.js
import Link from 'next/link';
import styles from '../styles/Home3.module.css';
import Navbar from '../components/Navbar';

export default function Complete() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <p className={styles.message}>登録ありがとうございます。
          <br />今日はあまり良くない日だったんですね。明日はきっといい日になります！<br />
          早速投稿された絵日記を確認しに行きましょう
        </p>
        <Link href="/list">
          <div className={styles.button}>絵日記一覧へ</div>
        </Link>
      </div>
    </div>
  );
}
