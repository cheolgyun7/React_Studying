import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //page를이동시켜주는 react-router-dom
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "./../App.js"
import { getStringDate } from "../util/date";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

//감정에 대한 데이터 배열이 필요함
const emotionList = [
    {
        emotion_id: 1,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: "완전 좋음"
    },
    {
        emotion_id: 2,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript: "좋음"
    },
    {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript: "그럭저럭"
    },
    {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript: "나쁨"
    },
    {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_descript: "끔찍함"
    },
]


const DiaryEditor = ({ isEdit, originData }) => {

    const contentRef = useRef(); //유저레퍼런스 객체를 미리 만들어 놓음
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date())); //input date를 state로 핸들링

    const { onCreate, onEdit } = useContext(DiaryDispatchContext);
    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        if (window.confirm(isEdit ? "일기를 수정하시겠습니까" : "새로운 일기를 작성하시겠습니까?")) {
            if (!isEdit) {
                onCreate(date, content, emotion);
            } else {
                onEdit(originData.id, date, content, emotion);
            }
        }
        onCreate(date, content, emotion);
        navigate("/", { replace: true })
    };

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData])

    return (
        <div className="DiaryEditor">
            <MyHeader
                headerText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
                leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        {/* onchange가 발생했을때 이벤트 객체를 받아서 setdate를 받아서 */}
                        <input
                            className="input_date"
                            type="date" value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem key=
                                {it.emotion_id}
                                {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion} //선택이 된건지 안된건지 components에서 확인가능
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="오늘은 어땟나요??"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        {/* 뒤로가기 버튼은 navigate함수를 이용해 onclick했을때 -1이 되도록 */}
                        <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
                        {/* 작성완료는 positive */}
                        <MyButton
                            text={"작성완료"}
                            type={"positive"}
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
export default DiaryEditor;