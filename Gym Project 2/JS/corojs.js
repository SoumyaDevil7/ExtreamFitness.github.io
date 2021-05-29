const track = document.querySelector('.carousel-track') ;
const slides= Array.from(track.children) ;
const nextButton = document.querySelector('#carousel-right');
const previousButton = document.querySelector('#carousel-left');
const dotsNav = document.querySelector('.carousl-nav') ;
const dots= Array.from(dotsNav.children) ;

const slideSize = slides[0].getBoundingClientRect() ; 
const slideWidth = slideSize.width ;
//or we can do 
//                const slideSize = slides[0].getBoundingClientRect().width ; 
//console.log(slideSize.width) ;

//arrange slides next to one another
/* slides[0].style.left = slideWidth *0 + 'px';
slides[1].style.left = slideWidth *1 + 'px';
slides[2].style.left = slideWidth *2 + 'px'; */

const setSlidePosition =(slides, index) => {
    slides.style.left= slideWidth * index + 'px' ;
}

slides.forEach(setSlidePosition) ;

const moveToSlide= (track , currentSlide , targetSlide ) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')' ;
    currentSlide.classList.remove('current-slide') ;
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot , targetDot ) => {
    currentDot.classList.remove('current-slide') ;
    targetDot.classList.add('current-slide') ; 
}

const hideShowArrows = (slides , previousButton , nextButton , targetIndex) => {
    if(targetIndex===0) {
        previousButton.classList.add('is-hidden') ;
        nextButton.classList.remove('is-hidden') ;
    }
    else if (targetIndex === slides.length - 1 ) {
        previousButton.classList.remove('is-hidden') ;
        nextButton.classList.add('is-hidden') ;
    }
    else {
        previousButton.classList.remove('is-hidden') ;
        nextButton.classList.remove('is-hidden') ;
    }
}

//I click left, slides to the left
previousButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide') ;
    const previousSlide = currentSlide.previousElementSibling ;
    const currentDot = dotsNav.querySelector('.current-slide') ;
    const previousDot = currentDot.previousElementSibling ;
    const previousIndex = slides.findIndex(slide => slide=== previousSlide) ;

    moveToSlide(track , currentSlide , previousSlide) ;
    updateDots(currentDot , previousDot) ;
    hideShowArrows(slides , previousButton , nextButton , previousIndex) ;
})

//I click right, slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide') ;
    const nextSlide = currentSlide.nextElementSibling ;
    const currentDot = dotsNav.querySelector('.current-slide') ;
    const nextDot = currentDot.nextElementSibling ;
    const nextIndex = slides.findIndex(slide => slide=== nextSlide) ;

    moveToSlide(track , currentSlide , nextSlide) ;
    updateDots(currentDot , nextDot) ;
    hideShowArrows(slides , previousButton , nextButton , nextIndex) ;
})

//I click nav indicator, move to the slides
dotsNav.addEventListener('click' , e => {
    const targetDot = e.target.closest('button') ;


    if(!targetDot) return ;
    const currentSlide = track.querySelector('.current-slide') ; 
    const currentDot = dotsNav.querySelector('.current-slide') ; 
    const targetIndex = dots.findIndex(dot => dot === targetDot) ;
    const targetSlide = slides[targetIndex] ;

    moveToSlide(track , currentSlide , targetSlide) ;

    updateDots(currentDot , targetDot) ;
    hideShowArrows(slides , previousButton , nextButton , targetIndex) ;
    
})

$(document).ready(function() 
{
    $(".menu-icon").on("click", function() {
          $("nav ul").toggleClass("showing");
    });
}); 

// Scrolling Effect

$(window).on("scroll", function() 
{
    if($(window).scrollTop()) {
          $('nav').addClass('black');
    }

    else {
          $('nav').removeClass('black');
    }
})