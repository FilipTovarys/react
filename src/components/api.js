const source = "https://todo.pohy.eu"

function deleteRequest() {
  fetch(source, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        console.log('Smazáno úspěšně.');
      } else {
        throw new Error('Chyba v DELETE požadavku');
      }
    })
    .catch(error => {
      console.error(error);
    });
}


function postRequest(newTask) {
  const postData = { title: newTask }

  fetch(source, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(response => {
      if (response.ok) {
        console.log('POST požadavek byl úspěšný.');
        return response.json()
      } else {
        console.error('Chyba při POST požadavku.');
      }
    })
    .then(data => {
      const id = data.id
      console.log("Id vloženého objektu:",id);
    })
    .catch(error => {
      console.error(error);
    });
}



export {postRequest, deleteRequest}
