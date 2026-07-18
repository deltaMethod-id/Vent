// ===============================
// Vent - Index Script
// ===============================

// Cek apakah user sudah login
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
    window.location.href = "app.html";
}

// Tombol (jika nanti ditambahkan ID)
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");

if (loginButton) {
    loginButton.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}

if (signupButton) {
    signupButton.addEventListener("click", () => {
        window.location.href = "signup.html";
    });
}

console.log("Vent - Index Loaded");
