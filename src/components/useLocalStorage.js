import { useCallback, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const tasks = localStorage.getItem(key);
      return tasks ? JSON.parse(tasks) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    },
    [key]
  );

  return [storedValue, setValue];
}

export default useLocalStorage;
