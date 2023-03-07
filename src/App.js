import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import Details from './components/Details';

function App() {
  const [data, SetData] = useState([]);
  const [loading, SetLoading] = useState(false);
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
      let newdata = data.map((item) => {
        return { ...item, active: false };
      })
      SetData(newdata)
    }
    try {
      setTimeout(fetchData(), 3000);
    }
    catch (e) { console.error(e) }
  }, [])

  useEffect(() => {
    
    async function fetchData() {
      SetLoading(true);
      try {
        let id = objView.id;
        let url = `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${id}.json`;
        const response = await fetch(url);
        if (!response.ok) { throw new Error(response.statusText) }
        else {
          const objforview = await response.json();
          SetObjView({
            id: id,
            objdata: objforview,
          })        
        }      
      }
      catch (e) { console.error(e) }
      finally { SetLoading(false) }
    }
    fetchData();
  }, [objView.id]) 


  function updateStates(e, id) {
    updateObjView(e, id);
    updateData(e, id);
  }

  const updateData = (e, id) => {
    e.preventDefault();
    let updatedData = [{
      id: '',
      name: '',
      active: false
    }];

    let indid = data.findIndex(obj => obj.id === id);
    let indtrue = data.findIndex(obj => obj.active === true);
    updatedData = [...data];
    if (indtrue < 0) {
      updatedData[indid] = { id: data[indid].id, name: data[indid].name, active: true }
    }
    else {
      updatedData[indtrue] = { id: data[indtrue].id, name: data[indtrue].name, active: false };
      updatedData[indid] = { id: data[indid].id, name: data[indid].name, active: true };
    }
    SetData(updatedData);
  }

  const updateObjView = (e, id) => {
    e.preventDefault();
    SetObjView((prevObjView) => {
      if (prevObjView.id === id) {
        return prevObjView
      }
      else
        return {
          id: id,
          objdata: '',          
        }
    })
  }

  const handleClick = async (e, id) => {
    e.preventDefault();    
    updateStates(e, id);
  }

  if (objView.objdata === '') {
    return <List onClick={handleClick} data={data} />
  }
  else {
    return (
      <div className='container'>
        <List  onClick={handleClick} data={data} />        
        <Details obj={objView.objdata} loading={loading} />
      </div>
    )
  };
}

export default App;


