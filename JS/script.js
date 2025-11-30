// PANEL ANIMATION
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// -------------------------------
// USER SIGNUP
// -------------------------------
const signupForm = document.querySelector(".sign-up form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = signupForm.querySelector("input[placeholder='Name']").value;
    const email = signupForm.querySelector("input[placeholder='Email']").value;
    const password = signupForm.querySelector("input[placeholder='Password']").value;

    if (!name || !email || !password) {
        alert("Please complete all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check duplicate email
    if (users.some(u => u.email === email)) {
        alert("This email is already registered.");
        return;
    }

    const newUser = {
        name,
        email,
        password,
        createdAt: new Date().toLocaleString()
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    container.classList.remove("active"); // switch to login panel
});


// -------------------------------
// USER LOGIN
// -------------------------------
const loginForm = document.querySelector(".sign-in form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[placeholder='Email']").value;
    const password = loginForm.querySelector("input[placeholder='Password']").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Invalid email or password.");
        return;
    }

    // save logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify({
        name: user.name,
        email: user.email,
        loginTime: new Date().toLocaleString()
    }));

    alert("Login successful!");

    window.location.href = "dashboard.html"; // redirect to new page
});
