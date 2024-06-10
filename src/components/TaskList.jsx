import TaskItem from "./TaskItem";

const TaskList = ({items, onDelete, setDoneItems, updateItemColor}) => {
    return (
        <div className="list">
            {items ? (
                items.map((item, id) => (
                    <TaskItem key={id} item={item} onDelete={onDelete} setDoneItems={setDoneItems} updateItemColor={updateItemColor}/>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default TaskList;
