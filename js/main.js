var projects = [];

var width;
var height;

var current = [];

$(function(){
	init();
});

function init() {

	width = $(document).outerWidth();
	height = $(document).outerHeight();

	console.log('congratulations! you are here, doing this!')
	$('#content').html("YYYYYYEAH");

	$.each(projects, function(i, obj) {
  //use obj.id and obj.name here, for example:
		console.log(obj.date);
	});
	current[0] = 1;
	current[1] = 0;
	showProject(current[0]);
	layout();
};

function layout(){
	width = $(document).outerWidth();
	height = $(document).outerHeight();
	$('#content').width(width);
	$('#content').height(height);
	centerHack();
}

function showProject(p){
	// $.each(projects[i].images, function(i, obj) {
		preloadIMAGES(projects[p]);

	// });
	showImage(p,0);
	centerHack();
	flip();
}

function showImage(p,i){
	$('#content').html(getImageTag(p,i));
}

function getImageTag(p,i){
	return '<img id="active" src="../projects/' + projects[p].folder + '/' + projects[p].images[i].src + '" data-width="' + projects[p].images[i].size[0] + '" data-height="' + projects[p].images[i].size[1] + '">';
}

function flip(){
	$("#content").animate({ whyNotToUseANonExistingProperty: -90 }, {
	    step: function(now,fx) {
	        allBrowserFlip(this,now);
	    },
	    duration:500,
	    complete: function(){
	    	current[1] += 1;
	    	showImage(current[0],current[1]);
	    	$(this).animate({ whyNotToUseANonExistingProperty: 90 }, {
			    step: function(now,fx) {
			        allBrowserFlip(this,now);
			    },
			    duration:0,
			    complete: function(){
			    	centerHack();
			    	$(this).animate({ whyNotToUseANonExistingProperty: 0 }, {
					    step: function(now,fx) {
					        allBrowserFlip(this,now);
					    },
					    duration:500,
					    complete: function(){
					    }
					},'swing');
			    }
			},'linear');
	    }
	},'swing');
}

function allBrowserFlip(thisThing,now){
      $(thisThing).css('-webkit-transform',"perspective( 600px ) rotateX( " + now + "deg )");
      $(thisThing).css('-moz-transform',"perspective( 600px ) rotateX( " + now + "deg )");
      $(thisThing).css('-o-transform',"perspective( 600px ) rotateX( " + now + "deg )");
      $(thisThing).css('transform',"perspective( 600px ) rotateX( " + now + "deg )");
}

function centerHack(){
	var aWidth = $("#active").attr('data-width');
	var aHeight = $("#active").attr('data-height');
	var pWidth = width; //$('#content').outerWidth();
	var pHeight = height; //$('#content').outerHeight();
	var aRatio = aWidth/aHeight;
	var docRatio = pWidth/pHeight;

	if(aRatio > docRatio){
		// image is wider
		$("#active").width(width);
		var newHeight = pWidth*aHeight/aWidth;
		$("#active").height(newHeight);
		// var off = (pHeight - newHeight)/2;
		$("#active").css("top", off);
		$("#active").css("left", 0);
	} else {
		// image is higher
		$("#active").height(height);
		var newWidth = pHeight*aWidth/aHeight;
		$("#active").width(newWidth);
		var off = (pWidth - newWidth)/2;
		// $("#active").css({ "top": 0, "left": 0 });
		$("#active").css("top", 0);
		$("#active").css("left", off);
	}
}

// TOOLS

function preloadIMAGES(project) {
    $(project.images).each(function(){
        console.log('preloading image: ../projects/' + project.folder + '/' + this.src);
        $('<img/>')[0].src = '../projects/' + project.folder + '/' + this.src;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

// Usage:

function loadProjects(_projects){
	// is called from php
	projects = _projects;
}