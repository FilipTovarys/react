function getTasksFromLS() {
    let storedTasksJSON = localStorage.getItem("tasks")
    if (storedTasksJSON === null) {
      return []
    } else {
      console.log(storedTasksJSON)
      let storedTasks = JSON.parse(storedTasksJSON)
      return storedTasks
    }
  }

export default getTasksFromLS