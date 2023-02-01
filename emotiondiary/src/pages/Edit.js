import { useNavigate, useSearchParams } from "react-router-dom";

const Edit =() => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const id = searchParams.get("id");
    console.log("id : ", id);

    const mode = searchParams.get("mode");
    console.log("mode : ",mode);

    return (
        <div>
            <h3>Edit</h3>
            <p>이곳은 Edit 입니다</p>
            <button onClick={()=> setSearchParams({who: "KIM"})}>
                QS바꾸기
            </button>

            <button 
            onClick={()=> {
                navigate("/home");
            }}>
                Home으로 가기
            </button>
            <button onClick={()=>{
                navigate(-1);
            }}>
                뒤로가기
            </button>
        </div>
    );
};

export default Edit;