import React, { useEffect, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";
import Image from 'next/image';


function UserList() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      // FlaskのAPIエンドポイントを指定します
      const apiEndpoint = 'https://projectprojectkeita.azurewebsites.net/test';
  
      fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error:', error));
    }, []);
  


    return (
        <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>年齢: {user.age}</p>
          <p>ID: {user.id}</p>
        </div>
      ))}
    </div>
    );
}

export default UserList;