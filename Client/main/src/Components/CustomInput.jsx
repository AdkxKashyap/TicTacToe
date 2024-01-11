import React from "react";
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";

const inputContainerClasses = "bg-purple-300";
function CustomInput() {
    const { handleSubmit } = useMessageInputContext();
    return (
        <div className={`${inputContainerClasses} str-chat__input-flat str-chat__input-flat--send-button-active`}>
            <div className="str-chat__input-flat-wrapper">
                <div className="str-chat__input-flat--textarea-wrapper">
                    <ChatAutoComplete />
                </div>
                <button onClick={handleSubmit}> Send Message</button>
            </div>
        </div>
    );
}

export default CustomInput;
