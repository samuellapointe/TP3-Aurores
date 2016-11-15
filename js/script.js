var map;

function initMap() {
	map = new ol.Map({
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		target: 'map',
		view: new ol.View({
			center: [0, 0],
			zoom: 2
		})
	});
	proj4.defs("EPSG:3410","+proj=cea +lon_0=0 +lat_ts=30 +x_0=0 +y_0=0 +a=6371228 +b=6371228 +units=m +no_defs");
}

function renderData(data) {
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	context.fillStyle = "rgba(0, 0, 0, 0)";
	context.fillRect(0, 0, 1024, 512);

	for (var y = 0; y < 512; y++) {
		for (var x = 0; x < 1024; x++) {
			if (data[y][x] != 0) {
				var fillString = generateColorFromValue(data[y][x]);
				context.fillStyle = fillString;
				context.fillRect(x, y, 1, 1);
			}
		}
	}
	
	var projection = ol.proj.get('EPSG:4326');
	console.log(projection);
	var worldProjection = ol.proj.get('EPSG:4326');
	var worldExtent = worldProjection.getWorldExtent();
	
	var imageLayer = new ol.layer.Image({
		source: new ol.source.ImageStatic({
			imageExtent: worldExtent,
			projection: projection,
			url: canvas.toDataURL()
		})
	});

	map.addLayer(imageLayer);
}

// Generate a color from a 0 to 100 value in a green to red gradient
// Function taken from http://stackoverflow.com/a/17268489
function generateColorFromValue(value) {
	normalizedValue = value / 100; // Normalize
	var hue=((1-normalizedValue)*120).toString(10);
	
	// Get alpha gradient from 0 to 50
	var alpha = normalizedValue * 3;
	alpha = alpha > 1 ? 1 : alpha;

    return ["hsla(" + hue + ",100%,50%," + alpha + ")"].join("");
}

