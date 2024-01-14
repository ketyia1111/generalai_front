import axios from 'axios';
import { useEffect, useState } from 'react';

const ListPage = () => {
  const [items, setItems] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('ja-JP', options).format(new Date(dateString));
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:5000/api/list/1');  // あなたのAPIエンドポイントに変更してください
      setItems(result.data.items);
    };

    fetchData();
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h2>{formatDate(item.created_at)} {item.username}さんの投稿</h2>
          <img src={`https://projectkeita.blob.core.windows.net/images/${item.image_name}`} alt="Diary image" />
          <p>{item.diaries}</p>
        </div>
      ))}
    </div>
  );
};

export default ListPage;
