/**
 * Geojson2Wkt
 * @author Oliver Roick <https://github.com/oliverroick>
 * @version 0.0.1
 * Date: 11/14/2012
 * Homepage: https://github.com/oliverroick/geo-converter
 */

module.exports = (function() {
	'use strict';

	var converter = {};

	/*
	 * Returns string containing the coordinates of a point geometry. Breaks coordinates array into single 
	 * latitude-/longitude pairs and uses parsePointGeometry to parse node.
	 */
	function parsePointGeometry (coordinates) {
		return [coordinates[0], coordinates[1]].join(' ');
	}

	/*
	 * Returns string containing the coordinates of a multipoint geometry.
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
	 * Returns string containing the coordinates of a multi line geometry. Breaks linstring array into single 
	 * line segment arrays and uses parseLineGeometry to parse line segments.
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
	 * Returns string containing the coordinates of a multi polygon geometry. Breaks polygon array into single 
	 * polygon arrays and uses parsePolygonGeometry to parse polygons.
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

		if (!json) throw new Error('Not able to parse Geometry. No argument or null passed.');

		// check if JSON is passed as String and convert to object
		if (typeof json === 'string') {
			try {
				json = JSON.parse(json);
			} catch (e) {
				throw new Error('Not able to parse Geometry. Invalid String.');
			}
		} else if (typeof json !== 'object') {
			throw new Error('Not able to parse Geometry. Invalid data type.');
		}

		if (!json.coordinates) throw new Error('Not able to parse geometry. Property geometry not set.');

		switch (json.type) {
			case 'Point':
				wkt = parsePointGeometry(json.coordinates);
				break;
			case 'MultiPoint':
				wkt = parseMultiPointGeometry(json.coordinates);
				break;
			case 'LineString':
				wkt = parseLineGeometry(json.coordinates);
				break;
			case 'MultiLineString':
				wkt = parseMultiLineGeometry(json.coordinates);
				break;
			case 'Polygon':
				wkt = parsePolygonGeometry(json.coordinates);
				break;
			case 'MultiPolygon':
				wkt = parseMultiPolygonGeometry(json.coordinates);
				break;
			default:
				throw new Error('Not able to parse geometry. Property type not set.');
		}
		return [json.type.toUpperCase(), '(', wkt, ')'].join('');
	}

	return converter;
}());