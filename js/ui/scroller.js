//scroller button move you to the next thumbnail
export const scroller = document.querySelector(".scroller");
const next = document.getElementById("right");
const back = document.getElementById("left");

export function handleScroller() {
    next.addEventListener("click", () => {
        //dont scroll more than there are thumbnails
        const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
        if (scroller.scrollLeft < maxScrollLeft) {
            scroller.scrollBy({
                left: 352,
                behavior: "smooth",
                scrollSnapType: "inline mandatory",
            });
        }
    });

    back.addEventListener("click", () => {
        if (scroller.scrollLeft > 0) {
            scroller.scrollBy({
                left: -352,
                behavior: "smooth",
                scrollSnapType: "inline mandatory",
            });
        }
    });

    //Chat GPT Code Tutor reeeally helped with this because I could not figure it out no matter what I did.  At some point I just decided I wanted to know the answer more than I wanted to figure it out myself.  Still seems to only work sometimes, specifically has issues on chrome. I really have no idea why.
    document.querySelector(".scroller").addEventListener(
        "wheel",
        function (e) {
            //check if the wheel event is primarily vertical
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                window.scrollBy(0, e.deltaY); //scroll the window vertically by the amount of vertical scroll
                e.preventDefault(); //prevent the default scroll (horizontal in this case)
            }
        },
        { passive: false }
    ); //use passive:false to allow preventDefault to work
}
