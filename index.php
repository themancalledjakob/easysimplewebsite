<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head profile="http://www.w3.org/2005/10/profile">
  <link rel="icon" type="image/png" href="http://the-man-called-jakob.com/favicon.png">
<meta name="Jakob Schlötter" content="Design" />
<meta name="keywords" content="Jakob Schl&ouml;tter, Design, Utrecht, Den Haag, KABK, Jakob, Schloetter, Ontwerpen, Grafisch, Ontwerper, Megamieters" />
<meta name="description" content="The man called Jakob is a prestige design studio in Den Haag. It is very good. If you need a convincing Design Studio, you should try it. They design books, websites, animations, corporate identities, trailers and especially everything else that sounds interesting." />
    <script src="js/jquery-2.1.3.js"></script>
    <script src="js/jquery.easing.1.3.js"></script>
    <script src="js/main.js"></script>
    <link rel="stylesheet" type="text/css" href="styles/main.css">


</head><body>
<?php 
date_default_timezone_set('Europe/Amsterdam');

$path = 'projects/';
$projects = scandir($path);

$projectsdata = Array();

foreach ($projects as $project) {
    if ($project === '.' or $project === '..') continue;
    if (is_dir($path . '/' . $project))
		$projectsdata[] = collectThings($path,$project);
}

echo "<script>loadProjects(" . json_encode($projectsdata) . ");</script>"
?>
<!-- <div id="containter"> -->
<div id="contentainer">CONTENT</div>
<div id="animator"></div>
<!-- </div> -->
</body>
</html>
<?php // functions as tools

function collectThings($path,$project){
     // {
		$json = file_get_contents($path . '/' . $project . '/' . 'content.json');

		/* example json:
		{
		  "name":"uhuh",
		  "text":"bitches\\nyeeeee",
		  "videos":["https://vimeo.com/83897742","https://vimeo.com/83897742"]
		}
		*/

		$content = json_decode($json, true);
		$rawdate = preg_split("/[a-zA-Z\.\-\:]+/", $project);

		$content['date'] = date('M j, Y', mktime($rawdate[3], $rawdate[4], $rawdate[5], $rawdate[1], $rawdate[2], $rawdate[0]));

		$images = Array();
		$files = scandir($path . '/' . $project . '/');

		foreach ($files as $key => $value) {
			$extension = pathinfo($path . '/' . $project . '/' . $value, PATHINFO_EXTENSION);
			if( $extension !== 'png' ) continue;
				$image = Array();
				$image["src"] = $value;
				$image["size"] = getimagesize($path . '/' . $project . '/' . $value);
				$images[] = $image;
		}
		$content["images"] = $images;
		$content["imageSizes"] = $images;
		$content["folder"] = $project;
		return $content;
}

function println($string_message = '') {
        return isset($_SERVER['SERVER_PROTOCOL']) ? print "$string_message<br />" . PHP_EOL:
          print $string_message . PHP_EOL;
    }
?>
