const url =
    "https://cors.noroff.dev/https://miatexnes.com/rainydays/wp-json/wp/v2/pages/128/";

async function fetchAboutPage() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `There was an error fetching the about page: ${response.statusText}`
            );
        }

        const aboutPage = await response.json();

        const aboutContainer = document.querySelector("#about-container");
        aboutContainer.innerHTML = `
            <h1 class="about-headline">${aboutPage.title.rendered}</h1>
            <div class="about-content">${aboutPage.content.rendered}</div>
        `;
    } catch (error) {
        console.error(error);
    }
}

fetchAboutPage();
