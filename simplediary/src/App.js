import { useEffect, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res)=>res.json());
    
    const initData = res.slice(0,20).map((it)=>{
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5)+1,
        created_date : new Date().getTime(),
        id : dataId.current++
      }
      
    })

    setData(initData);
  };
//app 컴포넌트가 mount되자마자 호출
//방법: useEffect에 array에 빈배열을 전달하면 콜백함수는 앱 컴포넌트는
//mount되자마자 호출된다.
  useEffect(()=>{
    getData();
  },[])

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current,
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`)
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  }

  const onEdit = (targetId,newContent) =>{
    setData(
      data.map((it) =>
       it.id === targetId ? {...it, content:newContent}: it
       )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
