// Function to dynamically load CSS files
function loadCSS(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

// Function to dynamically load JS files
function loadJS(src, type = "text/javascript") {
    const script = document.createElement("script");
    script.src = src;
    script.type = type;
    document.head.appendChild(script);
}

// Function to dynamically load preconnect links
function loadPreconnect(href, crossorigin = false) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    if (crossorigin) {
        link.crossOrigin = "anonymous";
    }
    document.head.appendChild(link);
}

// Function to load resources based on the current page
function loadResources() {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    // Common resources for all pages
    loadCSS("css/styles.css");
    loadJS(
        "https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
    );
    loadJS("https://kit.fontawesome.com/882a633f3c.js", "text/javascript");
    loadJS("js/ui/nav.js", "module");

    // Preconnect links for Google Fonts
    loadPreconnect("https://fonts.googleapis.com");
    loadPreconnect("https://fonts.gstatic.com", true);
    loadCSS(
        "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    );

    // Page-specific resources
    switch (page) {
        case "index.html":
            loadJS("js/ui/carousel.js", "module"); // Corrected path
            break;
        case "blogs.html":
            loadJS("js/handlers/allPosts.js", "module");
            break;
        case "about.html":
            // Add specific resources for about.html if needed
            break;
        case "contact.html":
            loadCSS("css/contact.css");
            loadJS("js/handlers/contact.js", "module");
            break;
        case "singlepost.html":
            loadJS("js/handlers/singlePost.js", "module");
            break;
        default:
            // Default resources for other pages
            break;
    }

    // Hotjar Tracking Code for Mantis World
    (function (h, o, t, j, a, r) {
        h.hj =
            h.hj ||
            function () {
                (h.hj.q = h.hj.q || []).push(arguments);
            };
        h._hjSettings = { hjid: 5127131, hjsv: 6 };
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script");
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
    })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
}

// Load resources when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadResources);
