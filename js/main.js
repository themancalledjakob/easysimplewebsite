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

// function flip(){
	// $("#contentainer").animate({ whyNotToUseANonExistingProperty: -90 }, {
	//     step: function(now,fx) {
	//         allBrowserFlip(this,now);
	//     },
	//     duration:500,
	//     complete: function(){
	//     	current[1] += 1;
	//     	showImage(current[0],current[1]);
	//     	$(this).animate({ whyNotToUseANonExistingProperty: 90 }, {
	// 		    step: function(now,fx) {
	// 		        allBrowserFlip(this,now);
	// 		    },
	// 		    duration:0,
	// 		    complete: function(){
	// 		    	centerHack();
	// 		    	$(this).animate({ whyNotToUseANonExistingProperty: 0 }, {
	// 				    step: function(now,fx) {
	// 				        allBrowserFlip(this,now);
	// 				    },
	// 				    duration:500,
	// 				    complete: function(){
	// 				    	bFlip = true;
	// 				    	console.log("flipped to " + flipX)
	// 				    }
	// 				},'swing');
	// 		    }
	// 		},'linear');
	//     }
	// },'swing');
// }

function allBrowserFlip(thisThing,now){
      $(thisThing).css('-webkit-transform',"perspective( 600px ) rotateX( " + now + "deg )");
      $(thisThing).css('-moz-transform',"perspective( 600px ) rotateX( " + now + "deg )");
      $(thisThing).css('-o-transform',"perspective( 600px ) rotateX( " + now + "deg )");
      $(thisThing).css('transform',"perspective( 600px ) rotateX( " + now + "deg )");
}

function centerHack(id){
	var aWidth = $(id).attr('data-width');
	var aHeight = $(id).attr('data-height');
	var pWidth = width; //$('#contentainer').outerWidth();
	var pHeight = height; //$('#contentainer').outerHeight();
	var aRatio = aWidth/aHeight;
	var docRatio = pWidth/pHeight;

	if(aRatio > docRatio){
		// image is wider
		$(id).width(width);
		var newHeight = pWidth*aHeight/aWidth;
		$(id).height(newHeight);
		// var off = (pHeight - newHeight)/2;
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
     if(e.originalEvent.detail > 0) {
         //scroll down
         console.log('Down');
     }else {
         //scroll up
         console.log('Up');
     }
     //prevent page fom scrolling
     return false;
 });


 //IE, Opera, Safari
 $(window).bind('mousewheel', function(e){
 	if(bFlip){
 		$('body').stop();
	    flipItX( e.originalEvent.wheelDelta * 0.012);
    	$('body').animate({ whyNotToUseANonExistingProperty: 0 }, {
		    step: function(now,fx) {
		    },
		    duration:70,
		    complete: function(){
		    	var goal = flipX < 90 ? 0 : flipX < 180 ? 180 : flipX < 270 ? 180 : 360;
		    	var duration = Math.abs(flipX-goal)*6;
		    	flipTo(goal,duration);
		    }
		},'swing');
 	}
     return false;
 });
}

var stopped = false;
var invert = '';
function flipItX(dir){
	flipX += dir;
	var dir = flipX > 0 ? 1 : -1; 
	flipX = Math.abs(360+flipX)%360;
	// flipX *= dir;
	allBrowserFlip($("#contentainer"),flipX);

	var isFlippedX = Math.abs( Math.abs(flipX%180) - Math.abs(lastFlipX%180) ) > 90 || lastFlipX * flipX < 0 ? true : false;
	if( isFlippedX){
		// $('body').css('background-image', 'url(img/okay' + invert + '.png)');
		// $('body').css('background-color', 'rgba(' + Math.floor(Math.random()*105+150) + ',' + Math.floor(Math.random()*105+150) + ',' + Math.floor(Math.random()*105+150) + ',1)');
		if(invert.indexOf('_i') >= 0)
			invert = '';
		else
			invert = '_i';
	}

	var isTurnedX = Math.abs( (Math.abs(flipX+90)%180) - (Math.abs(lastFlipX+90)%180) ) > 90 || Math.abs( (Math.abs(flipX+90+180)%180) - (Math.abs(lastFlipX+90+180)%180) ) > 90 ? true : false;
	if(isTurnedX){
		console.log('look away');
 		current[ENUM_IMAGE]++;
		current[ENUM_IMAGE]%=projects[current[ENUM_PROJECT]].images.length;
		showImage(current[ENUM_PROJECT],current[ENUM_IMAGE]);
		centerHack("#projectImage" + current[ENUM_IMAGE]);
		flipX += 180;
		flipX %= 360;
		allBrowserFlip($("#contentainer"),flipX);
	}

	lastFlipX = flipX;
}

function flipTo(goal,_duration){
	console.log("flipX" + flipX);
	bFlip = false;
	$("#animator").css('font-size', flipX).animate({ fontSize: goal }, {
	    duration: _duration,
	    // easing: 'easeInOutBounce',
	    step: function(now,fx) {
	        allBrowserFlip($('#contentainer'),now);
	    },
	    complete: function(){
	    	flipX = goal;
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