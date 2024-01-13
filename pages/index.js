// pages/index.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [formState, setFormState] = useState({ 
    gender: '', 
    age: '', 
    todaysEvent: '', 
    memorableThing: '', 
    oneWord: '' 
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // NULLチェック
    for (let key in formState) {
      if (formState[key] === '') {
        alert("入力されていない項目があります");
        return;
      }
    }

    const response = await fetch('http://localhost:5000/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    });
    const data = await response.json();
    console.log(data);
    router.push('/confirm');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="0"
              checked={formState.gender === '0'}
              onChange={handleChange}
            />
            男性
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="1"
              checked={formState.gender === '1'}
              onChange={handleChange}
            />
            女性
          </label>
        </div>
        <select
          name="age"
          value={formState.age}
          onChange={handleChange}
        >
          <option value="">年齢を選択</option>
          <option value="0~10">0-10</option>
          <option value="10">10-20</option>
          <option value="20">20-30</option>
          <option value="30">30-40</option>
          <option value="40">40-50</option>
          <option value="50">50-60</option>
          <option value="60">60-70</option>
          <option value="70">70-80</option>
          <option value="80">80-90</option>
          <option value="90">90-100</option>
        </select>
        <input
          type="text"
          name="todaysEvent"
          value={formState.todaysEvent}
          onChange={handleChange}
          placeholder="今日の出来事"
        />
        <input
          type="text"
          name="memorableThing"
          value={formState.memorableThing}
          onChange={handleChange}
          placeholder="特に印象に残っていること"
        />
        <input
          type="text"
          name="oneWord"
          value={formState.oneWord}
          onChange={handleChange}
          placeholder="一言で表すと"
        />
        <button type="submit">送信</button>
      </form>
    </div>
  );
}
