///////////////////////////////////////////////////////////
// B O O K M A R K   M A N A G E M E N T   L I B R A R Y //
///////////////////////////////////////////////////////////

var Bookmark = function(title, url, dateAdded, status){
  this.title = title;
  this.url = url;
  this.dateAdded = dateAdded;
  this.status = status;
};

/*
 * Render a DOM element for the bookmark instance
 * @return {jQuery} jQuery DOM element
 */



 $(".submit").on("click", function genMark(e){
    if ($("#name").val() || $("#url").val() === '') {



    var title = $("#name").val();
    var url = $("#url").val();
    e.preventDefault();

    var currentTime = new Date();
    // var hours = currentTime.getHours();
    // var minutes = currentTime.getMinutes();
    // if (minutes < 10){
    //     minutes = "0" + minutes;
    // }
    // var theTime = hours + "" + minutes;


    var NewBmark = new Bookmark(title,url, currentTime,true);
    //  $('.books').append(NewBmark.render());
    myCat1.addBookmark(NewBmark);
    $('.libraries').empty().append(myCat1.render());
} else {
    alert('oh shit');
}

 });





Bookmark.prototype.render = function() {
  this.$el = $('#bookmark-template').clone()
    .attr('id', '');

  // Inject instance data into template
  this.$el.find('.bookmark-title').text(this.title);
  this.$el.find('.bookmark-url').text(this.url);
  this.$el.find('a.goto-url').attr('href','http://' + this.url).attr('target', '_blank');
  this.$el.find('.bookmark-date').text(this.dateAdded);

  if (this.status === true) {
      this.$el.find('.bookmark-status').html('<i class="fa fa-bookmark"></i>');
  } else {
      this.$el.find('.bookmark-status').html('<i class="fa fa-bookmark"></i>').addClass('broken');
  }


  return this.$el;
};

/**
 * Library of bookmarks
 * @param {string} catName What is the library category?
 */
var Library = function(catName){
  this.catName = catName;
  this.bookmarks = [];
};

/**
 * Helper for adding bookmarks to a given library
 * @param {...} bookmarks Bookmarks to add
 */
Library.prototype.addBookmark = function() {
  // concat is non-destructive, so we need to re-assign
  // to its result. This overrides the original value
  // with the new set
  this.bookmarks = this.bookmarks.concat([].slice.call(arguments));

  // If this was set up for just being 'addBook,' we
  // could just use:
  // this.books.push(book);
};

/**
 * Render a library, which, in turn, will render
 * its books.
 */
Library.prototype.render = function() {
  this.$el = $('#category-template').clone()
    .attr('id', '');

  // Inject instance data into template
  this.$el.find('.cat-name').text(this.catName);

  // Render each book in this library
  this.$el.find('.books').empty().append(
    this.bookmarks.map(function(bookmark){
      // Render the individual bookmark and
      // store it in the mapped array
      return bookmark.render();
    })
  );

  return this.$el;
};






// Library 1:
var smashingMag = new Bookmark('Smashing Magazine', 'www.smashing.com', '12345', true);
var myCat1 = new Library('Category One');
myCat1.addBookmark(smashingMag);

// Library 2:
// var smashingMag = new Bookmark('Smashing Magazine', 'www.smashing.com', '12345', true);
// var google = new Bookmark('Google', 'www.google.com', '12345', false);
// var refactoru = new Bookmark('Refactor U','www.refactoru.com','12345',true);
// var treehouse = new Bookmark('Treehouse', 'www.treehouse.com', '12345', true);
// var microsoft = new Bookmark('Microsoft', 'www.microsoft.com', '12345', false);
// var apple = new Bookmark('Apple','www.apple.com','12345',true);
// var myCat2 = new Library('Category Two');
// myCat2.addBookmark(smashingMag, google, refactoru, treehouse, microsoft, apple);


$(document).on('ready', function(){

  // Render our libraries
  $('.libraries').append(myCat1.render());
  // $('.libraries').append(myCat2.render());
  //
  //
  // $('.edit').click(function() {
  //     $('#overlay').css('display','flex');
  // });

  // $('.cancel').click(function() {
  //     $('#overlay').css('display','none');
  // });

  // $('#overlay').click(function() {
  //     $(this).hide();
  //     $('#modal').hide();
  // });

  $( document ).on( "click", ".edit", function( event ) {
       $('#overlay').css('display','flex');
  });

});
