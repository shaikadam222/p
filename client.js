function postcode() {
    const code = document.getElementById('code').value;
    const input = document.getElementById('input').value;

    
    const backendUrl = "http://localhost:3000/";

    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, input }),
    })
        .then((resp) => {
            resp.text().then((data) => {
                document.getElementById('output').innerText = data.stdout;
                console.log('Output from backend:', data.stdout);
                console.log('Error from backend:', data.stderr);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
