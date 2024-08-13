import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
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
      </div>
  );}

export default App;