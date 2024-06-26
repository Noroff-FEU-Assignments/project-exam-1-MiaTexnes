const url =
    "https://cors.noroff.dev/https://miatexnes.com/rainydays/wp-json/wp/v2/pages/130/";

async function fetchContactPage() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `There was an error fetching the contact page: ${response.statusText}`
            );
        }

        const contactPage = await response.json();

        const contactContainer = document.querySelector("#contact-container");
        contactContainer.innerHTML = `
            <h1 class="contact-headline">${contactPage.title.rendered}</h1>
            <div class="contact-content">${contactPage.content.rendered}</div>
        `;
    } catch (error) {
        console.error(error);
    }
}

fetchContactPage();
