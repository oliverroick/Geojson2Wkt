/**
 * Geojson2Wkt
 * @author Oliver Roick <https://github.com/oliverroick>
 * @version 0.0.1
 * Date: 11/14/2012
 * Homepage: https://github.com/oliverroick/geo-converter
 */

var Geojson2Wkt = (function(){
	var instance;
	
	/*
	 * Constructor
	 */
	function geojson2Wkt() {
		
	}

	/*
	 * Returns string containing the coordinates of a point geometry
	 */
	var parsePointGeometry = function(coordinates) {
		return [coordinates[0], coordinates[1]].join(' ');
	}

	/*
	 * 
	 */
	var parseMultiPointGeometry = function(coordinates) {
		var multipointWkt = [];
		for (var i = 0; i < coordinates.length; i++) {
			multipointWkt.push(parsePointGeometry(coordinates[i]));
		}
		return multipointWkt.join(', ');
	}

	/*
	 * Returns string containing the coordinates of a line geometry. Breaks coordinates array into single 
	 * latitude-/longitude pairs and uses parsePointGeometry to parse node.
	 */
	var parseLineGeometry = function(coordinates) {
		var lineWkt = [];
		for (var i = 0; i < coordinates.length; i++) {
			lineWkt.push(parsePointGeometry(coordinates[i]));
		}
		return lineWkt.join(', ');
	}

	/*
	 *
	 */
	var parseMultiLineGeometry = function(coordinates) {
		var multiLineWkt = [];
		for (var i = 0; i < coordinates.length; i++) {
			multiLineWkt.push('(' + parseLineGeometry(coordinates[i]) + ')');
		}

		return multiLineWkt.join(', ');
	}

	/*
	 * Returns string containing the coordinates of a polygon geometry. Breaks linstring array into single 
	 * line segment arrays and uses parseLineGeometry to parse line segments.
	 */
	var parsePolygonGeometry = function(coordinates) {
		var polygonWkt = [];
		for (var i = 0; i < coordinates.length; i++) {
			polygonWkt.push('(' + parseLineGeometry(coordinates[i]) + ')');
		}
		return polygonWkt.join(', ');
	}

	/*
	 *
	 */
	var parseMultiPolygonGeometry = function(coordinates) {
		var multiPolygonWkt = [];
		for (var i = 0; i < coordinates.length; i++) {
			multiPolygonWkt.push('(' + parsePolygonGeometry(coordinates[i]) + ')');
		}
		return multiPolygonWkt.join(', ');
	}

	/*
	 * Returns string WKT represenation of the GeoJSON geometry passed to the method. 
	 *
	 * @param json {string|object} The GeoJSON gemetry to be parsed.
	 */
	geojson2Wkt.prototype.convert = function (json) {
		var wkt = '', coordinates;

		if (!json) new Error('No geojson object passed to the method.');

		// check if JSON is passed as String and convert to object
		if (typeof json === 'string') json = JSON.parse(json);

		coordinates = json.coordinates;

		switch (json.type) {
			case 'Point': 
				wkt = parsePointGeometry(coordinates);
				break;
			case 'MultiPoint': 
				wkt = parseMultiPointGeometry(coordinates);
				break;
			case 'LineString': 
				wkt = parseLineGeometry(coordinates);
				break;
			case 'MultiLineString': 
				wkt = parseMultiLineGeometry(coordinates);
				break;
			case 'Polygon': 
				wkt = parsePolygonGeometry(coordinates);
				break;
			case 'MultiPolygon': 
				wkt = parseMultiPolygonGeometry(coordinates);
				break;
			default: 
				throw new Error('Not able to parse geometry. Property type not set in GeoJSON object.');
		}
		return [json.type.toUpperCase(), '(', wkt, ')'].join('');
	}

	var createInstance = function () {
		if (!instance) instance = new geojson2Wkt();
		return instance;
	}

	return new createInstance();
})();

module.exports = Geojson2Wkt;