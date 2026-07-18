// ===============================
// Vent - Settings Script
// ===============================

// Cek Login
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

// Tombol
const changeUsernameBtn = document.getElementById("changeUsernameBtn");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const logoutBtn = document.getElementById("logoutBtn");
const deleteAccountBtn = document.getElementById("deleteAccountBtn");

// ===============================
// Change Username
// ===============================

if (changeUsernameBtn) {

    changeUsernameBtn.addEventListener("click", () => {

        const newUsername = document
            .getElementById("newUsername")
            .value
            .trim();

        if (newUsername === "") {
            alert("Please enter a username.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const index = users.findIndex(user => user.id === currentUser.id);

        if (index === -1) return;

        users[index].username = newUsername;

        localStorage.setItem("users", JSON.stringify(users));

        currentUser.username = newUsername;

        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );

        // Update username di semua posting milik user
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        posts.forEach(post => {

            if (post.userId === currentUser.id) {

                post.username = newUsername;

            }

        });

        localStorage.setItem("posts", JSON.stringify(posts));

        alert("Username updated successfully.");

        document.getElementById("newUsername").value = "";

    });

}

// ===============================
// Change Password
// ===============================

if (changePasswordBtn) {

    changePasswordBtn.addEventListener("click", () => {

        const currentPassword = document
            .getElementById("currentPassword")
            .value;

        const newPassword = document
            .getElementById("newPassword")
            .value;

        if (newPassword.length < 6) {

            alert("New password must be at least 6 characters.");
            return;

        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const index = users.findIndex(user => user.id === currentUser.id);

        if (index === -1) return;

        if (users[index].password !== currentPassword) {

            alert("Current password is incorrect.");
            return;

        }

        users[index].password = newPassword;

        localStorage.setItem("users", JSON.stringify(users));

        currentUser.password = newPassword;

        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );

        alert("Password updated successfully.");

        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";

    });

}

// ===============================
// Logout
// ===============================

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("currentUser");

        alert("Logged out successfully.");

        window.location.href = "login.html";

    });

}

// ===============================
// Delete Account
// ===============================

if (deleteAccountBtn) {

    deleteAccountBtn.addEventListener("click", () => {

        const confirmDelete = confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (!confirmDelete) return;

        // Hapus user
        let users = JSON.parse(localStorage.getItem("users")) || [];

        users = users.filter(user => user.id !== currentUser.id);

        localStorage.setItem("users", JSON.stringify(users));

        // Hapus semua posting user
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        posts = posts.filter(post => post.userId !== currentUser.id);

        localStorage.setItem("posts", JSON.stringify(posts));

        // Logout
        localStorage.removeItem("currentUser");

        alert("Your account has been deleted.");

        window.location.href = "index.html";

    });

}

console.log("Vent Settings Loaded");
