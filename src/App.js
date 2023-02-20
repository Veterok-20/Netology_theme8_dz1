import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import Details from './components/Details';

function App() {
  const [data, SetData] = useState([]);
  const [objView, SetObjView] = useState({
    id: '',    
    objdata: '',
  })
  const url = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json';  
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      if (!response.ok) { throw new Error(response.statusText) }
      const data = await response.json();
      console.log('from useEffec data=', data);
      SetData(data)
    }
    try {
      fetchData();
    }
    catch (e) { console.error(e) }
  }, [])


  useEffect(() => {
    async function fetchData() {
      let id = objView.id;
      let url = `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${id}.json`;
      const response = await fetch(url);
      if (!response.ok) { throw new Error(response.statusText) }
      const objforview = await response.json();
      console.log('from useEffect2 objView=', objforview);

      SetObjView({
        id: id,       
        objdata: objforview,
      })
    }
    try {
      fetchData();
    }
    catch (e) { console.error(e) }
  }, [objView.id])


  const handleClick = async (e, id) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'salmon';
    e.currentTarget.style.color = 'white';
    SetObjView({
      id: id,
      loading: true,
      objdata: '',
    })

  }  

  if (objView.id === '') {  
    return <List onClick={handleClick} data={data} />     
  }
  else {
    return (
      <div className='container'>
        <List onClick={handleClick} data={data} />
        <Details obj={objView.objdata} />
      </div>
    )
  };
}

export default App;
