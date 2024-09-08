// Existing imports
import { url } from "../constants.js";
import {
    showLoadingIndicator,
    hideLoadingIndicator,
    showErrorIndicator,
} from "./errorAndLoading.js";

// Selecting the container for the posts and the view more button
const resultContainer = document.querySelector("#container-post");
const viewMoreContainer = document.querySelector("#view-more-container");

function displayPosts(posts, initialCount = 10) {
    if (resultContainer) {
        resultContainer.classList.add("post-grid");

        const initialPosts = posts.slice(0, initialCount);
        const remainingPosts = posts.slice(initialCount);

        const postCards = initialPosts
            .map((post) => {
                const altText =
                    post._embedded["wp:featuredmedia"][0].alt_text || "Image"; // Fetch alt text
                return `
            <a href="singlepost.html?id=${post.id}">
            <div class="post-card">
                <h2>${post.title.rendered}</h2>
                <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${altText}">
            </div>
            </a>
            `;
            })
            .join("");

        resultContainer.innerHTML = postCards;

        if (remainingPosts.length > 0) {
            const remainingPostCards = remainingPosts
                .map((post) => {
                    const altText =
                        post._embedded["wp:featuredmedia"][0].alt_text ||
                        "Image"; // Fetch alt text
                    return `
                <a href="singlepost.html?id=${post.id}" class="additional-post hidden">
                <div class="post-card">
                    <h2>${post.title.rendered}</h2>
                    <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${altText}">
                </div>
                </a>
                `;
                })
                .join("");

            resultContainer.innerHTML += remainingPostCards;

            const viewMoreButton = document.createElement("button");
            viewMoreButton.textContent = "View More";
            viewMoreButton.classList.add("view-more-button");
            viewMoreContainer.appendChild(viewMoreButton); // Append the button to the view-more-container

            let isShowingMore = false;

            viewMoreButton.addEventListener("click", () => {
                const additionalPosts =
                    document.querySelectorAll(".additional-post");
                additionalPosts.forEach((post) => {
                    post.classList.toggle("hidden");
                });

                if (isShowingMore) {
                    viewMoreButton.textContent = "View More";
                } else {
                    viewMoreButton.textContent = "View Less";
                }
                isShowingMore = !isShowingMore;
            });
        }
    }
}

// Function to fetch and display posts
async function fetchAndDisplayPosts() {
    showLoadingIndicator(); // Show loading indicator
    try {
        const response = await fetch(`${url}?_embed&per_page=15`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.status}`);
        }
        const posts = await response.json();
        if (!Array.isArray(posts)) {
            throw new Error("Posts are not an array");
        }

        resultContainer.innerHTML = "";
        displayPosts(posts, 12); // Display only 12 posts initially
    } catch (error) {
        console.error(error);
        showErrorIndicator(error); // Show error indicator
    } finally {
        hideLoadingIndicator(); // Ensure loading indicator is hidden
    }
}

// Fetch and display posts on page load
document.addEventListener("DOMContentLoaded", fetchAndDisplayPosts);
