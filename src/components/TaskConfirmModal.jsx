const TaskConfirmModal= ({handleTaskConfirmClick, handleTaskcancelClick}) => {

    return (
        <>
            <div className="confirm_modal">
                <p>Are you done?</p>
                <div className="button_wrap">
                    <button onClick={handleTaskcancelClick}>Not yet</button>
                    <button onClick={handleTaskConfirmClick}>Yes I'm done</button>
                </div>
            </div>
            <div className="dimmed"></div>
        </>
    );
}

export default TaskConfirmModal;


