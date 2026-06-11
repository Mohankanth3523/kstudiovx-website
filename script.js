/* ==========================================
   K STUDIO LUXURY PHOTOGRAPHY
   script.js
========================================== */

/* ==========================================
   LOADER
========================================== */
window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

        },1500);

    }

});

/* ==========================================
   STICKY NAVBAR
========================================== */

const header = document.querySelector(".header");

const hero = document.querySelector(".hero");

if(hero){

    window.addEventListener("scroll", () => {

        hero.style.backgroundPositionY =
        window.pageYOffset * 0.5 + "px";

    });

}

/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const reveals = document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section => {

        const windowHeight = window.innerHeight;

        const revealTop = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if(revealTop < windowHeight - revealPoint){

            section.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealSections);

revealSections();

const slides = document.querySelectorAll(".hero-slider .slide");

let currentSlide = 0;

if(slides.length > 0){

    setInterval(() => {

        slides[currentSlide].classList.remove("active");

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add("active");

    }, 3000);

}
/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters(){

    if(counterStarted) return;

    const statsSection = document.querySelector(".stats");

    if(!statsSection) return;

    const position = statsSection.getBoundingClientRect().top;

    if(position < window.innerHeight - 100){

        counterStarted = true;

        counters.forEach(counter => {

            const target =
            +counter.getAttribute("data-target");

            let current = 0;

            const increment =
            target / 100;

            const updateCounter = () => {

                if(current < target){

                    current += increment;

                    counter.innerText =
                    Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                }else{

                    counter.innerText = target + "+";
                }

            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounters);

/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn =
document.querySelector(".menu-btn");

const navbar =
document.querySelector(".navbar");

if(menuBtn){

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("mobile-active");

    });

}

/* ==========================================
   CLOSE MENU AFTER CLICK
========================================== */

const navLinks =
document.querySelectorAll(".navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("mobile-active");

    });

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click",

    function(e){

        e.preventDefault();

        const target =
        document.querySelector(
        this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        }

    });

});

/* ==========================================
   HERO FADE EFFECT
========================================== */
window.addEventListener("scroll", () => {

    const hero =
    document.querySelector(".hero-content");

    let value = window.scrollY;

    if(hero){

        hero.style.transform =
        `translateY(${value * 0.1}px)`;
    }

});

/* ==========================================
   GALLERY HOVER PRELOAD
========================================== */

/* ==========================================
   FLOATING WHATSAPP PULSE
========================================== */

const whatsapp =
document.querySelector(".whatsapp-btn");

if(whatsapp){

    setInterval(() => {

        whatsapp.animate(

            [

                {
                    transform:"scale(1)"
                },

                {
                    transform:"scale(1.12)"
                },

                {
                    transform:"scale(1)"
                }

            ],

            {
                duration:1200
            }

        );

    },3000);

}

/* ==========================================
   ACTIVE NAV LINK
========================================== */

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(".navbar ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 150;

        const sectionHeight =
        section.clientHeight;

        if(window.scrollY >= sectionTop){

            current =
            section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        const href =
        link.getAttribute("href");

        if(href === "#" + current){

            link.classList.add("active");

        }

    });

});

/* ==========================================
   PARALLAX HERO BACKGROUND
========================================== */

window.addEventListener("scroll", () => {

    const hero =
    document.querySelector(".hero");

    const scrollY =
    window.pageYOffset;

    hero.style.backgroundPositionY =
    scrollY * 0.5 + "px";

});

/* ==========================================
   PAGE READY ANIMATION
========================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

    document.body.classList.add("loaded");

});
/* ==========================================
   TESTIMONIAL SLIDER
========================================== */

const testimonialGrid =
document.querySelector(".testimonial-grid");

const testimonialCards =
document.querySelectorAll(".testimonial-card");

const prevBtn =
document.querySelector(".testimonial-prev");

const nextBtn =
document.querySelector(".testimonial-next");

if(
    testimonialGrid &&
    testimonialCards.length &&
    prevBtn &&
    nextBtn
){

    let currentIndex = 0;

    function getCardsPerView(){

        if(window.innerWidth <= 768){

            return 1;

        }else if(window.innerWidth <= 991){

            return 2;

        }else{

            return 3;

        }

    }

function updateSlider(){

    const gap =
    parseInt(
        getComputedStyle(testimonialGrid).gap
    );

    const cardWidth =
    testimonialCards[0].offsetWidth + gap;

    testimonialGrid.style.transform =
    `translateX(-${currentIndex * cardWidth}px)`;

}

    /* NEXT */

    nextBtn.addEventListener("click", () => {

        const cardsPerView =
        getCardsPerView();

        currentIndex += cardsPerView;

        if(
            currentIndex >=
            testimonialCards.length
        ){

            currentIndex = 0;

        }

        updateSlider();

    });

    /* PREVIOUS */

    prevBtn.addEventListener("click", () => {

        const cardsPerView =
        getCardsPerView();

        currentIndex -= cardsPerView;

        if(currentIndex < 0){

            currentIndex =
            testimonialCards.length -
            cardsPerView;

        }

        updateSlider();

    });

    /* RESET ON RESIZE */

    window.addEventListener("resize", () => {

        currentIndex = 0;

        updateSlider();

    });

    updateSlider();

}