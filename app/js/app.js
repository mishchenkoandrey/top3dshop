$(function() {
  const cities = {
    spb: '+7 (812) 613-58-38',
    moscow: '+7 (499) 999-99-99',
    kyiv: '+38 (999) 999-99-99',
  };
  const phoneLink = document.getElementById('phone-link');
  let city;
  $('.custom-select').on('change', function() {
    city = this.value;
    phoneLink.textContent = cities[city];
    phoneLink.setAttribute('href', `tel:${cities[city].replace(/[()-\s]/g, '')}`);
  });
  $(".flexnav").flexNav();
  $(".menu-button").click(function () {
    this.classList.toggle('active');
  });
  $('.flexslider').flexslider({
    slideshow: false,
    animation: "slide",
    animationLoop: false,
    itemWidth: 560,
    itemMargin: 60
  });
});
