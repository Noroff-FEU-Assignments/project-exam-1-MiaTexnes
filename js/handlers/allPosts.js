// Existing imports
import { url } from "../constants.js";
import {
    showLoadingIndicator,
    hideLoadingIndicator,
    showErrorIndicator,
} from "./errorAndLoading.js";

// Selecting the container for the posts
const resultContainer = document.querySelector("#container-post");

function displayPosts(posts) {
    if (resultContainer) {
        resultContainer.classList.add("post-grid");

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

        resultContainer.innerHTML = postCards;
    }
}

// Showing the loading indicator
showLoadingIndicator();

// Fetching the posts
fetch(`${url}?_embed&per_page=15`, {
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

        hideLoadingIndicator();
        resultContainer.innerHTML = "";

        displayPosts(posts);
    })
    .catch((error) => {
        console.error(error);
        hideLoadingIndicator(); // Ensure loading indicator is hidden on error
        showErrorIndicator(error);
    });

// // Your existing imports
// import { url } from "../constants.js";
// import {
//     showLoadingIndicator,
//     hideLoadingIndicator,
//     showErrorIndicator,
// } from "./errorAndLoading.js";

// //Selecting the container for the posts
// const resultContainer = document.querySelector("#container-post");

// function displayPosts(posts) {
//     if (resultContainer) {
//         resultContainer.classList.add("post-grid");

//         const postCards = posts
//         .map((post) => {
//             return `
//             <div class="post-card">
//                 <h2>${post.title.rendered}</h2>
//                 <img>${post.featured_media}</img>
//             </div>
//             <p class="backButton">Back</p>
//             `;
//         })
//             .join("");

//         resultContainer.innerHTML = postCards;
//     }
// }

// //Showing the loading indicator
// showLoadingIndicator();

// //Fetching the posts
// fetch(url, {
//     method: "GET",
// })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error('Error fetching posts:${response.status}');
//         }
//         return response.json();
//     })
//     .then((posts) => {
//         if (!Array.isArray(posts)) {
//             throw new Error("Posts are not an array");
//         }

//         hideLoadingIndicator();
//         resultContainer.innerHTML = "";

//         displayPosts(posts);
//     })

//     .catch((error) => {
//         console.error(error);
//         showErrorIndicator(error);
//     });
