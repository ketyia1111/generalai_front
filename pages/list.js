import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/List.module.css';
import Navbar from '../components/Navbar';
import Image from 'next/image';  // 追加

const ListPage = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('ja-JP', options).format(new Date(dateString));
    };

    const fetchData = async (page) => {
        const result = await axios.get(`https://projectprojectkeita.azurewebsites.net/api/list/${page}`);  // あなたのAPIエンドポイントに変更してください
        setItems(result.data.items);
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);  // currentPageを依存配列に追加

    return (
        <div>
            <Navbar />
            <div className={styles.post}>
                <h1>投稿日記一覧画面</h1>
                {items.map((item) => (
                    <div key={item.id} className={styles.post}>
                        <h3>{formatDate(item.created_at)} {item.username}さんの投稿</h3>
                        <Image src={`https://projectkeita.blob.core.windows.net/images/${item.image_name}`} alt="Diary image" width={500} height={300} />  {/* <img>タグを<Image>コンポーネントに置き換え、widthとheightを指定 */}
                        <p className={styles.text}>{item.diaries}</p>
                        <hr/>
                    </div>
                ))}
                {currentPage > 1 && (
                    <button onClick={() => fetchData(currentPage - 1)}>前へ</button>
                )}
                {items.length === 10 && (
                    <button onClick={() => fetchData(currentPage + 1)}>次へ</button>
                )}
            </div>
        </div>
    );
};

export default ListPage;
