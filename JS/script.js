// SELECTING ELEMENTS
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// OPEN SIGNUP / LOGIN PANELS
registerBtn.addEventListener('click', () => container.classList.add("active"));
loginBtn.addEventListener('click', () => container.classList.remove("active"));


// HANDLE SIGNUP
const signupForm = document.querySelector(".sign-up form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = signupForm.querySelector("input[placeholder='Name']").value;
    const email = signupForm.querySelector("input[placeholder='Email']").value;
    const password = signupForm.querySelector("input[placeholder='Password']").value;

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // SAVE USER DATA
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // CHECK IF EMAIL EXISTS
    if (users.find(u => u.email === email)) {
        alert("This email is already registered.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    container.classList.remove("active"); // Switch to login panel
});


// HANDLE LOGIN
const loginForm = document.querySelector(".sign-in form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[placeholder='Email']").value;
    const password = loginForm.querySelector("input[placeholder='Password']").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Incorrect email or password.");
        return;
    }

    // SAVE ACTIVE USER
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert(`Welcome, ${user.name}!`);
    window.location.href = "dashboard.html"; // Redirect to new page
});
