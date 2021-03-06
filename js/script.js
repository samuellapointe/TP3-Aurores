﻿var map;
var globalData;

var mouseUpdate = function()
{
  return (
    function(coords) {
		var output = "";
		output += "Coordinates on map: " + ol.coordinate.toStringXY(coords,4);
	
		var probability = getProbabilityFromCoordinates(coords);
		
		output += "<br />Probability of seeing the ";
		output += coords[1] > 0 ? "northern" : "southern";
		output += " lights: ";
		output += probability;
		output += "%";
		
      return output;
  });        
}

function getProbabilityFromCoordinates(coords)
{
	// Between -180 and 180
	var normalizedPositionX = (coords[0] / 360) + 0.5;
	// Between -85 and 85
	var normalizedPositionY = (coords[1] / 180) + 0.5;
	
	// Grid position
	gridX = Math.floor(normalizedPositionX * 1024);
	gridY = Math.floor(normalizedPositionY * 512);
	
	if (gridX > 1024 || gridX < 0 || gridY > 512 || gridY < 0) 
	{
		return "Cursor outside the map bounds";
	}
	
	// Probability
	var probability = globalData[gridY][gridX];
	return probability;
}

function initMap() {
	var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: mouseUpdate(),
        projection: 'EPSG:4326',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
      });
	
	var attribution = new ol.Attribution({
		html: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
	});
	
	map = new ol.Map({
		controls: ol.control.defaults().extend([mousePositionControl]),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.XYZ({
					attributions: [
						attribution,
						ol.source.OSM.ATTRIBUTION
					],
					url: 'http://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
					wrapX: false
					})
				}),
		],
		target: 'map',
		view: new ol.View({
			center: [0, 10000000],
			zoom: 2
		})
	});
}

function renderData(data) {
	globalData = data;
	
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

