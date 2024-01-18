import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';


export default function Home() {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [name, setName] = useState(''); // 名前のstateを追加

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://projectprojectkeita.azurewebsites.net/api/generalai');
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
      const response = await axios.post('https://projectprojectkeita.azurewebsites.net/api/generalai/complete', { name: name, text: textAreaValue });
      setTextAreaValue(response.data.example);
      if (response.data.example === "positive") {
        router.push('/positive');
    } else if (response.data.example === "negative") {
        router.push('/negative');
    } else {
        router.push('/mixed');
    }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2>日記をあなたの状況に合わせて修正してください</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">名前</label>
          <input type="text" className={`form-control ${styles.inputElement}`} id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="example" className={styles.labelText}>入力情報を元に日記を生成しました。修正してください</label>
          <textarea className={`form-control ${styles.inputElement}`} id="example" rows="10" value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)} />
          <button className={`btn btn-primary ${styles.submitButton}`} onClick={handleUpdate}>作成</button>
        </div>
      </div>
    </div>
  );
}
