import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/');
        console.log("response: ", response)
        setData(response.data);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
  };

  return (
      <div>
          <h1>API GET Request Example</h1>
              <button onClick={fetchData}>Get Data</button>
              <div>
                  {data ?(
                    <>
                  <h2>Title: {data.title}</h2>
                  <p>Body: {data.body}</p></>) : (<div>로딩중입니다...</div>)
                  }

              </div>
      </div>
  );}

export default App;