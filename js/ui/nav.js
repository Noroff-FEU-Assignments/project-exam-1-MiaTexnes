// Description: Navigation bar UI
const favicons = [
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "images/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "images/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "images/favicon-16x16.png",
  },
];

// Function to add a favicon
function addFavicon(data) {
  const link = document.createElement("link");
  link.rel = data.rel;
  link.sizes = data.sizes;
  link.href = data.href;
  if (data.type) link.type = data.type;
  document.getElementsByTagName("head")[0].appendChild(link);
}

// Add each favicon
for (let i = 0; i < favicons.length; i++) {
  addFavicon(favicons[i]);
}

const openIcon = document.querySelector("#open");
const closeIcon = document.querySelector("#close");
const navbarMobile = document.querySelector(".navbar-mobile");

if (openIcon && closeIcon && navbarMobile) {
  openIcon.addEventListener("click", function () {
    openIcon.style.display = "none";
    navbarMobile.style.display = "flex";
    closeIcon.style.display = "block";
  });

  closeIcon.addEventListener("click", function () {
    closeIcon.style.display = "none";
    navbarMobile.style.display = "none";
    openIcon.style.display = "block";
  });

  // Add event listener to the document to close navbar when clicking outside
  document.addEventListener("click", function (event) {
    if (
      navbarMobile.style.display === "flex" &&
      !navbarMobile.contains(event.target) &&
      !openIcon.contains(event.target)
    ) {
      closeIcon.style.display = "none";
      navbarMobile.style.display = "none";
      openIcon.style.display = "block";
    }
  });
}
