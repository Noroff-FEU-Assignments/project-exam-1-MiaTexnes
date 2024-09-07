// script.js
document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const errorMessages = document.getElementById("errorMessages");

        let errors = [];

        if (name === "") {
            errors.push("Name is required.");
        }

        if (email === "") {
            errors.push("Email is required.");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.push("Email is invalid.");
        }

        if (subject === "") {
            errors.push("Subject is required.");
        }

        if (message === "") {
            errors.push("Message is required.");
        }

        if (errors.length > 0) {
            errorMessages.innerHTML = errors.join("<br>");
        } else {
            errorMessages.innerHTML = "Form submitted successfully!";
            // Here you can add code to actually submit the form
        }
    });
