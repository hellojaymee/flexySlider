// =============================================================================
//	Imports
// =============================================================================
$(document).ready(function() {


}); // end document ready






function flexyslider(container, slide) {

  var containerLength = $(container).find( $(slide) ).length;
  var currentActiveSlide = 1;
  var preppingNegative = 0;
  var preppingPositive = 0;


  updatePositions();


  function logPositions() {
    // console.log('container length'+containerLength);
    // console.log('negative'+preppingNegative);
    console.log('curslide'+currentActiveSlide);
    // console.log('positive'+preppingPositive);
  }


  function updateClasses() {
    container.find($(slide)).attr('data-slide-position', '');
    container.find($(slide)).eq(preppingNegative-1).attr('data-slide-position', 'prev');
    container.find($(slide)).eq(currentActiveSlide-1).attr('data-slide-position', 'active');
    container.find($(slide)).eq(preppingPositive-1).attr('data-slide-position', 'next');
  }


  function updatePositions() {
    //negative
    if (currentActiveSlide > 1) {
      preppingNegative = currentActiveSlide-1;
    }
    else {
      preppingNegative = containerLength;
    }

    //positive
    if (currentActiveSlide < containerLength) {
      preppingPositive = currentActiveSlide+1;
    }
    else {
      preppingPositive = 1;
    }

    updateClasses();
    logPositions();

  }


  function prevSlide() {
    if (currentActiveSlide > 1) {
      currentActiveSlide--;
    }
    else {
      currentActiveSlide = containerLength;
    }
    updatePositions();
  }


  function nextSlide() {
    if (currentActiveSlide < containerLength) {
      currentActiveSlide++;
    }
    else {
      currentActiveSlide = 1;
    }
    updatePositions();
  }





  $('.slider-nav--prev').on('click', function(e){
    e.preventDefault();
    prevSlide();
  });


  $('.slider-nav--next').on('click', function(e){
    e.preventDefault();
    nextSlide();
  });


  // clicking needs to reset timer
  setInterval(function() {
    nextSlide();
  }, 7000);



}


flexyslider($('.spotlight-container ul'), 'li');










