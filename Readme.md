# Json2Wkt

Node module to onvert [GeoJSON](http://geojson.org/) geometry objects or string representations into [WKT](http://en.wikipedia.org/wiki/Well-known_text) format.

**The module is in development phase and has not been tested yet.**

## Usage

Import the module:

    var json2wkt = require('Json2Wkt'); 

Parse a GeoJSON object

    json2wkt.convert({"type": "Point", "coordinates": [102.0, 0.5]}); // -- 'POINT(102 0.5)'

Or parse a string representation of a GeoJson object. The method automatically parses the string into an object.

    json2wkt.convert('{"type": "Point", "coordinates": [102.0, 0.5]}'); // -- 'POINT(102 0.5)'

## Roadmap

- write tests
- documentation
- Extend convert method to support
    - MultiPoint
    - MultiLinestring
    - Multipolygon