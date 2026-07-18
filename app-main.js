// ===============================
// Vent - App Main
// ===============================

// Cek Login
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

// Tampilkan Username
const usernameElement = document.getElementById("username");

if (usernameElement) {
    usernameElement.textContent = currentUser.username;
}

// Tombol Post
const postButton = document.getElementById("postButton");

if (postButton) {

    postButton.addEventListener("click", createPost);

}

// Membuat Curhat
function createPost() {

    const textarea = document.getElementById("postContent");

    const content = textarea.value.trim();

    if (content === "") {

        alert("Please write something first.");
        return;

    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    const newPost = {

        id: Date.now(),

        userId: currentUser.id,

        username: currentUser.username,

        content: content,

        createdAt: new Date().toLocaleString(),

        edited: false

    };

    posts.unshift(newPost);

    localStorage.setItem("posts", JSON.stringify(posts));

    textarea.value = "";

    if (typeof loadPosts === "function") {

        loadPosts();

    }

}

console.log("Vent App Main Loaded");
