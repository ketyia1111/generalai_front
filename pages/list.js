import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/List.module.css';
import Navbar from '../components/Navbar';
import Image from 'next/image';

const ListPage = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [base64Images, setBase64Images] = useState({});

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('ja-JP', options).format(new Date(dateString));
    };

    const fetchData = async (page) => {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_LIST_BASE_URL}/${page}`);
        setItems(result.data.items);
        setCurrentPage(page);
    };

    const fetchImage = async (imageName) => {
        const imageUrl = `${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${imageName}`;

        axios.get(imageUrl, { responseType: 'arraybuffer' })
            .then(response => {
                const base64 = Buffer.from(response.data, 'binary').toString('base64');
                setBase64Images(prevState => ({ ...prevState, [imageName]: base64 }));
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    useEffect(() => {
        items.forEach(item => {
            if (!base64Images[item.image_name]) {
                fetchImage(item.image_name);
            }
        });
    }, [items]);

    return (
            <div>
                <Navbar />
                 <div className={styles.post}>
                <h1>投稿日記一覧画面</h1>
                {items.map((item) => (
                    <div key={item.id} className={styles.post}>
                        <div className={styles.content}>
                            {base64Images[item.image_name] && <Image src={`data:image/jpeg;base64,${base64Images[item.image_name]}`} alt="Diary image" width={500} height={300} />}
                            <div className={styles.textContainer}>
                                <h3>{formatDate(item.created_at)} {item.username}さんの投稿</h3>
                                <p className={styles.text}>{item.diaries}</p>
                                <p className={styles.tag}>この記事は「{item.ana_result}」です。<br/>
                                肯定度「{item.ana_positive}」<br/>
                                中立度は「{item.ana_neutral}」<br/>
                                否定度は「{item.ana_negative}」</p>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
                <div className="buttons">
                {currentPage > 1 && (
    <button className={styles.button} style={{ marginRight: '10px' }} onClick={() => fetchData(currentPage - 1)}>前へ</button>
)}
{items.length === 10 && (
    <button className={styles.button} onClick={() => fetchData(currentPage + 1)}>次へ</button>
)}
</div>

            </div>
        </div>
    );
};

export default ListPage;
