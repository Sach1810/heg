$(window).resize(function(){
  if ($(window).width() >= 650 & $('#mobile-nav').is(':visible')){  
    $('#mobile-nav').slideUp('fast');
  } 
});

$('#bars').click(function(){

if ($('#mobile-nav').is(':visible')){
  $('#mobile-nav').slideUp('slow');
} else {
  $('#mobile-nav').slideDown('slow');
}

});

function fix()
{
    var el = this;
    var par = el.parentNode;
    var next = el.nextSibling;
    par.removeChild(el);
    setTimeout(function() {par.insertBefore(el, next);}, 0)
}
