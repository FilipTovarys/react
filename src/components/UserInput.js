import "./UserInput.css"
import { useState } from "react"


function Input(props) {

    const [inputValue, setInputValue] = useState("")

    function handleInput(textvalue) {
        setInputValue(textvalue.target.value);
    }

    function handleEnter(event) {
        if (event.key === "Enter") {
            props.handleInput(inputValue);
            setInputValue("")
        }
    }

    return (
        <div>
            <input 
                id="input"
                type="text" 
                value={inputValue} 
                onChange={handleInput}
                onKeyDown={handleEnter}
                placeholder="Add task"
            />
        </div>
    )
}

export default Input