const MAX_RETRIES = 3;
async function hello(retries = 0) {
    const response = await fetch("http://localhost:3500/users", {
        method : "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials : "include"
    });

    if (!response.ok) {
        if (retries >= MAX_RETRIES) {
            console.error("Max retries reached. Redirecting to login.");
            window.location.href = "/login";
            return;
        }

        const res = await fetch("http://localhost:3500/refresh", {
            method : "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials : "include"
        });
        if (!res.ok) {
            console.error("Failed to refresh token:", res.status);
            return;
        }
    
        return hello(retries + 1);
    }
    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.error("Error parsing JSON:", error);
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

