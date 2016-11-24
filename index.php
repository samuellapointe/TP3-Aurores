<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
		<!-- Bootstrap -->
		<link href="css/bootstrap.min.css" rel="stylesheet">
		
        <link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/ol.css" />
		<script type="text/javascript" src="js/ol.js"></script>
		<script type="text/javascript" src="js/script.js"></script>
		
		<title>TODO</title>
    </head>
    
    <body>
		<nav class="navbar navbar-inverse">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="#">frosty.space/aurora</a>
				</div>
			</div>
		</nav>
		
		<div id="content" class="container">
			<div class="row">
				<div class="col-md-6">
					<h2> Aurora viewer </h2>
					<p>This map shows the probability of having a visible 
					aurora across the earth, assuming good viewing conditions. 
					The data is prepared by the U.S. Dept. of Commerce, NOAA, 
					Space Weather Prediction Center. </p>
					<p>The scale goes from transparent (no visible aurora) to 
					green for low probability, yellow for medium probability 
					and red for high probability.</p>
					</p>You can also hover over the map to see the estimated 
					probability of visible aurora, given good viewing 
					conditions. These will appear under the map.
					</p>
					
					<h3>Coming soon</h3>
					<p>Set a point on the map as well as a desired threshold, 
					and receive an email when the probability of having a 
					visible aurora reaches that threshold!
					</p>
				</div>
				<div class="col-md-6">
					<!-- This div contains the map, empty at this point -->
					<div id="map" class="map"></div>
					
					<br />
					<canvas style="display: none" id="myCanvas" width="1024" height="512"></canvas>
					<div id="mouse-position" class="well"></div>
					
					<!-- Initialize the map -->
					<script type="text/javascript">initMap();</script>
					
					<!-- Get the aurora data in JS -->
					<script type="text/javascript">
						var data = <?php include 'parseData.php';?>;
						renderData(data);
					</script>
				</div>
			</div>
		</div>
		
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="js/bootstrap.min.js"></script>
    </body>
</html>
