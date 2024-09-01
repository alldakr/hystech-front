import './App.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const ws = useRef(null);

  const fetchData = async () => {
    try {
        const response = await axios.get('http://192.168.56.100:8000/hello/abc');
        console.log("response: ", response)
        setData(response.data);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
  };

  const postData = async () => {
    try {
      const payload = {
        title: "title_from_web",
        message: "message_from_web",
      };
      const response = await axios.post('http://192.168.56.100:8000/insert', payload);
      console.log("response: ", response)
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }
  useEffect(() => {
    const client_id = "front_client"; // 필요한 경우 고유한 ID로 설정
    ws.current = new WebSocket(`ws://localhost:8000/ws/front?client_id=${client_id}`);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && inputMessage.trim() !== '') {
      ws.current.send(inputMessage);
      setInputMessage('');
    }
  };

  return (
      <div>
          <h1>API GET Request Example</h1>
              <button onClick={fetchData}>Get Data</button>
              <div>
                  {data ?(
                    <>
                  <h2>Message: {data.message}</h2></>) : (<div>로딩중입니다...</div>)
                  }
              </div>
              <button onClick={postData}>Post Data</button>
              <div>
      <h1>WebSocket Client</h1>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>

      </div>
  );}

export default App;