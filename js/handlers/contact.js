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

        // Name validation
        if (name === "") {
            errors.push("Name is required.");
        } else if (name.length < 5) {
            errors.push("Name must be at least 5 characters long.");
        }

        // Email validation
        if (email === "") {
            errors.push("Email is required.");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.push("Email is invalid.");
        }

        // Subject validation
        if (subject === "") {
            errors.push("Subject is required.");
        } else if (subject.length < 15) {
            errors.push("Subject must be at least 15 characters long.");
        }

        // Message validation
        if (message === "") {
            errors.push("Message is required.");
        } else if (message.length < 25) {
            errors.push("Message must be at least 25 characters long.");
        }

        // Display errors or success message
        if (errors.length > 0) {
            errorMessages.innerHTML = errors.join("<br>");
        } else {
            errorMessages.innerHTML = "Form submitted successfully!";
            // Clear the form fields
            document.getElementById("contactForm").reset();
        }
    });
