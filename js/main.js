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
	$('#contentainer').html("YYYYYYEAH");

	$.each(projects, function(i, obj) {
  //use obj.id and obj.name here, for example:
		console.log(obj.date);
	});
	current[0] = 1;
	current[1] = 0;
	showProject(current[0]);
	layout();
	setupScrolling();
};

function layout(){
	width = $(document).outerWidth();
	height = $(document).outerHeight();
	$('#contentainer').width(width);
	$('#contentainer').height(height);
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
	$('#contentainer').html(getImageTag(p,i));
}

function getImageTag(p,i){
	return '<img id="active" src="../projects/' + projects[p].folder + '/' + projects[p].images[i].src + '" data-width="' + projects[p].images[i].size[0] + '" data-height="' + projects[p].images[i].size[1] + '">';
}

function flip(){
	$("#contentainer").animate({ whyNotToUseANonExistingProperty: -90 }, {
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
					    	bFlip = true;
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
	var pWidth = width; //$('#contentainer').outerWidth();
	var pHeight = height; //$('#contentainer').outerHeight();
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
var lastFlipX = 0;
var flipX = 0;
var bFlip = true;
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
 	// console.log(e);
     // if(e.originalEvent.wheelDelta < 0) {
     //     //scroll down
     //     // console.log('Down');
     //  //    if(bFlip){
	    // 	// bFlip = false;
     //  //    	flip();
     //  //    }
     //     flipItX(1);
     // }else {
     //     //scroll up
     //     // console.log('Up');
     //     flipItX(-1);
     // }

         flipItX( e.originalEvent.wheelDelta * 0.012);

	// console.log(e.originalEvent.wheelDelta);
     //prevent page fom scrolling
     return false;
 });
}

var stopped = false;
var invert = '';
function flipItX(dir){
	flipX += dir;
	var dir = flipX > 0 ? 1 : -1; 
	flipX = Math.abs(flipX)%360;
	flipX *= dir;
	allBrowserFlip($("#contentainer"),flipX);

	var isFlipped = Math.abs( Math.abs(flipX%180) - Math.abs(lastFlipX%180) ) > 90 || lastFlipX * flipX < 0 ? true : false;
	if( isFlipped){
		// $('body').css('background-image', 'url(img/okay' + invert + '.png)');
		$('body').css('background-color', 'rgba(' + Math.floor(Math.random()*105+150) + ',' + Math.floor(Math.random()*105+150) + ',' + Math.floor(Math.random()*105+150) + ',1)');
		if(invert.indexOf('_i') >= 0)
			invert = '';
		else
			invert = '_i';
	}

	var isTurned = Math.abs( (Math.abs(flipX+90)%180) - (Math.abs(lastFlipX+90)%180) ) > 90 || Math.abs( (Math.abs(flipX+90+180)%180) - (Math.abs(lastFlipX+90+180)%180) ) > 90 ? true : false;
	if(isTurned){
		console.log('look away');
 		// current[0]++;
		// current[0]%=2;
		// showImage(current[0],current[1]);
		// centerHack();
		// if( $('#active').css('display') === 'block' ){
		// 	$('#active').css('display','none');
		// } else {
		// 	$('#active').css('display','block');
		// }
		// flipTo(0,1000);
	}

	lastFlipX = flipX;
}

function flipTo(goal,_duration){
	$("#contentainer").animate({ whyNotToUseANonExistingProperty: goal }, {
	    step: function(now,fx) {
	        allBrowserFlip(this,now);
	    },
	    duration:_duration,
	    complete: function(){
	    	// bFlip = true;
	    }
	},'linear');
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