var projects = [];

var width;
var height;

var current = [];

var ENUM_PROJECT = 0;
var ENUM_IMAGE = 1;


var lastFlipX = 0;
var flipX = 0;
var bFlip = true;


$(function(){
	init();
});

function init() {
	width = $(document).outerWidth()-200;
	height = $(document).outerHeight();

	console.log('congratulations! you are here, doing this!')
	$('#contentainer').html("YYYYYYEAH");

	$.each(projects, function(i, obj) {
  //use obj.id and obj.name here, for example:
		console.log(obj.date);
	});
	current[ENUM_PROJECT] = 1;
	current[ENUM_IMAGE] = 0;
	showProject(current[ENUM_PROJECT]);

	layout();
	setupScrolling();
};

function layout(){
	width = $(document).outerWidth();
	height = $(document).outerHeight();
	$('#contentainer').width(width-200);
	$('#contentainer').height(height);
	centerHack();
}

function showProject(p){
	// $.each(projects[i].images, function(i, obj) {
	preloadIMAGES(projects[p]);

	// });
	
	showImage(p,0);
	centerHack();
	// flip();

}

function showImage(p,i){
	// $('#contentainer').html(getImageTag(p,i));
	$('.projectImage').hide();
	$('#projectImage' + i).show(0);
}

function getImageTag(p,i){
	return '<img id="projectImage' + i + '" class="projectImage" src="../projects/' + projects[p].folder + '/' + projects[p].images[i].src + '" data-width="' + projects[p].images[i].size[0] + '" data-height="' + projects[p].images[i].size[1] + '">';
}

function allBrowserFlip(thisThing,now){
      $(thisThing).css('-webkit-transform',"perspective( 600px ) rotateX( " + now + "deg )");
      $(thisThing).css('-moz-transform',"perspective( 600px ) rotateX( " + now + "deg )");
      $(thisThing).css('-o-transform',"perspective( 600px ) rotateX( " + now + "deg )");
      $(thisThing).css('transform',"perspective( 600px ) rotateX( " + now + "deg )");
}

function centerHack(id){
	var aWidth = $(id).attr('data-width');
	var aHeight = $(id).attr('data-height');
	var pWidth = width-200; //$('#contentainer').outerWidth();
	var pHeight = height; //$('#contentainer').outerHeight();
	var aRatio = aWidth/aHeight;
	var docRatio = pWidth/pHeight;

	if(aRatio > docRatio){
		// image is wider
		$(id).width(pWidth);
		var newHeight = pWidth*aHeight/aWidth;
		$(id).height(newHeight);
		var off = (pHeight - newHeight)/2;
		$(id).css("top", off);
		$(id).css("left", 0);
	} else {
		// image is higher
		$(id).height(height);
		var newWidth = pHeight*aWidth/aHeight;
		$(id).width(newWidth);
		var off = (pWidth - newWidth)/2;
		// $("#active").css({ "top": 0, "left": 0 });
		$(id).css("top", 0);
		$(id).css("left", off);
	}
}
function setupScrolling(){

	//  //Firefox
 $(window).bind('DOMMouseScroll', function(e){
 	console.log(e);
     // //prevent page fom scrolling
     if(bFlip){
 		$('body').stop();
 		var goal = e.originalEvent.detail > 0 ? 180 : -180;
 		flipX = 0;
 		flipTo(goal,1000); 
     }

     return false;
 });


 //IE, Opera, Safari
 $(window).bind('mousewheel', function(e){
 	if(bFlip){
 		$('body').stop();
 		var goal = e.originalEvent.wheelDelta > 0 ? 180 : -180;
 		flipX = 0;
 		flipTo(goal,1000); 
 	}
     return false;
 });
}

function flipTo(goal,_duration){
	console.log("flipX " + goal);
	bFlip = false;
	var plus = 0;
	var nextImageLoaded = false;
	$("#animator").css('font-size', flipX).animate({ fontSize: goal }, {
	    duration: _duration,
	    // easing: 'easeInOutBounce',
	    step: function(now,fx) {
	    	if ( Math.abs(now) >= Math.abs(goal)*0.5 && !nextImageLoaded ){
		 		current[ENUM_IMAGE]++;
				current[ENUM_IMAGE]%=projects[current[ENUM_PROJECT]].images.length;
				showImage(current[ENUM_PROJECT],current[ENUM_IMAGE]);
				centerHack("#projectImage" + current[ENUM_IMAGE]);
	    		nextImageLoaded = true;
	    		plus = 180;
	    	}
	        allBrowserFlip($('#contentainer'),now+plus);
	    },
	    complete: function(){
	    	flipX = goal +plus;
			$("#animator").css('font-size', 0.0).animate({ fontSize: 1.0 }, {
			    duration: 200,
			   	complete: function(){
			    	bFlip = true;
			    }
			},'linear');
	    }
	},'swing');
}

// TOOLS

function preloadIMAGES(project) {
	var index = 0;
    $(project.images).each(function(){
        console.log('preloading image: ../projects/' + project.folder + '/' + this.src);
        $('<img/>')[0].src = '../projects/' + project.folder + '/' + this.src;
        $('#contentainer').append(getImageTag(current[ENUM_PROJECT],index));//'<img class="projectImage" id="projectImage' + index + '" src="' + '../projects/' + project.folder + '/' + this.src + '" >');
        $('#projectImage' + index).outerWidth(width).outerHeight(height);
        // Alternatively you could use:
        // (new Image()).src = this;
        index++;
    });
}

// Usage:

function loadProjects(_projects){
	// is called from php
	projects = _projects;
}