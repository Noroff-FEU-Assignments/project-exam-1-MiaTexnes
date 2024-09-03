// Display some posts in a carousel from page 2 of posts, just so it's not all one image across the home page (since the scroller displays page 1)
import { url } from "../constants.js";
import { thumbnails } from "./thumbnail.js";
import { showLoadingIndicator, hideLoadingIndicator, showErrorIndicator } from "./errorAndLoading.js";


const resultsContainer = document.querySelector("#carousel-container");



function displayThumbnail(posts) {
    if (resultsContainer) {
        resultsContainer.classList.add("thumbnail-grid");

        const postCards = posts
            .map((post) => {
                return `
            <a href="singlepost.html?id=${post.id}">
            <div class="post-card">
                <h2>${post.title.rendered}</h2>
                <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post._embedded["wp:featuredmedia"][0].alt_text}">
            </div>
            </a>
            `;
            })
            .join("");

        resultsContainer.innerHTML = postCards;
    }
}

showLoadingIndicator();

// Fetch posts
fetch(url, {
    method: "GET",
})
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((posts) => {
        if (!Array.isArray(posts)) {
            throw new Error("Expected posts to be an array.");
        }

        hideLoadingIndicator(); // Hide loading indicator when data is received
        resultsContainer.style.display = ""; // Show the results container

        displayThumbnail(posts); // Call the displayPosts function
        thumbnails(posts, "#thumbnails"); // Call the thumbnails function with the posts and a selector for where to display the thumbnails
    })
    .catch((error) => {
        console.error("Error:", error);
        showErrorIndicator(error.message); // Show the error indicator with the error message
    });



