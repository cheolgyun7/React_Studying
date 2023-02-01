import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';

//Components
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader headText={"App"}
          leftChild={<MyButton text={"왼쪽 버튼"}
            onClick={() => alert("왼쪽클릭입니다")} />
          }
          rightChild={<MyButton text={"오른쪽 버튼"}
          onClick={() => alert("오른쪽클릭입니다")} />
        }
        />
        <h2>app.js</h2>

        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
          type={"positive"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
          type={"negative"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/Edit' element={<Edit />} />
          <Route path='/Diary/id' element={<Diary />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
