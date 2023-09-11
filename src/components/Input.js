import { useState } from "react"


function Input(props) {

    const [inputValue, setInputValue] = useState("")

    function handleInput(textvalue) {
        setInputValue(textvalue.target.value);
    }

    function handleEnter(event) {
        if (event.key === "Enter") {
            props.handleInput(inputValue);
            props.showtask(true);
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
            />
        </div>
    )
}

export default Input