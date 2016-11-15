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
}

function renderData2(data) {
	var context = document.getElementById("myCanvas").getContext("2d");
	context.fillStyle = "rgba(0, 0, 0, 1)";
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
}

// Generate a color from a 0 to 100 value in a green to red gradient
// Function taken from http://stackoverflow.com/a/17268489
function generateColorFromValue(value) {
	normalizedValue = value / 100; // Normalize
	var hue=((1-normalizedValue)*120).toString(10);
	
	// Get luminosity gradient from 0 to 50
	var luminosity = value;
	luminosity = luminosity > 50 ? 50 : luminosity; // Cap at 50%
	luminosity = luminosity.toString(10) + "%";

    return ["hsl(" + hue + ",100%," + luminosity + ")"].join("");
}

function renderData(data) {
	var extent = map.getView().calculateExtent(map.getSize());

	var extentWidth = ol.extent.getWidth(extent);
	var extentHeight = ol.extent.getHeight(extent);
	var topLeft = ol.extent.getTopLeft(extent);

	var dataWidth = extentWidth / 1024;
	var dataHeight = extentHeight / 512;

	var vectorSource = new ol.source.Vector();
	var multiPolygon = new ol.geom.MultiPolygon([]);	

	for (var y = 0; y < 51; y++) {
		for (var x = 0; x < 102; x++) {
			var rectTopLeft = [topLeft[0] + dataWidth * x, topLeft[1] + dataHeight * y];
			var rectBottomRight = [rectTopLeft[0] + dataWidth, rectTopLeft[1] + dataHeight];
			var rectExtent = [rectTopLeft[0], rectTopLeft[1], rectBottomRight[0], rectBottomRight[1]];
			
			var geom = ol.geom.Polygon.fromExtent(rectExtent);
			multiPolygon.appendPolygon(geom);
		}
	}

	var feature = new ol.Feature({
		geometry: multiPolygon
	});

	vectorSource.addFeature(feature);

	var vectorLayer = new ol.layer.Vector({
		source: vectorSource
	});

	map.addLayer(vectorLayer);
}
