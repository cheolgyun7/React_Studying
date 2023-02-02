
//value는 select가 어떤걸 선택하는지 onchange은 바꿀기능을위한 함수 
//optionlist는 select태그에 들어가는거

import { useState } from "react";

const sortOptionList = [
    {value:"lastest", name: "최신순"},
    {value:"oldest", name: "오래된 순"},
]

const ControlMenu = ({value, onChange, optionList}) =>{
    return (
    <select value={value} onChange={(e)=> onChange(e.target.value)}>
        {optionList.map((it,idx)=><option key={idx} value={it.value}>{it.name}</option>)}
    </select>
    );
};

const DiaryList = ({diaryList}) => {
     //정렬기준의 state를만듦(sortType)
     const [sortType, setSortType] = useState("lastest");
    return (
        <div>
            <ControlMenu 
            value={sortType} 
            onChange={setSortType}
            optionList={sortOptionList} 
            />
            {diaryList.map((it)=>(
                <div key={it.id}>{it.content}</div>
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;