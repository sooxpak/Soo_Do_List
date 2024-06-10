import TinyItem from "./TinyItem";

const TinyList = ({items, onDelete, setDoneItems, updateItemColor}) => {
    return (
        <div className="list">
            {items ? (
                items.map((item, id) => (
                    <TinyItem key={id} item={item} onDelete={onDelete} setDoneItems={setDoneItems} updateItemColor={updateItemColor}/>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default TinyList;
