const form = document.getElementById("loginForm");
const url = "https://dummyjson.com/users";

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const response = await fetch(url);
            const data = await response.json();
            const users = data.users;

            // Check if any user matches the input credentials
            const user = users.find(
                (u) => u.username === username && u.password === password
            );

            if (user) {
                localStorage.setItem("useraccess", "true");
                window.location.href = "index.html";
                console.log("Welcome");
            } else {
                alert("Username & Password is Wrong!");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("An error occurred. Please try again.");
        }
    });
}

// Logout function
function logout() {
    localStorage.removeItem("useraccess");
    window.location.href = "login.html";
}
