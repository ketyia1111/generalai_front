import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [name, setName] = useState(''); // 名前のstateを追加

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/generalai');
        setTextAreaValue(response.data.example);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generalai/complete', { name: name,text: textAreaValue });
      setTextAreaValue(response.data.example);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="form-group">
            <label htmlFor="name">名前</label> {/* 名前の入力フィールドを追加 */}
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="example">入力情報を元に日記を生成しました。修正してください</label>
            <textarea className="form-control" id="example" rows="10" value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={handleUpdate}>作成</button>
        </div>
      </div>
    </div>
  );
}
