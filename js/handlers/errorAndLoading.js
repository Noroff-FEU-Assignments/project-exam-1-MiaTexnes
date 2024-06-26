// Selecting the containers for the error and loading indicators
const errorIndicator = document.querySelector("#error-indicator");
const loadingIndicator = document.querySelector("#loading-indicator");

// Function to show the loading indicator
export function showLoadingIndicator() {
    if (loadingIndicator) {
        loadingIndicator.style.display = "block";
    }
}

// Function to hide the loading indicator
export function hideLoadingIndicator() {
    if (loadingIndicator) {
        loadingIndicator.style.display = "none";
    }
}

// Function to show the error indicator
export function showErrorIndicator(error) {
    if (errorIndicator) {
        errorIndicator.style.display = "block";
        errorIndicator.innerHTML = `<p>${error}. Please contact the site owner.</p>`;
    }
}

// //Selecting the containers for the error and loading indicators
// const errorIndicator = document.querySelector("error-indicator");
// const loadingIndicator = document.querySelector("loading-indicator");

// //function to show the loading indicator
// export function showLoadingIndicator() {
//     loadingIndicator.style.display="block";
// }

// //function to hide the loading indicator
// export function hideLoadingIndicator() {
//     loadingIndicator.style.display="none";
// }

// //function to show the error indicator
// export function showErrorIndicator(error) {
//     errorIndicator.style.display = "block";
//     errorIndicator.innerHTML = `<p>${error}.Please contact site owner</p>`;
// }
