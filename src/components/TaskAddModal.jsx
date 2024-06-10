import "../style/Modal.css";
import EmojiPicker from "emoji-picker-react";
import {useState, useRef} from "react";

const TaskAddModal = ({handleModalClose, onCreate, type, setType, title, setTitle, description, setDescription}) => {
    const [showTaskPicker, setShowTaskPicker] = useState(false);
    const typeRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const onEmojiClick = (event, emojiObject) => {
        setTitle((prevInput) => prevInput + emojiObject.emoji);
        setShowTaskPicker(false);
    };

    const handleSubmit = () => {
        if (
            typeRef.current.value.trim().length > 0 &&
            titleRef.current.value.trim().length > 0 &&
            descriptionRef.current.value.trim().length > 0
        ) {
            onCreate(type, title, description);
            setType("");
            setTitle("");
            setDescription("");
        } else {
            if (typeRef.current.value.trim().length === 0) {
                typeRef.current.focus();
            } else if (titleRef.current.value.trim().length === 0) {
                titleRef.current.focus();
            } else if (descriptionRef.current.value.trim().length === 0) {
                descriptionRef.current.focus();
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <>
            <div className="add_modal">
                <div className="modal_top">
                    <p className="modal_title">Task</p>
                    <button className="close_btn" onClick={handleModalClose}></button>
                </div>
                <div className="modal_work_type">
                    <p>Type</p>
                    <input type="text" value={type} ref={typeRef} onChange={(e) => setType(e.target.value)}
                           onKeyDown={handleKeyDown}/>
                </div>
                <div className="modal_work_title">
                    <p>Title</p>
                    <input type="text" value={title} ref={titleRef} onChange={(e) => setTitle(e.target.value)}
                           onKeyDown={handleKeyDown}/>
                    <button className="emoji_button" onClick={() => setShowTaskPicker((val) => !val)}></button>
                    {showTaskPicker && (
                        <EmojiPicker pickerStyle={{width: "100%"}} onEmojiClick={onEmojiClick}/>
                    )}
                </div>
                <div className="modal_work_description">
                    <p>Description</p>
                    <textarea value={description} ref={descriptionRef} onChange={(e) => setDescription(e.target.value)}
                              onKeyDown={handleKeyDown}/>
                </div>
                <div className="submit_btn_wrap">
                    <button className="submit_btn" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className="dimmed"></div>
        </>
    );
};

export default TaskAddModal;
