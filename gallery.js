/* ==========================================
   K STUDIO GALLERY
   gallery.js
========================================== */

/* ==========================================
   FILTER GALLERY
========================================== */

const filterButtons =
document.querySelectorAll(".filter-buttons button");

const portfolioItems =
document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
        button.getAttribute("data-filter");

        portfolioItems.forEach(item => {

            if(
                filter === "all" ||
                item.classList.contains(filter)
            ){

                item.style.display = "block";

                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform =
                    "scale(1)";
                }, 100);

            }else{

                item.style.opacity = "0";
                item.style.transform =
                "scale(.9)";

                setTimeout(() => {
                    item.style.display = "none";
                }, 300);

            }

        });

    });

});

/* ==========================================
   LIGHTBOX
========================================== */

const galleryImages =
document.querySelectorAll(".portfolio-item img");

const lightbox =
document.querySelector(".lightbox");

const lightboxImage =
document.getElementById("lightbox-img");

const closeBtn =
document.querySelector(".close-lightbox");

let currentIndex = 0;

galleryImages.forEach((img,index) => {

    img.addEventListener("click", () => {

        currentIndex = index;

        lightbox.classList.add("show");

        lightboxImage.src = img.src;

        document.body.style.overflow =
        "hidden";

    });

});

/* ==========================================
   CLOSE LIGHTBOX
========================================== */

function closeLightbox(){

    lightbox.classList.remove("show");

    document.body.style.overflow =
    "auto";

}

closeBtn.addEventListener(
"click",
closeLightbox
);

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        closeLightbox();
    }

});

/* ==========================================
   NEXT IMAGE
========================================== */

function nextImage(){

    currentIndex++;

    if(
        currentIndex >= galleryImages.length
    ){

        currentIndex = 0;
    }

    lightboxImage.src =
    galleryImages[currentIndex].src;
}

/* ==========================================
   PREVIOUS IMAGE
========================================== */

function previousImage(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex =
        galleryImages.length - 1;
    }

    lightboxImage.src =
    galleryImages[currentIndex].src;
}

/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener(
"keydown",
(e) => {

    if(!lightbox.classList.contains("show"))
        return;

    if(e.key === "Escape"){

        closeLightbox();
    }

    if(e.key === "ArrowRight"){

        nextImage();
    }

    if(e.key === "ArrowLeft"){

        previousImage();
    }

});

/* ==========================================
   TOUCH SWIPE SUPPORT
========================================== */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener(
"touchstart",
(e)=>{

    touchStartX =
    e.changedTouches[0].screenX;

});

lightbox.addEventListener(
"touchend",
(e)=>{

    touchEndX =
    e.changedTouches[0].screenX;

    handleSwipe();
});

function handleSwipe(){

    if(
        touchEndX < touchStartX - 50
    ){

        nextImage();
    }

    if(
        touchEndX > touchStartX + 50
    ){

        previousImage();
    }

}

/* ==========================================
   SCROLL REVEAL
========================================== */

const portfolioCards =
document.querySelectorAll(".portfolio-item");

function revealGallery(){

    portfolioCards.forEach(card => {

        const top =
        card.getBoundingClientRect().top;

        const trigger =
        window.innerHeight - 100;

        if(top < trigger){

            card.classList.add("visible");

        }

    });

}

window.addEventListener(
"scroll",
revealGallery
);

revealGallery();

/* ==========================================
   STAGGER ANIMATION
========================================== */

portfolioCards.forEach((card,index)=>{

    card.style.transitionDelay =
    `${index * 0.08}s`;

});

/* ==========================================
   IMAGE PRELOAD
========================================== */

galleryImages.forEach(img => {

    const image = new Image();

    image.src = img.src;

});

/* ==========================================
   PAGE LOADED
========================================== */

window.addEventListener("load",()=>{

    document.body.classList.add(
        "gallery-loaded"
    );

});