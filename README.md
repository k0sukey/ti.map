# Titanium Map Module [![Build Status](https://travis-ci.org/appcelerator-modules/ti.map.svg)](https://travis-ci.org/appcelerator-modules/ti.map)

This is the Map Module for Titanium.

## Contributors

* Please see https://github.com/appcelerator-modules/ti.map/graphs/contributors
* Interested in contributing? Read the [contributors/committer's](https://wiki.appcelerator.org/display/community/Home) guide.

## Legal

This module is Copyright (c) 2010-2014 by Appcelerator, Inc. All Rights Reserved. Usage of this module is subject to 
the Terms of Service agreement with Appcelerator, Inc.  

## Gesture Recognizer fork

This fork is some events support.
Use only for iOS.

### Features

* click event
* touchstart event
* touchmove event
* touchend event

### Sample code

```
var Map = require('ti.map');

var win = Ti.UI.createWindow();

var map = Map.createView({
    userLocation: true,
    mapType: Map.NORMAL_TYPE,
    animate: true,
    region: {
        latitude: 35.665213,
        longitude: 139.730011,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
    } //Roppongi
});
win.add(map);

win.addEventLsitener('click', function(e){
	// e.x, e.y, e.latitude, e.longitude
	console.log(e);
});

win.addEventLsitener('touchstart', function(e){
	console.log(e);
});

win.addEventLsitener('touchmove', function(e){
	console.log(e);
});

win.addEventLsitener('touchend', function(e){
	console.log(e);
});

win.open();
```
