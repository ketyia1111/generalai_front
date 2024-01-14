import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>絵日記作成サイト</h1>
      <div onClick={toggleMenu} className={styles.menuToggle}>
        <i className={`fas fa-${isOpen ? 'times' : 'bars'}`}></i>
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
        <li>
          <Link href="/">投稿</Link>
        </li>
        <li>
          <Link href="/list">投稿内容一覧</Link>
        </li>
        <li>
          <Link href="/blog">Blog一覧</Link>
        </li>
        <li>
          <Link href="/contact">コンタクト</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
