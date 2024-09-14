import { url } from "../constants.js";
import {
    showLoadingIndicator,
    hideLoadingIndicator,
    showErrorIndicator,
} from "./errorAndLoading.js";

const locationString = document.location.search;
const params = new URLSearchParams(locationString);
const idCall = params.get("id");

const urlWithId = `${url}/${idCall}`;

const blogPostSection = document.querySelector(".specific-blog-section");

async function fetchPost(url) {
    showLoadingIndicator(); // Show loading indicator
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.status}`);
        }
        const post = await response.json();
        showBlogPost(post);
        document.title = `${post.title.rendered} - MantisWorld`;
    } catch (error) {
        console.error("Error fetching post:", error);
        showErrorIndicator(); // Show error indicator
    } finally {
        hideLoadingIndicator(); // Hide loading indicator
    }
}

function showBlogPost(blogPost) {
    document.title = `${blogPost.title.rendered} - MantisWorld`;
    blogPostSection.innerHTML = "";

    blogPostSection.innerHTML += `
    <h1 class="top-header">${blogPost.title.rendered}</h1>
    <div class="specific-blog-section">
        ${blogPost.content.rendered}
    </div>
    <div id="myModal" class="modal">
      <img class="modal-content" id="modalImage" />
    </div>`;

    const blogImages = document.querySelectorAll(".specific-blog-section img");
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("modalImage");

    blogImages.forEach((image) => {
        // Set the alt text for each image
        const altText = image.alt || "Image"; // Use the alt attribute or a default value
        image.addEventListener("click", function () {
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
            modalImg.src = this.src;
            modalImg.alt = altText; // Set the alt text for the modal image
        });
    });

    modal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    modalImg.addEventListener("click", function (event) {
        event.stopPropagation();
    });
}

fetchPost(urlWithId);

fetch(`${url}?_embed`, {
    method: "GET",
})
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.status}`);
        }
        return response.json();
    })
    .then((posts) => {
        if (!Array.isArray(posts)) {
            throw new Error("Posts are not an array");
        }

        hideLoadingIndicator(); // Hide loading indicator
        const resultContainer = document.querySelector(".result-container");
        if (resultContainer) {
            resultContainer.innerHTML = "";
            displayPosts(posts);
        } else {
            console.error("resultContainer element not found");
        }
    })
    .catch((error) => {
        console.error(error);
        hideLoadingIndicator(); // Ensure loading indicator is hidden on error
        showErrorIndicator(); // Show error indicator
    });

function displayPosts(posts) {
    const resultContainer = document.querySelector(".result-container");
    posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `
            <h1>${post.title.rendered}</h1>
            <div>${post.excerpt.rendered}</div>
        `;
        resultContainer.appendChild(postElement);
    });
}

// Add this code at the end of the file
document.addEventListener("DOMContentLoaded", () => {
    const paragraphs = document.querySelectorAll(".specific-blog-section p");
    paragraphs.forEach((paragraph) => {
        paragraph.innerHTML = paragraph.innerHTML.replace(/:/g, "&nbsp;:");
    });
});
