import { url } from "../constants.js";
const prev = document.querySelector("#prev-btn");
const next = document.querySelector("#next-btn");
const list = document.querySelector("#item-list");
const itemwidth = 230; // Fixed width of 230px
const padding = 8; // Adjust padding if needed

// Function to fetch posts (assuming this function is defined in another file)
async function fetchPosts() {
    try {
        const response = await fetch(`${url}?_embed&per_page=10`);
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.status}`);
        }
        const posts = await response.json();
        console.log("Fetched posts:", posts); // Debugging log
        return posts; // Get the first 10 posts
    } catch (error) {
        console.error("Error in fetchPosts:", error);
        return [];
    }
}

// Function to create and insert post items into the carousel
async function displayPosts() {
    const posts = await fetchPosts();
    if (posts.length === 0) {
        console.error("No posts to display");
        return;
    }
    posts.forEach((post) => {
        const item = document.createElement("a");
        item.href = `singlepost.html?id=${post.id}`;
        item.classList.add("carousel-item");
        item.style.width = `${itemwidth}px`;
        item.style.height = `250px`; // Fixed height of 300px
        item.style.padding = `${padding / 2}px`;
        item.innerHTML = `
            <div class="post-card">
                <h3>${post.title.rendered}</h3>
                <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post._embedded["wp:featuredmedia"][0].alt_text}">
            </div>
        `;
        list.appendChild(item);
    });
    console.log("Posts displayed in carousel"); // Debugging log
}

// Initialize the carousel with posts
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed"); // Debugging log
    displayPosts();

    prev.addEventListener("click", () => {
        list.scrollLeft -= itemwidth + padding;
    });
    next.addEventListener("click", () => {
        list.scrollLeft += itemwidth + padding;
    });
});
