// ===============================
// Vent - Login Script
// ===============================

// Jika sudah login, langsung ke app
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
    window.location.href = "app.html";
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u =>
            u.email === email &&
            u.password === password
        );

        if(!user){

            alert("❌ Email atau Password salah.");
            return;

        }

        // Simpan status login
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("✅ Login berhasil!");

        window.location.href = "app.html";

    });

}

console.log("Vent Login Loaded");
