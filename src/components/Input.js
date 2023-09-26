import { useCallback } from "react";
import "./Input.css"


function Input(props) {
    const {passInput} = props;

    const handleEnter = useCallback(
        (event) => {
            if (event.key === "Enter") {
                let inputValue = event.target.value;
                passInput(inputValue);
                event.target.value = ""
            }
        }, [passInput]
    )
        

    return (
        <div>
            <input 
                id="input"
                type="text" 
                onKeyDown={handleEnter}
                placeholder="Add task"
            />
        </div>
    )
}

export default Input