import { url } from "../constants.js";
const prev = document.querySelector("#prev-btn");
const next = document.querySelector("#next-btn");
const list = document.querySelector("#item-list");
const loadingIndicator = document.querySelector("#loadingIndicator");
const errorIndicator = document.querySelector("#errorIndicator");
const itemwidth = 240; // Fixed width of 240px

// Function to fetch posts (assuming this function is defined in another file)
async function fetchPosts() {
    try {
        const response = await fetch(`${url}?_embed&per_page=6`);
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.status}`);
        }
        const posts = await response.json();
        return posts; // Get the first 6 posts
    } catch (error) {
        console.error("Error in fetchPosts:", error);
        return [];
    }
}

// Function to create and insert post items into the carousel
async function displayPosts() {
    // Show loading indicator
    errorIndicator.style.display = "none";

    const posts = await fetchPosts();

    // Hide loading indicator
    loadingIndicator.style.display = "none";

    next.style.display = "inline-block";
    prev.style.display = "inline-block";

    if (posts.length === 0) {
        console.error("No posts to display");
        errorIndicator.style.display = "block";
        return;
    }

    // Duplicate the first and last few items for infinite loop
    const totalItems = posts.length;
    const loopItems = 3; // Number of items to duplicate at each end

    // Append original items
    posts.forEach((post) => {
        const item = createCarouselItem(post);
        list.appendChild(item);
    });

    // Prepend last few items to the beginning
    for (let i = totalItems - loopItems; i < totalItems; i++) {
        const item = createCarouselItem(posts[i]);
        list.insertBefore(item, list.firstChild);
    }

    // Append first few items to the end
    for (let i = 0; i < loopItems; i++) {
        const item = createCarouselItem(posts[i]);
        list.appendChild(item);
    }

    // Set initial scroll position to the first original item
    list.scrollLeft = (itemwidth) * loopItems;
}

// Function to create a carousel item
function createCarouselItem(post) {
    const item = document.createElement("a");
    item.href = `singlepost.html?id=${post.id}`;
    item.classList.add("carousel-item");
    item.style.height = `300px`; // Fixed height of 300px
    const altText = post._embedded["wp:featuredmedia"][0].alt_text || "Image"; // Fetch alt text
    item.innerHTML = `
        <div class="post-card">
            <h3>${post.title.rendered}</h3>
            <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${altText}">
        </div>
    `;
    return item;
}

// Initialize the carousel with posts
document.addEventListener("DOMContentLoaded", () => {
    displayPosts();

    prev.addEventListener("click", () => {
        list.scrollLeft -= itemwidth;
        handleScroll();
    });
    next.addEventListener("click", () => {
        list.scrollLeft += itemwidth;
        handleScroll();
    });

    list.addEventListener("scroll", handleScroll);
});

// Handle scroll events to create infinite loop effect
function handleScroll() {
    const totalItems = list.children.length;
    const loopItems = 3; // Number of items duplicated at each end
    const maxScrollLeft = (itemwidth) * (totalItems - loopItems);

    if (list.scrollLeft <= 0) {
        // Jump to the end of the original items
        list.scrollLeft = maxScrollLeft - (itemwidth) * loopItems;
    } else if (list.scrollLeft >= maxScrollLeft - (itemwidth)) {
        // Jump to the beginning of the original items
        list.scrollLeft = (itemwidth) * loopItems;
    }
}
