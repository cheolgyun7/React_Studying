import DiaryItem from './DiaryItem.js';
const DiaryList = ({ onDelete, diaryList }) => {
    console.log(diaryList);
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h3>{diaryList.length}개의 일기가 있습니다.</h3>
            <div>
                {diaryList.map((it) => (
                   <DiaryItem key={it.id} {...it} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;