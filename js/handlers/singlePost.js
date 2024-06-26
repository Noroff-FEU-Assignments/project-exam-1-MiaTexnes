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
        console.log(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        showErrorIndicator(); // Show error indicator
    } finally {
        hideLoadingIndicator(); // Hide loading indicator
    }
}

function showBlogPost(blogPost) {
    document.title = `Mantis World | ${blogPost.title.rendered}`;
    blogPostSection.innerHTML = "";

    blogPostSection.innerHTML += `
    <h2 class="specific-blog-title">${blogPost.title.rendered}</h2>
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
        image.addEventListener("click", function () {
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
            modalImg.src = this.src;
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
            <h2>${post.title.rendered}</h2>
            <div>${post.excerpt.rendered}</div>
        `;
        resultContainer.appendChild(postElement);
    });
    document.title = `${posts.title} - Mantis World`;
}

// const baseUrl =
//     "https://cors.noroff.dev/https://www.miatexnes.com/rainydays/wp-json/wp/v2/posts";

// const locationString = document.location.search;
// const params = new URLSearchParams(locationString);
// const idCall = params.get("id");

// const urlWithId = `${baseUrl}/${idCall}`;

// const blogPostSection = document.querySelector(".specific-blog-section");
// const loader = document.querySelector(".loading-indicator");

// async function fetchPost(url) {
//     try {
//         const response = await fetch(url);
//         const post = await response.json();
//         showBlogPost(post);
//         console.log(post);
//     } catch (error) {
//         console.error("Error fetching post:", error);
//     }
// }

// function showBlogPost(blogPost) {
//     document.title = `Mantis World | ${blogPost.title.rendered}`;
//     blogPostSection.innerHTML = "";

//     blogPostSection.innerHTML += `
//     <h2 class="specific-blog-title">${blogPost.title.rendered}</h2>
//     <div class="specific-blog-section">
//         ${blogPost.content.rendered}
//     </div>
//     <div id="myModal" class="modal">
//       <img class="modal-content" id="modalImage" />
//     </div>`;

//     const blogImages = document.querySelectorAll(".specific-blog-section img");
//     const modal = document.getElementById("myModal");
//     const modalImg = document.getElementById("modalImage");

//     blogImages.forEach((image) => {
//         image.addEventListener("click", function () {
//             modal.style.display = "flex";
//             modal.style.justifyContent = "center";
//             modal.style.alignItems = "center";
//             modalImg.src = this.src;
//         });
//     });

//     modal.addEventListener("click", function () {
//         modal.style.display = "none";
//     });

//     modalImg.addEventListener("click", function (event) {
//         event.stopPropagation();
//     });
//     loader.classList.remove("loading-indicator");
// }

// fetchPost(urlWithId);

// const detailContainer = document.querySelector("#container-post");

// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// const id = params.get("id"); // Assuming you're passing the post ID in the query string

// const url = "https://www.miatexnes.com/rainydays/wp-json/wp/v2/posts?_embed";

// async function fetchPostById(url, id) {
//     const postUrl = `${url}/${id}`; // Make sure the URL ends with a slash
//     try {
//         const response = await fetch(postUrl);

//         if (!response.ok) {
//             throw new Error(
//                 `There was an error fetching the post with id: ${id}`
//             );
//         }

//         const post = await response.json();

//         detailContainer.innerHTML = `
//             <div class="container-post">
//                 <h1>${post.title.rendered}</h1>
//                 <div>${post.content.rendered}</div>
//             </div>
//         `;

//         return post;
//     } catch (error) {
//         console.error(error); // Log the error to the console
//     }
// }

// // Call fetchPostById on page load
// fetchPostById(url, id);

// import { getQueryStringParam } from "../helpers/getQueryStringParam.js";
// import {
//     showLoadingIndicator,
//     hideLoadingIndicator,
//     showErrorIndicator,
// } from "./errorAndLoading.js";

// const resultsContainer = document.querySelector("#container-product");
// const errorContainer = document.querySelector("#error-container");

// async function fetchPostById(slug) {
//     showLoadingIndicator(resultsContainer);
//     const url = `https://cors.noroff.dev/https://miatexnes.com/rainydays/wp-json/wp/v2/posts/slug:${slug}/`;
//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`There was an error fetching the post with slug: ${slug}`);
//         }

//         const post = await response.json();
//         return post;
//     } catch (error) {
//         showErrorIndicator(errorContainer, error.message);
//         throw error;
//     } finally {
//         hideLoadingIndicator(resultsContainer);
//     }
// }

// function buildPostCard(post) {
//     return `
//         <div class="post-card">
//             <h2>${post.title.rendered}</h2>
//             <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post._embedded["wp:featuredmedia"][0].alt_text}">
//         </div>
//     `;
// }

// async function fetchProductById(id) {
//     showLoadingIndicator(resultsContainer);
//     const productUrl = `${url}/${id}`; // Make sure the URL ends with a slash
//     try {
//         const response = await fetch(productUrl);

