import { useState } from "react"


function Input() {

    const [inputValue, setInputValue] = useState("")

    function handleInput(hovno) {
        console.log("změněno")
        setInputValue(hovno.target.value)
    }

    return (
        <div>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInput} 
            />
        </div>
    )
}

export default Input