let currentIndex = 0;

function moveSlide(direction) {
    const images = document.querySelector(".carousel-images");
    const totalImages = images.children.length;

    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    images.style.transform = `translateX(-${currentIndex * 100}%)`;
}
