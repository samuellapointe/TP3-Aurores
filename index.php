<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>TODO</title>
        <link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/ol.css" />
		<script type="text/javascript" src="js/ol.js"></script>
		<script type="text/javascript" src="js/script.js"></script>
    </head>
    
    <body>
		<!-- This div contains the map, empty at this point -->
		<div id="map" class="map"></div>
		
		<br />
		<canvas style="display: none" id="myCanvas" width="1024" height="512"></canvas>
		<div id="mouse-position"></div>
		
		<!-- Initialize the map -->
		<script type="text/javascript">initMap();</script>
		
		<!-- Get the aurora data in JS -->
		<script type="text/javascript">
			var data = <?php include 'parseData.php';?>;
			renderData(data);
		</script>
		
    </body>
</html>
