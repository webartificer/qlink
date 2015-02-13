///////////////////////////////////////////////////////////
// B O O K M A R K   M A N A G E M E N T   L I B R A R Y //
///////////////////////////////////////////////////////////

var Bookmark = function(title, url, dateAdded, status){
  this.title = title;
  this.url = url;
  this.dateAdded = dateAdded;
  this.status = status;
  this.id = _.uniqueId();

};

/*
 * Populate DOM element for the bookmark instance
 * @return {jQuery} jQuery DOM element
 */

 $("#overlay_add .submit").on("click", function genMark(){
    // if ($("#name").val() === '') {
    //
    //     alert('Please enter a valid Bookmark Name');
    //
    // } else if ($("#url").val() === '') {
    //
    //     alert('Please enter a valid URL');
    //
    // } else {

        var title = $("#name").val();
        var url = $("#url").val();

        var currentTime = new Date();
        var NewBmark = new Bookmark(title,url, currentTime,true);
        //  $('.books').append(NewBmark.render());
        myCat1.addBookmark(NewBmark);
        $('.libraries').empty().append(myCat1.render());
        $('.libraries').append(myCat2.render());

        var new_name = $(this).siblings('#name').val();
        var new_url = $(this).siblings('#url').val();

        //var new_name = $(this).find('#name').text();
        console.log(new_name);
        console.log(new_url);

        //
        // $(document).find('.bookmark-title').text(new_name);
        // $(document).find('.bookmark-url').text(new_url);

        $(document).find('.bookmark-title').text(this.dataCounter);
        $('#overlay_add').css('display','none');
        $('#overlay_edit').css('display','none');

        $("#name").val('');
        $("#url").val('');



    // }

 });

var counter = 0;

Bookmark.prototype.render = function() {
  this.$el = $('#bookmark-template').clone()
    .attr('id', '').attr('data-id', counter).data('item',this);
    counter++;


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

Bookmark.prototype.update = function(title, url) {
    this.title = title;
    this.url = url;
    this.$el.find('.bookmark-title').text(this.title);
    this.$el.find('.bookmark-url').text(this.url);
    this.$el.find('a.goto-url').attr('href','http://' + this.url).attr('target', '_blank');
    console.log(title, url);

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

  this.bookmarks = this.bookmarks.concat([].slice.call(arguments));

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
var smashingMag = new Bookmark('Smashing Magazine', 'www.smashing.com', '12345', true);
var google = new Bookmark('Google', 'www.google.com', '12345', true);
var refactoru = new Bookmark('Refactor U','www.refactoru.com','12345',true);
var treehouse = new Bookmark('Treehouse', 'www.treehouse.com', '12345', true);
var microsoft = new Bookmark('Microsoft', 'www.microsoft.com', '12345', false);
var apple = new Bookmark('Apple','www.apple.com','12345',true);
var godaddy = new Bookmark('Godaddy', 'www.smashing.com', '12345', true);
var arcustech = new Bookmark('Arcustech', 'www.google.com', '12345', false);
var name_com = new Bookmark('Name.com','www.refactoru.com','12345',true);
var digitalocean = new Bookmark('Digital Ocean', 'www.treehouse.com', '12345', true);
var heroku = new Bookmark('Heroku', 'www.microsoft.com', '12345', true);
var mediatemple = new Bookmark('Media Temple','www.apple.com','12345',true);
var alistapart = new Bookmark('A List Apart', 'www.smashing.com', '12345', true);
var csstricks = new Bookmark('CSS Tricks', 'www.google.com', '12345', false);
var codrops = new Bookmark('Codrpops','www.refactoru.com','12345',true);
var designmodo = new Bookmark('Designmodo', 'www.treehouse.com', '12345', true);
var webtuts = new Bookmark('Web Tuts', 'www.microsoft.com', '12345', true);
var github = new Bookmark('Github','www.apple.com','12345',true);
var myCat2 = new Library('Category Two');
myCat2.addBookmark(smashingMag, google, refactoru, treehouse, microsoft, apple, godaddy, arcustech, name_com, digitalocean,
    heroku, mediatemple, alistapart, csstricks, codrops, designmodo, webtuts, github);


$(document).on('ready', function(){

  // Render our libraries
  $('.libraries').append(myCat1.render());
  $('.libraries').append(myCat2.render());

  // });
  $( document ).on( "click", ".edit", function( event ) {
       $('#overlay_edit').css('display','flex').data('item',$(this).closest('.book').data('item'));
       var old_title = $(this).siblings('.bookmark-title').text();
       var old_url = $(this).siblings('.bookmark-url').text();
       var dataCounter = $(this).closest('.book').attr('data-id');
       console.log($(this).closest('.book').data('item'));
    //    var old_title = $(this).siblings('.bookmark-title').text();
    console.log(old_title);
    console.log(old_url);
    console.log(dataCounter);


    $('#overlay_edit').find('#editname').val(old_title);
    $('#overlay_edit').find('#editurl').val(old_url);
    //    $('.modalAdd').css('display','none');
  });

  $( document ).on( "click", "#overlay_edit .submit", function( event ) {
       $('#overlay_add').css('display','none');
       $('#overlay_edit').css('display','none');
       var item = $(this).closest('#overlay_edit').data('item');
       item.update($('#editname').val(),$('#editurl').val());
  });

  $( document ).on( "click", ".cancel", function( event ) {
      $('#overlay_add').css('display','none');
      $('#overlay_edit').css('display','none');
  });

  $( document ).on( "click", ".addNewMark", function( event ) {
       $('#overlay_add').css('display','flex');
    //    $('.modalEdit').css('display','none');
  });

  setInterval(function () {

  var bookmarkcount = myCat2.bookmarks.length + myCat1.bookmarks.length;
  $('.collapse').empty().append('<span class="linkcount"><i class="fa fa-check-circle"></i> ' + bookmarkcount + ' </span><span class="badlinks"><i class="fa fa-exclamation-triangle"></i> 3 <span class="collapse">URLs are unresponsive</span></span>');
}, 10);

});
