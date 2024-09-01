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


// async function fetchCarouselPosts() {
//     const url =
//         "https://www.miatexnes.com/wp-json/wp/v2/posts?_embed&page=2&per_page=9";
//     try {
//         const response = await fetch(url);
//         const posts = await response.json();
//         console.log("Fetched posts:", posts); // Debugging
//         return posts.map((post) => ({
//             title: post.title.rendered,
//             imageUrl: post._embedded["wp:featuredmedia"][0].source_url,
//             id: post.id,
//         }));
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//     }
// }

// let currentPostIndex = 0;
// let postsData = [];

// async function setupCarousel() {
//     postsData = await fetchCarouselPosts();
//     console.log("Posts data:", postsData); // Debugging

//     const container = document.querySelector(".splash-image-container");
//     if (!container) {
//         console.error("Container element not found"); // Debugging
//         return;
//     }
//     container.innerHTML = '<div class="splash-image-controller"></div>';

//     postsData.forEach((post) => {
//         // Create slides
//         const slide = document.createElement("div");
//         slide.className = "slide";
//         slide.style.backgroundImage = `url(${post.imageUrl})`;
//         slide.innerHTML = `
//             <a class="overlay" href="/html/post/?id=${post.id}">
//                 <h2 class="overlay-text">${post.title}</h2>
//             </a>
//         `;
//         container.insertBefore(slide, container.firstChild);
//     });

//     // Create buttons
//     postsData.forEach((_, index) => {
//         const button = document.createElement("button");
//         button.ariaLabel = "Select Post";
//         button.className = "circle" + (index === 0 ? " filled-circle" : "");
//         document.querySelector(".splash-image-controller").appendChild(button);
//     });

//     // Add controls to buttons
//     const buttons = document.querySelectorAll(
//         ".splash-image-controller .circle"
//     );
//     buttons.forEach((button, index) => {
//         button.addEventListener("click", () => {
//             currentPostIndex = index;
//             updateCarousel();
//         });
//     });

//     // Update to show the first slide
//     updateCarousel();

//     // Move to the next post every 3 seconds
//     setInterval(() => {
//         currentPostIndex = (currentPostIndex + 1) % postsData.length;
//         updateCarousel();
//     }, 3000);

//     if (postsData.length > 0) {
//         updateCarousel();
//     }
// }

// function updateCarousel() {
//     if (!postsData.length) return;

//     const slides = document.querySelectorAll(".slide");
//     const buttons = document.querySelectorAll(
//         ".splash-image-controller .circle"
//     );

//     slides.forEach((slide) => slide.classList.remove("active"));
//     buttons.forEach((button) => button.classList.remove("filled-circle"));

//     slides[currentPostIndex].classList.add("active");
//     buttons[currentPostIndex].classList.add("filled-circle");
// }

// // Export carousel functionality to app.js
// export function handleCarousel() {
//     document.addEventListener("DOMContentLoaded", setupCarousel);
// }
