const DoneConfirmModal= ({ handleDoneCancelClick, handleDoneConfirmClick}) => {

    return (
        <>
            <div className="confirm_modal">
                <p>Are you sure you want to delete?</p>
                <div className="button_wrap">
                    <button onClick={handleDoneCancelClick}>Cancel</button>
                    <button onClick={handleDoneConfirmClick}>Delete</button>
                </div>
            </div>
            <div className="dimmed"></div>
        </>
    );
}

export default DoneConfirmModal;


