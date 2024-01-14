import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function Test2() {
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    const imageUrl = 'https://projectkeita.blob.core.windows.net/images/top.jpg';

    axios.get(imageUrl, { responseType: 'arraybuffer' })
      .then(response => {
        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        setBase64Image(base64);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, []);

  return (
    <div>
      {base64Image && <Image src={`data:image/jpeg;base64,${base64Image}`} alt="Image from Azure Blob Storage" width={500} height={300} />}
      <i className="fas fa-check"></i>
    </div>
  );
}
