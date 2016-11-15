var map;

function initMap() {
	map = new ol.Map({
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM({
					wrapX: false
				})
			})
		],
		target: 'map',
		view: new ol.View({
			center: [0, 0],
			zoom: 2
		})
	});
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
				var movedX = (x + 512) % 1024;
				var movedY = 512 - y;
				context.fillRect(x, movedY, 1, 1);
			}
		}
	}
	
	var projection = ol.proj.get('EPSG:4326');
	var worldExtent = projection.getWorldExtent();
	
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

