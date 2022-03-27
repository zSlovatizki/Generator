import Cables from '../Mobx/Cables'
import { toJS } from 'mobx';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from "react-google-maps";


export function lengthForCable(coordinatesArr) {
  var lengthFromStart = 0;
  coordinatesArr.map((point, i) => {
    if (i < coordinatesArr.length - 1) {
      var l = (window.google.maps.geometry.spherical.computeDistanceBetween(toJS(point), toJS(coordinatesArr[i + 1]))).toFixed(2)
      lengthFromStart += parseFloat(l);
    }
  }
  )
  return parseFloat(lengthFromStart);
}


// export function lengthForCable(coordinatesArr) {
//   var lengthFromStart = 0;
//   coordinatesArr.map((point, i) => {
//     if (i < coordinatesArr.length - 1)
//       lengthFromStart += CalcLength(toJS(point), toJS(coordinatesArr[i + 1]));
//   }
//   )
//   return lengthFromStart;
// }

export function CalcLength(coordinateA, coordinateB) {
  return Math.sqrt(Math.pow(coordinateA.lat - coordinateB.lat, 2) +
    Math.pow(coordinateA.lng - coordinateB.lng, 2));
}

export function loadToPointInCable(DistanceFromBeginning, loadForAllCable) {
  var loadLeftToPoint = loadForAllCable * (1 - ((DistanceFromBeginning / 100) * 0.05));
  return loadLeftToPoint;
}

export function loadToPointInCable2(distanceFromBeginning, loadForAllCable) {
  return loadForAllCable - 0.05 * loadForAllCable * (distanceFromBeginning / 100);
}

export function CableOfPoint(pointOnCable) {
  var currentCable = [];
  var index = 0;
  var thickness = 0;
  var typeId = 0;
  Cables.cables.map((cableCoordinates) => {
    cableCoordinates.coordinates.map((pointInCable, i) => {
      if (i < cableCoordinates.coordinates.length - 1) {
        var maxLat = toJS(pointInCable).lat > toJS(cableCoordinates.coordinates[i + 1]).lat ? toJS(pointInCable).lat : toJS(cableCoordinates.coordinates[i + 1]).lat;
        var minLat = toJS(pointInCable).lat < toJS(cableCoordinates.coordinates[i + 1]).lat ? toJS(pointInCable).lat : toJS(cableCoordinates.coordinates[i + 1]).lat;
        var maxLng = toJS(pointInCable).lng > toJS(cableCoordinates.coordinates[i + 1]).lng ? toJS(pointInCable).lng : toJS(cableCoordinates.coordinates[i + 1]).lng;
        var minLng = toJS(pointInCable).lng < toJS(cableCoordinates.coordinates[i + 1]).lng ? toJS(pointInCable).lng : toJS(cableCoordinates.coordinates[i + 1]).lng;
        if (pointOnCable.lat > minLat && pointOnCable.lat < maxLat &&
          pointOnCable.lng > minLng && pointOnCable.lng < maxLng) {
          currentCable = cableCoordinates.coordinates;
          index = i;
          thickness = cableCoordinates.thickness;
          typeId = cableCoordinates.type;
        }
      }
    })
  })
  return { currentCable: currentCable, index: index, thickness: thickness, type: typeId };
}

export function calcLoadByTypeAndThickness(type, thickness) {
  if (type == 1) {
    switch (thickness) {
      case 1.5: return 10
      case 2.5: return 16;
      case 4: return 25;
      case 6: return 32;
      case 10: return 40;
      case 16: return 63;
      case 25: return 80;
      case 30: return 100;
      case 35: return 100;
      case 50: return 125;
      case 70: return 160;
      case 92: return 200;
      case 120: return 225;
      case 150: return 250;
      case 240: return 300;
    }
  }
  //else if(type=="aluminum")
  else if (type == 2) {
    switch (thickness) {
      case 24: return 63;
      case 50: return 100;
      case 70: return 125;
      case 65: return 160;
      case 150: return 200;
      case 240: return 250;
    }
  }

}

export function shortRouteBetweenTwoPoints(set) {
  var directionsService = new window.google.maps.DirectionsService;
  var directionsRenderer = new window.google.maps.DirectionsRenderer;

  var routesResponses = [];
  //avoiding tolls
  directionsService.route({
    avoidHighways: true,
    travelMode: window.google.maps.TravelMode.DRIVING
  }, function (response, status) {
    if (status === window.google.maps.DirectionsStatus.OK) {
      routesResponses.push(response);
      set(response)
    }
    else {
      window.alert('Directions request failed due to ' + status);
    }

    //Results analysis and drawing of routes
    var fastest = Number.MAX_VALUE,
      shortest = Number.MAX_VALUE;
    routesResponses.forEach(function (res) {
      res.routes.forEach(function (rou, index) {
        if (rou.legs[0].distance.value < shortest) shortest = rou.legs[0].distance.value;
        if (rou.legs[0].duration.value < fastest) fastest = rou.legs[0].duration.value;

      })
    })
    //painting the routes in green blue and red
    routesResponses.forEach(function (res) {
      res.routes.forEach(function (rou, index) {
        // directionsRenderer({
        //   map: window.google.maps.map,
        //   directions: res,
        //   routeIndex: index,
        //   polylineOptions: {
        //     strokeColor: rou.legs[0].duration.value == fastest ? "red" : rou.legs[0].distance.value == shortest ? "darkgreen" : "yellow",
        //     strokeOpacity: rou.legs[0].duration.value == fastest ? 0.8 : rou.legs[0].distance.value == shortest ? 0.9 : 0.5,
        //     strokeWeight: rou.legs[0].duration.value == fastest ? 9 : rou.legs[0].distance.value == shortest ? 8 : 3,
        //   }
        // })
      })
    })
  });
}

export async function getAddressNameByLatLng(latLng) {
  console.log("latlng",latLng)
  var addressName = "";
  await fetch('https://maps.googleapis.com/maps/api/geocode/json?language=he&address=' + latLng.lat + ',' + latLng.lng + '&key=' + "AIzaSyBwBhST7RvyHmk9JLlkMPHp8LAfY7AqIEw")
    .then((response) => response.json())
    .then((responseJson) => addressName = responseJson.results[0].formatted_address)
  return addressName.toString();
}

export function getLatLngFromString(latLngString) {
  var latSrt = latLngString.substring(0, latLngString.indexOf(','));
  var lngStr = latLngString.substring(latLngString.indexOf(',') + 1, latLngString.length);

  return { lat: parseFloat(latSrt), lng: parseFloat(lngStr) }
}

export function setStorageItem(key, value) {
  window.sessionStorage.setItem(key, value);
}

export function getStorageItem(key) {
  return window.sessionStorage.getItem(key);
}
export function clearSessionStorage() {
  window.sessionStorage.clear();
}
