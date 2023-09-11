import { useState } from "react"


function Input(props) {

    const [inputValue, setInputValue] = useState("")

    function handleInput(hovno) {
        setInputValue(hovno.target.value);
    }

    function handleEnter(event) {
        if (event.key === "Enter") {
            props.handleInput(inputValue)
        }
    }

    return (
        <div>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInput}
                onKeyDown={handleEnter} 
            />
        </div>
    )
}

export default Input