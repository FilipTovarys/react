import { useCallback, useEffect, useState } from "react";


function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
      try {
        const tasks = localStorage.getItem(key);
        return tasks ? JSON.parse(tasks) : initialValue;
      } catch (error) {
        console.error(error)
        return initialValue
      }
      
  });

  const setValue = useCallback(
    (value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value)
      } catch (error) {
        console.error(error)
      }
    },[key])

  useEffect(() => {
    setValue(storedValue)
  },[storedValue, setValue])

  return [storedValue, setValue]  
}

export default useLocalStorage;