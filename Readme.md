# Geojson2Wkt

Node module to convert [GeoJSON](http://geojson.org/) geometry objects or string representations into [WKT](http://en.wikipedia.org/wiki/Well-known_text) format.

## Install

	npm install geojson2wkt

## Usage

Import the module:

    var Geojson2wkt = require('Geojson2Wkt'); 

Parse a GeoJSON object

    Geojson2wkt.convert({"type": "Point", "coordinates": [102.0, 0.5]}); // -- 'POINT(102 0.5)'

Or parse a string representation of a GeoJson object. The method automatically parses the string into an object.

    Geojson2wkt.convert('{"type": "Point", "coordinates": [102.0, 0.5]}'); // -- 'POINT(102 0.5)'
    
## Testing

Tests require [nodeunit](https://github.com/caolan/nodeunit).

Running tests

    nodeunit tests/test.js

## Roadmap

- documentation
- Extend convert method to support
    - GeometryCollection
    - Polygons with holes
