async function hello() {
    const response = await fetch("http://localhost:3500/users", {
        method : "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials : "include"
    });

    const data = await response.json()

    if (!response.ok) {
        console.error("Error fetching data:", response.status);
        return;
    }

    let name = document.getElementById('hname');
    document.getElementById('hello').style.display = 'inline';
    name.textContent = data.name
    name.style.display = "inline"

    document.querySelector(".user-div").children[0].style.display = "none"
    document.querySelector(".user-div").children[1].style.display = "none"
    document.querySelector(".user-div").children[2].style.display = "inline";
    document.querySelector(".user-div2").children[0].style.display = "none"
    document.querySelector(".user-div2").children[1].style.display = "none"
    document.querySelector(".user-div2").children[2].style.display = "inline";
}

document.getElementById('logout').addEventListener('click', async () => {
    const response = await fetch("http://localhost:3500/logout", {
        method : "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials : "include"
    });

    if (!response.ok) {
        console.error("Error fetching data:", response.status);
        return;
    }

    window.location.href = "http://localhost:3500/main"
})

hello();

