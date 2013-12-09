Geojson2Wkt = require('../Geojson2Wkt');

module.exports = {
	testPointConversion: function(test) {
		test.expect(2);
		var result = Geojson2Wkt.convert({
			"type": "Point",
			"coordinates": [
				-0.15037, 51.55145
			]
		});

		var result2 = Geojson2Wkt.convert('{"type": "Point", "coordinates": [-0.15037, 51.55145]}');

		test.equals(result, 'POINT(-0.15037 51.55145)')
		test.equals(result2, 'POINT(-0.15037 51.55145)')
		test.done();
	},

	testMultiPointConversion: function(test) {
		var result = Geojson2Wkt.convert({
			"type": "MultiPoint",
			"coordinates": [
				[-0.15171, 51.55378],
				[-0.15144, 51.55527],
          		[-0.16565, 51.55514],
			]
		});

		test.expect(1);
		test.equals(result, 'MULTIPOINT(-0.15171 51.55378, -0.15144 51.55527, -0.16565 51.55514)');
		test.done();
	},

	testLineConversion: function(test) {
		var result = Geojson2Wkt.convert({
			"type": "LineString",
			"coordinates": [
				[-0.15391, 51.55314],
				[-0.15298, 51.55347],
				[-0.15268, 51.55357],
				[-0.15243, 51.55364]
			]
		});

		test.expect(1);
		test.equals(result, 'LINESTRING(-0.15391 51.55314, -0.15298 51.55347, -0.15268 51.55357, -0.15243 51.55364)')
		test.done();
	},

	testMultiLineConversion: function(test) {
		var result = Geojson2Wkt.convert({
			"type": "MultiLineString",
			"coordinates": [
				[
					[-0.16496, 51.55407], 
					[-0.16294, 51.55367], 
					[-0.15964, 51.55287], 
					[-0.15951, 51.55209]
				],
				[
          			[-0.16925, 51.55305], 
          			[-0.16767, 51.55367], 
          			[-0.16475, 51.55421], 
          			[-0.16222, 51.55498]
				],
				[
          			[-0.16676, 51.55668], 
          			[-0.16664, 51.55628], 
          			[-0.16664, 51.55559], 
          			[-0.16552, 51.55418]
				]
			]
		});

		test.expect(1);
		test.equals(result, 'MULTILINESTRING((-0.16496 51.55407, -0.16294 51.55367, -0.15964 51.55287, -0.15951 51.55209), (-0.16925 51.55305, -0.16767 51.55367, -0.16475 51.55421, -0.16222 51.55498), (-0.16676 51.55668, -0.16664 51.55628, -0.16664 51.55559, -0.16552 51.55418))')
		test.done();
	},

	testPolygonConversion: function(test) {
		var result = Geojson2Wkt.convert({
			"type": "Polygon",
			"coordinates": [
				[
					[-0.15229, 51.5536],
					[-0.15224, 51.55355],
					[-0.15155, 51.55381],
					[-0.15161, 51.55387],
					[-0.15229, 51.5536]
				]
			]
		});

		test.expect(1);
		test.equals(result, 'POLYGON((-0.15229 51.5536, -0.15224 51.55355, -0.15155 51.55381, -0.15161 51.55387, -0.15229 51.5536))')
		test.done();
	},

	testMultiPolygon: function(test) {
		var result = Geojson2Wkt.convert({
			"type": "MultiPolygon",
			"coordinates": [
				[
					[
						[-0.15381, 51.55304],
						[-0.15372, 51.55296],
						[-0.15285, 51.55329],
						[-0.15291, 51.55336],
						[-0.15381, 51.55304]
					]
				],
				[
					[
						[-0.15311, 51.55308],
						[-0.15291, 51.55285],
						[-0.15277, 51.55291],
						[-0.15297, 51.55312],
						[-0.15311, 51.55308]
					]
				],
				[
					[
						[-0.15213, 51.55311],
						[-0.15207, 51.55304],
						[-0.15165, 51.55321],
						[-0.15172, 51.55326],
						[-0.15213, 51.55311]
					] 
				]
			]
		});

		test.expect(1);
		test.equals(result, 'MULTIPOLYGON(((-0.15381 51.55304, -0.15372 51.55296, -0.15285 51.55329, -0.15291 51.55336, -0.15381 51.55304)), ((-0.15311 51.55308, -0.15291 51.55285, -0.15277 51.55291, -0.15297 51.55312, -0.15311 51.55308)), ((-0.15213 51.55311, -0.15207 51.55304, -0.15165 51.55321, -0.15172 51.55326, -0.15213 51.55311)))');
		test.done();
	},

	testFalseInput: function(test) {
		test.expect(7);
		test.throws(function () {Geojson2Wkt.convert(); }, Error, 'Not able to parse Geometry. No argument or null passed.');
		test.throws(function () {Geojson2Wkt.convert('Stupid String'); }, Error, 'Not able to parse Geometry. Invalid String.');
		test.throws(function () {Geojson2Wkt.convert(2); }, Error, 'Not able to parse Geometry. Invalid data type.');
		test.throws(function () {Geojson2Wkt.convert(true); }, Error, 'Not able to parse Geometry. Invalid data type.');
		test.throws(function () {Geojson2Wkt.convert({"coordinates": [-0.15037, 51.55145]}); }, Error, 'Not able to parse geometry. Property type not set in GeoJSON geometry.');
		test.throws(function () {Geojson2Wkt.convert('{"type": "Point", "coordinates": [-0.15037, 51.55145]'); }, Error, 'Not able to parse geometry. Property type not set.');
		test.throws(function () {Geojson2Wkt.convert({"type": "Point"}); }, Error, 'Not able to parse geometry. Property geometry not set.');
		test.done();
	}
}