/**
 * Json2Wkt
 * @author Oliver Roick <https://github.com/oliverroick>
 * @version 0.0.1
 * Date: 11/14/2012
 * Homepage: https://github.com/oliverroick/geo-converter
 */

function Json2Wkt () {
	if (Json2Wkt.caller != Json2Wkt.getInstance) throw new Error("This object cannot be instanciated");
}

Json2Wkt.parsePointGeometry = function (coordinates) {
	return [coordinates[0], coordinates[1]].join(' ');
};

Json2Wkt.parseLineGeometry = function (coordinates) {
	var lineWkt = [];
	for (var i = 0; i < coordinates.length; i++) {
		if (i > 0) lineWkt.push(', ');
		lineWkt.push(this.parsePointGeometry(coordinates[i]));
	}
	return lineWkt.join('');
};

Json2Wkt.parsePolygonGeometry = function (coordinates) {
	var polygonWkt = [];
	for (var i = 0; i < coordinates.length; i++) {
		polygonWkt.push('(');
		if (i > 0) polygonWkt.push(', ');
		polygonWkt.push(this.parseLineGeometry(coordinates[i]));
		polygonWkt.push(')');
	}
	return polygonWkt.join('');
};

Json2Wkt.prototype.convert = function (json) {
		var wkt = [], coordinates;

		if (!json) new Error('No geojson object passed to the method.');

		// check if JSON is passed as String and convert to object
		if (typeof json.coordinates === 'string') coordinates = JSON.parse(json.coordinates);
			else coordinates = json.coordinates;

		switch (json.type) {
			case 'Point': 
				wkt.push('POINT(');
				wkt.push(this.parsePointGeometry(coordinates));
				wkt.push(')');
				break;
			case 'LineString': 
				wkt.push('LINETSTRING(');
				wkt.push(this.parseLineGeometry(coordinates));
				wkt.push(')');
				break;
			case 'Polygon': 
				wkt.push('POLYGON(');
				wkt.push(this.parsePolygonGeometry(coordinates));
				wkt.push(')');
				break;
			default: 
				throw new Error('Not able to parse geometry. Property type not set in GeoJSON object.');
		}
		return wkt.join('');
}


/* ************************************************************************
SINGLETON CLASS DEFINITION
************************************************************************ */
 
/**
 * Singleton getInstance definition
 * @return singleton class
 */
Json2Wkt.instance = null;

Json2Wkt.getInstance = function () {
    if(this.instance === null) this.instance = new Json2Wkt();
    return this.instance;
}

module.exports = Json2Wkt.getInstance();