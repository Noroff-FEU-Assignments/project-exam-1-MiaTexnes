/*const openIcon = document.querySelector("#open");
const closeIcon = document.querySelector("#close");

if (openIcon && closeIcon) {
    openIcon.addEventListener("click", function () {
        openIcon.style.display = "none";
        document.querySelector(".navbar-mobile").style.display = "block";
        closeIcon.style.display = "block";
    });

    closeIcon.addEventListener("click", function () {
        closeIcon.style.display = "none";
        document.querySelector(".navbar-mobile").style.display = "none";
        openIcon.style.display = "block";
    });
*/

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
}
