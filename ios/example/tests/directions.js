
exports.title = 'Directions';
exports.run = function(UI, Map) {
    var win = UI.createWindow();
    
    var rows = [],
        prev;
    
    var tableView = Ti.UI.createTableView({
        top: '10%',
        bottom: '50%'
    });
    win.add(tableView);
    
    tableView.addEventListener('click', function(e){
        if (prev) {
            map.removeRoute(prev);
        }

        var route = Map.createRoute({
            points: rows[e.index].route,
            color: rows[e.index].color,
            width: 5.0
        });
        map.addRoute(route);
        
        var maxLat, maxLng, minLat, minLng,
            annotations = [];

        for (var i = 0; i < rows[e.index].route.length; i++) {
            maxLat = maxLat ? Math.max(rows[e.index].route[i].latitude, maxLat) : rows[e.index].route[i].latitude;
            maxLng = maxLng ? Math.max(rows[e.index].route[i].longitude, maxLng) : rows[e.index].route[i].longitude;
            minLat = minLat ? Math.min(rows[e.index].route[i].latitude, minLat) : rows[e.index].route[i].latitude;
            minLng = minLng ? Math.min(rows[e.index].route[i].longitude, minLng) : rows[e.index].route[i].longitude;

            if (rows[e.index].route[i].instructions || rows[e.index].route[i].distance) {
                annotations.push(Map.createAnnotation({
                    latitude: rows[e.index].route[i].latitude,
                    longitude: rows[e.index].route[i].longitude,
                    title: rows[e.index].route[i].instructions ? rows[e.index].route[i].instructions : '',
                    subtitle: rows[e.index].route[i].distance ? rows[e.index].route[i].distance + 'm' : '',
                    draggable: false
                }));
            }
        }

        map.applyProperties({
            region: {
                latitude: (maxLat + minLat) / 2,
                longitude: (maxLng + minLng) / 2,
                latitudeDelta: (maxLat - minLat) * 1.1,
                longitudeDelta: (maxLng - minLng) * 1.1
            },
            annotations: annotations
        });

        prev = route;
    });
    
    var map = Map.createView({
        top: '50%',
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
    
    var directions = Map.createDirections({
        source: {
            latitude: 35.665213,
            longitude: 139.730011
        },
        destination: {
            latitude: 35.658987,
            longitude: 139.702776
        }
    });
    
    directions.addEventListener('success', function(e){
        for (var i = 0; i < e.routes.length; i++) {
            rows.push({
                title: 'Route' + i,
                color: color(i),
                route: e.routes[i]
            });
        }

        tableView.setData(rows);
    });
    
    directions.addEventListener('error', function(e){
        alert('error');
    });
    
    win.open();
    
    function color(i) {
        if (i % 3 === 1) {
            return 'red';
        } else if (i % 3 === 2) {
            return 'green';
        } else {
            return 'blue';
        }
    }
};
