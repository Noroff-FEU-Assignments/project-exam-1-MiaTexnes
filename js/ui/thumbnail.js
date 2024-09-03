//create thumnail html
export function thumbnails(posts, container) {
    const resultsContainer = document.querySelector(container);
    posts.forEach(function (post) {
        resultsContainer.innerHTML += `
    <img class="spin" src="${post.images[0].thumbnail}" alt="${post.description}" />
  </div>
</a>`;
    });
}
