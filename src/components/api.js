function Api() {

    const apiRoot = 'https://todo.pohy.eu';

    // Provádění GET požadavku
    fetch(apiRoot)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Úspěšná odpověď
        console.log('GET Request Successful');
        console.log('Response Data:', data);
    })
    .catch(error => {
        // Chyba
        console.error('GET Request Failed', error);
    });
}



export default Api