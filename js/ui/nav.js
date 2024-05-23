const openIcon = document.querySelector("#open");
const closeIcon = document.querySelector("#close");

if (openIcon && closeIcon) {
    openIcon.addEventListener("click", function () {
        openIcon.style.display = "none";
        document.querySelector(".navbar").style.display = "block";
        closeIcon.style.display = "block";
    });

    closeIcon.addEventListener("click", function () {
        closeIcon.style.display = "none";
        document.querySelector(".navbar").style.display = "none";
        openIcon.style.display = "block";
    });
}
