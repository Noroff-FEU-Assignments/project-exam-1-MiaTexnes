// Function to dynamically load CSS files
function loadCSS(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

// Function to dynamically load JS files with optional defer or async attributes
function loadJS(src, type = "text/javascript", async = false, defer = false) {
    const script = document.createElement("script");
    script.src = src;
    script.type = type;
    if (async) {
        script.async = true;
    }
    if (defer) {
        script.defer = true;
    }
    script.onerror = function () {
        console.error(`Failed to load script: ${src}`);
    };
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

// Function to load common resources
function loadCommonResources() {
    console.log("Loading common resources...");
    loadCSS("css/styles.css");
    loadJS(
        "https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js",
        "text/javascript",
        true
    );
    loadJS(
        "https://kit.fontawesome.com/882a633f3c.js",
        "text/javascript",
        true
    );
    loadJS("js/ui/nav.js", "module", true);

    // Preconnect links for Google Fonts
    loadPreconnect("https://fonts.googleapis.com");
    loadPreconnect("https://fonts.gstatic.com", true);
    loadCSS(
        "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    );
}

// Function to load page-specific resources
function loadPageSpecificResources(page) {
    console.log(`Loading resources for page: ${page}`);
    switch (page) {
        case "index":
            console.log("Loading index.html specific resources...");
            loadJS("js/ui/carousel.js", "module", true); // Adding async attribute
            break;
        case "blogs.html":
            loadJS("js/handlers/allPosts.js", "module", true);
            break;
        case "about.html":
            // Add specific resources for about.html if needed
            break;
        case "contact":
            loadJS("js/handlers/contact.js", "module", true);
            break;
        case "singlepost.html":
            loadJS("js/handlers/singlePost.js", "module", true);
            break;
        case "apiPage.html":
            loadJS("js/handlers/apiHandler.js", "module", true);
            break;
        default:
            console.log("No specific resources to load for this page.");
            break;
    }
}

// Function to load resources based on the current page
function loadResources() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    console.log(`Current page: ${page}`);

    // Load common resources
    loadCommonResources();

    // Load page-specific resources
    loadPageSpecificResources(page);

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
