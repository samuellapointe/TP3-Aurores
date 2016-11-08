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
	context.fillStyle = "rgba(0, 0, 0.25, 1)";
	context.fillRect(0, 0, 1024, 512);

	for (var y = 0; y < 512; y++) {
		for (var x = 0; x < 1024; x++) {
			if (data[y][x] != 0) {
				var fillString = "rgba(" + data[y][x] * 8 + ", " + data[y][x] * 32 + ", 1, 1)";
				context.fillStyle = fillString;
				context.fillRect(x, y, 1, 1);
			}
		}
	}
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
