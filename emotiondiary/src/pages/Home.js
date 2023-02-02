import { useContext, useEffect, useState } from "react";

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";
const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    // 날짜를 저장하는 state - curdate를 useState안에 넣음
    const [curDate, setCurDate] = useState(new Date());

    //월은 getMonth를하면 0이기때문에 +1일을 붙힘
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

    //현재 월에 해당하는 일기를 뽑아내야하기 때문에 useEffect사용
    //useeffect로 curdate가 변화하는 순간에만 다이어리 리스트에서 해당월에해당하는 일기만뽑아옴
    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1 //1일을 지칭함
            ).getTime();

            //해당월에 마지막일자를 나타냄
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0
            ).getTime();

            setData(
                diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
        }
    }, [diaryList, curDate]);

    //dataState가 바뀔때마다 console을 출력시킴
    useEffect(() => {
        console.log(data);
    }, [data])

    //월을 하나씩늘리는 함수
    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        );
    };

    //월을 하나씩줄이는 함수
    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        );
    };

    return (
        <div>
            <MyHeader headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
                rightChild={<MyButton text={">"} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;