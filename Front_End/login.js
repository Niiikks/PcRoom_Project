async function login() {
    const response = await fetch("http://localhost:3500/login", {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            name : document.getElementById('name').value,
            password : document.getElementById('password').value
        })
    })

    const data = await response.json()
    console.log(data);

    if (!response.ok) {
        console.error("Error fetching data:", response.status);
        return;
    }

    window.location.href= "http://localhost:3500/index.html";
}