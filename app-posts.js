// ===============================
// Vent - App Posts
// ===============================

const postsContainer = document.getElementById("postsContainer");

// Load Semua Postingan
function loadPosts() {

    if (!postsContainer) return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    postsContainer.innerHTML = "";

    if (posts.length === 0) {

        postsContainer.innerHTML = `
            <div class="post">
                <p>No posts yet.</p>
            </div>
        `;

        return;
    }

    posts.forEach(post => {

        const card = document.createElement("div");

        card.className = "post";

        card.innerHTML = `
            <h3>${post.username}</h3>

            <p>${escapeHTML(post.content)}</p>

            <small>
                ${post.createdAt}
                ${post.edited ? " • Edited" : ""}
            </small>

            <div class="actions">
                ${
                    post.userId === currentUser.id
                    ?
                    `
                    <button onclick="editPost(${post.id})">
                        Edit
                    </button>

                    <button onclick="deletePost(${post.id})">
                        Delete
                    </button>
                    `
                    :
                    ""
                }
            </div>
        `;

        postsContainer.appendChild(card);

    });

}

// Edit Post
function editPost(postId) {

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    const index = posts.findIndex(post => post.id === postId);

    if (index === -1) return;

    const newContent = prompt(
        "Edit your post:",
        posts[index].content
    );

    if (newContent === null) return;

    if (newContent.trim() === "") {

        alert("Post cannot be empty.");
        return;

    }

    posts[index].content = newContent.trim();

    posts[index].edited = true;

    localStorage.setItem("posts", JSON.stringify(posts));

    loadPosts();

}

// Delete Post
function deletePost(postId) {

    const confirmDelete = confirm(
        "Delete this post?"
    );

    if (!confirmDelete) return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.filter(post => post.id !== postId);

    localStorage.setItem("posts", JSON.stringify(posts));

    loadPosts();

}

// Hindari HTML Injection
function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

// Pertama kali buka halaman
loadPosts();

console.log("Vent App Posts Loaded");
