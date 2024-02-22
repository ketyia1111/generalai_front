import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import styles from '../styles/BlogList.module.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [base64Images, setBase64Images] = useState({});

  const fetchData = async () => {
    const result = await axios.get(process.env.NEXT_PUBLIC_BLOGS_URL);
    setBlogs(result.data.blogs);
  };

  const fetchImage = async (imageName) => {
    const imageUrl = `${process.env.NEXT_PUBLIC_BLOGS_IMAGE_BASE_URL}/${imageName}`;

    axios.get(imageUrl, { responseType: 'arraybuffer' })
      .then(response => {
        const base64 = 
        Buffer.from(response.data, 'binary')
        .toString('base64');

        setBase64Images(prevState => 
            ({ ...prevState, [imageName]: base64 }));
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    blogs.forEach(blog => {
      if (!base64Images[blog.image_name]) {
        fetchImage(blog.image_name);
      }
    });
  }, [blogs]);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>My Blogs</h2>
        <div className={styles.blogList}>
          {blogs.map((blog) => (
            <div key={blog.id} className={styles.blogCard}>
              <h2 className={styles.blogTitle}>{blog.name}</h2>
              <div className={styles.imageContainer}>
                {base64Images[blog.image_name] 
                && <Image src={`data:image/jpeg;base64,
                ${base64Images[blog.image_name]}`} 
                alt={blog.name} layout="fill" objectFit="cover" />}
              </div>
              <p className={styles.blogDescription}>{blog.description}</p>
              <a href={blog.url} className={styles.blogLink}>Read more</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
