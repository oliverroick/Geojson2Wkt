/**
 * Geojson2Wkt
 * @author Oliver Roick <https://github.com/oliverroick>
 * @version 0.0.1
 * Date: 11/14/2012
 * Homepage: https://github.com/oliverroick/geo-converter
 */


/*
 * Constructor
 */

function Geojson2Wkt () {
	if (Geojson2Wkt.caller != Geojson2Wkt.getInstance) throw new Error("This object cannot be instanciated");
}

/*
 * Returns string containing the coordinates of a point geometry
 * @function
 * @private
 */
Geojson2Wkt.parsePointGeometry = function (coordinates) {
	return [coordinates[0], coordinates[1]].join(' ');
};

/*
 * Returns string containing the coordinates of a line geometry. Breaks coordinates array into single 
 * latitude-/longitude pairs and uses parsePointGeometry to parse node.
 * @function
 * @private
 */
Geojson2Wkt.parseLineGeometry = function (coordinates) {
	var lineWkt = [];
	for (var i = 0; i < coordinates.length; i++) {
		if (i > 0) lineWkt.push(', ');
		lineWkt.push(this.parsePointGeometry(coordinates[i]));
	}
	return lineWkt.join('');
};

/*
 * Returns string containing the coordinates of a polygon geometry. Breaks linstring array into single 
 * latitude-/longitude pairs and uses parseLineGeometry to parse line segments.
 * @function
 * @private
 */
Geojson2Wkt.parsePolygonGeometry = function (coordinates) {
	var polygonWkt = [];
	for (var i = 0; i < coordinates.length; i++) {
		polygonWkt.push('(');
		if (i > 0) polygonWkt.push(', ');
		polygonWkt.push(this.parseLineGeometry(coordinates[i]));
		polygonWkt.push(')');
	}
	return polygonWkt.join('');
};

/*
 * Returns string WKT represenation of the GeoJSON geometry passed to the method. 
 *
 * @param json {string|object} The GeoJSON gemetry to be parsed.
 * 
 */
Geojson2Wkt.prototype.convert = function (json) {
	var wkt = '', coordinates;

	if (!json) new Error('No geojson object passed to the method.');

	// check if JSON is passed as String and convert to object
	if (typeof json.coordinates === 'string') coordinates = JSON.parse(json.coordinates);
		else coordinates = json.coordinates;

	switch (json.type) {
		case 'Point': 
			wkt = this.parsePointGeometry(coordinates);
			break;
		case 'LineString': 
			wkt = this.parseLineGeometry(coordinates);
			break;
		case 'Polygon': 
			wkt = this.parsePolygonGeometry(coordinates);
			break;
		default: 
			throw new Error('Not able to parse geometry. Property type not set in GeoJSON object.');
	}
	return [json.type.toUpperCase(), wkt, ')'].join('');
}


/* ************************************************************************
SINGLETON CLASS DEFINITION
************************************************************************ */

Geojson2Wkt.instance = null;

/**
 * Singleton getInstance definition
 * @return singleton class
 */

Geojson2Wkt.getInstance = function () {
    if(this.instance === null) this.instance = new Geojson2Wkt();
    return this.instance;
}

module.exports = Geojson2Wkt.getInstance();