//         if (!response.ok) {
//             throw new Error(
//                 `There was an error fetching the product with id: ${id}`
//             );
//         }

//         const product = await response.json();
//         return product;
//     } catch (error) {
//         showErrorIndicator(errorContainer, error.message);
//         throw error; // The error is re-thrown to be handled by the caller
//     } finally {
//         hideLoadingIndicator(resultsContainer);
//     }
// }

// async function displayPost() {
//     const id = getQueryStringParam("id");

//     if (!id) {
//         showErrorIndicator(
//             errorContainer,
//             "No product ID found in the query string."
//         );
//         return;
//     }

//     try {
//         const post = await fetchPostById(id);
//         resultsContainer.innerHTML = buildPostCard(post);
//     } catch (error) {
//         // Error handling is already performed in fetchProductById
//     }
// }

// // Call displayProduct on page load
// displayPost();

// import { getQueryStringParam } from "../helpers/getQueryStringParam.js";
// import {
//     showLoadingIndicator,
//     hideLoadingIndicator,
//     showErrorIndicator,
// } from "./errorAndLoading.js";

// const resultsContainer = document.querySelector("#container-product");
// const errorContainer = document.querySelector("#error-container");

// const url =
//     "https://cors.noroff.dev/https://miatexnes.com/rainydays/wp-json/wp/v2/posts/slug:$post_slug/";

// async function fetchPostById(id) {
//     showLoadingIndicator(resultsContainer);
//     const postUrl = `${url}/${id}`;
//     try {
//         const response = await fetch(postUrl);

//         if (!response.ok) {
//             throw new Error(
//                 `There was an error fetching the product with id: ${id}`
//             );
//         }

//         const post = await response.json();
//         return post;
//     } catch (error) {
//         showErrorIndicator(errorContainer, error.message);
//         throw error;
//     } finally {
//         hideLoadingIndicator(resultsContainer);
//     }
// }

// async function displayPost() {
//     const id = getQueryStringParam("id");

//     if (!id) {
//         showErrorIndicator(
//             errorContainer,
//             "No product ID found in the query string."
//         );
//         return;
//     }

//     try {
//         const post = await fetchPostById(id);
//         resultsContainer.innerHTML = buildPostCard(post);
//     } catch (error) {
//         console.error(error);
//     }
// }

// // Selecting the container for the posts
// const resultContainer = document.querySelector("#container-post");

// function displayPosts(posts) {
//     if (resultContainer) {
//         resultContainer.classList.add("post-grid");

//         const postCards = posts
//             .map((posts) => {
//                 return `
//             <a href="singlepost.html?id=${posts.id}">
//             <div class="post-card">
//                 <h2>${posts.title.rendered}</h2>
//                 <img src="${posts._embedded["wp:featuredmedia"][0].source_url}" alt="${posts._embedded["wp:featuredmedia"][0].alt_text}">
//             </div>
//             </a>
//             `;
//             })
//             .join("");

//         resultContainer.innerHTML = postCards;
//     }
// }

// // Fetching the posts
// fetch(`${url}$post_slug`, {
//     method: "GET",
// })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(`Error fetching posts: ${response.status}`);
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
//         hideLoadingIndicator();
//         showErrorIndicator(error);
//     });

// // Call displayProduct on page load
// displayPost();

// import { getQueryStringParam } from "../helpers/getQueryStringParam.js";
// import { url2 } from "../constants.js";
// import {
//     showLoadingIndicator,
//     hideLoadingIndicator,
//     showErrorIndicator,
// } from "./errorAndLoading.js";

// const resultContainer = document.querySelector("#container-post");
// const errorContainer = document.querySelector("#error-container");

// //Build post card for specific post
// function buildPostCard(post) {
//     return `
//     <div class="post-card">
//         <h2>${post.title.rendered}</h2>
//         <p>${post.content.rendered}</p>
//     </div>
//     `;
// }

// async function fetchPostById(id) {
//     showLoadingIndicator(resultContainer);
//     const postUrl2 = `${url2}${id}`;
//     try {
//         const response = await fetch(postUrl2);

//         if (!response.ok) {
//             throw new Error("Error fetching post with id: ${id}");
//         }

//         const post = await response.json();
//         return post;
//     } catch (error) {
//         showErrorIndicator(errorContainer, error.message);
//         throw error;
//     } finally {
//         hideLoadingIndicator(resultContainer);
//     }
// }

// async function displayPost() {
//     const id = getQueryStringParam("id");

//     if (!id) {
//         showErrorIndicator(errorContainer, "No post id was provided.");
//         return;
//     }

//     try {
//         const post = await fetchPostById(id);
//         resultContainer.innerHTML = buildPostCard(post);
//     } catch (error) {
//         console.error(error); // or handle the error in another way
//     }
// }

// displayPost();
