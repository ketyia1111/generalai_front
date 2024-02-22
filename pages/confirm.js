import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';


export default function Home() {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false); // ローディング状態を追加

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_GENERAL_AI_URL);
        setTextAreaValue(response.data.example);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();

  const handleUpdate = async () => {
    try {
      setLoading(true); // ローディング開始
      const response = await axios.post(process.env.NEXT_PUBLIC_GENERAL_AI_COMPLETE_URL, { name: name, text: textAreaValue });
      setTextAreaValue(response.data.example);
      if (response.data.example === 'positive') {
        router.push('/positive');
      } else if (response.data.example === 'negative') {
        router.push('/negative');
      } else {
        router.push('/mixed');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2>日記をあなたの状況に合わせて修正してください</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            className={`form-control ${styles.inputElement}`}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="example" className={styles.labelText}>
            入力情報を元に日記を生成しました。修正してください
          </label>
          <textarea
            className={`form-control ${styles.inputElement}`}
            id="example"
            rows="10"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
          <button
            className={`btn btn-primary ${styles.submitButton2}`}
            onClick={handleUpdate}
            disabled={loading} // ローディング中はボタンを非活性に
          >
            {loading ? 'ローディング中...' : '作成'}
          </button>
        </div>
      </div>
    </div>
  );
}