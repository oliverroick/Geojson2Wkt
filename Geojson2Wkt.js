/**
 * Geojson2Wkt
 * @author Oliver Roick <https://github.com/oliverroick>
 * @version 0.0.1
 * Date: 11/14/2012
 * Homepage: https://github.com/oliverroick/geo-converter
 */

module.exports = (function(exports) {
	'use strict';

	var converter = {};

	/*
	 * Returns string containing the coordinates of a point geometry
	 */
	function parsePointGeometry (coordinates) {
		return [coordinates[0], coordinates[1]].join(' ');
	}

	/*
	 * 
	 */
	function parseMultiPointGeometry (coordinates) {
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
	function parseLineGeometry (coordinates) {
		var lineWkt = [];
		for (var i = 0; i < coordinates.length; i++) {
			lineWkt.push(parsePointGeometry(coordinates[i]));
		}
		return lineWkt.join(', ');
	}

	/*
	 *
	 */
	function parseMultiLineGeometry (coordinates) {
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
	function parsePolygonGeometry(coordinates) {
		var polygonWkt = [];
		for (var i = 0; i < coordinates.length; i++) {
			polygonWkt.push('(' + parseLineGeometry(coordinates[i]) + ')');
		}
		return polygonWkt.join(', ');
	}

	/*
	 *
	 */
	function parseMultiPolygonGeometry(coordinates) {
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
	 converter.convert = function (json) {
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

	return converter;
}());