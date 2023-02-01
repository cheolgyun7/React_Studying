import { useParams } from "react-router-dom";

const Diary =() => {

    const {id} = useParams();
    console.log(id);
    return (
        <div>
            <h3>Diary</h3>
            <p>이곳은 Diary 입니다</p>
        </div>
    );
};

export default Diary;