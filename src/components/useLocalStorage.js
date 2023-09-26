import { useEffect, useState } from "react";


function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
      const tasks = localStorage.getItem(key);
      return tasks ? JSON.parse(tasks) : initialValue;
  });

  const setValue = (value) => {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value)
  }

  useEffect(() => {
    setValue(storedValue)
  })

  return [storedValue, setValue]  
}

export default useLocalStorage;