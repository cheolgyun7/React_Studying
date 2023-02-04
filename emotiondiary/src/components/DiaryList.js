
//value는 select가 어떤걸 선택하는지 onchange은 바꿀기능을위한 함수 
//optionlist는 select태그에 들어가는거

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from './MyButton';

const sortOptionList = [
    { value: "lastest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
    { value: "all", name: "모든 감정" },
    { value: "good", name: "좋은 감정" },
    { value: "bad", name: "안좋은 감정" },
];

//value는 filter의 값 onchange는 filter를 바꾸는 함수 list는 기능
const ControlMenu = ({ value, onChange, optionList }) => {
    return (
        <select className="ControlMenu"
            value={value}
            onChange={(e) =>
                onChange(e.target.value)}
        >
            {optionList.map((it, idx) =>
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            )}
        </select>
    );
};

const DiaryList = ({ diaryList }) => {
    const navigate = useNavigate();
    //정렬기준의 state를만듦(sortType)
    const [sortType, setSortType] = useState("lastest"); //초기값을 최신순인lastest로 설정
    const [filter, setFilter] = useState("all"); //초기값을 all으로 모든감정을 적용

    //최신순, 오래된순을 클릭햇을때 리스트내용이 바뀌어야 하기 때문에 함수적용
    const getProcessedDiaryList = () => {

        const filterCallBack = (item) => {
            if (filter === 'good') {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        }
        const compare = (a, b) => {
            if (sortType === 'lastest') {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };

        //diaryList(배열)를 JSON화 시켜서 문자열로 반환시키고 parse를시키면 다시 배열로 복구화
        const copyList = JSON.parse(JSON.stringify(diaryList));

        //filterlist로 all이라면 copyList를 반환하고 아니면 copylist에 filter를 적요한걸 반환한다
        const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it))

        const sortedList = filteredList.sort(compare);
        console.log(sortedList);
        return sortedList;

    }
    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton type={'positive'} text={'새 일기쓰기'} onClick={() => navigate("/new")} />
                </div>
            </div>
            {getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it}/>
                //{it.emotion}을 넣으면감정점수생김
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;