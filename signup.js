// ===============================
// Vent - Sign Up Script
// ===============================

// Jika sudah login, langsung ke app
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
    window.location.href = "app.html";
}

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(e){

        e.preventDefault();

        const username = document.getElementById("signupUsername").value.trim();
        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("signupConfirmPassword").value;

        if(username === "" || email === "" || password === ""){

            alert("⚠ Lengkapi semua data.");
            return;

        }

        if(password !== confirmPassword){

            alert("❌ Password tidak sama.");
            return;

        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Cek email sudah digunakan
        const emailExists = users.find(user => user.email === email);

        if(emailExists){

            alert("❌ Email sudah terdaftar.");
            return;

        }

        const newUser = {

            id: Date.now(),

            username: username,

            email: email,

            password: password,

            createdAt: new Date().toLocaleString()

        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("✅ Akun berhasil dibuat!");

        window.location.href = "login.html";

    });

}

console.log("Vent Signup Loaded");
