import React, { useEffect } from "react";
import markerImage from "../../data/img/pin_blue.png";
import currentMarkerImage from "../../data/img/pin_red.png";

// @ts-ignore
const { kakao } = window;

const defaultIcon = new kakao.maps.MarkerImage(
  markerImage,
  new kakao.maps.Size(25, 25)
);
const currentPositionIcon = new kakao.maps.MarkerImage(
  currentMarkerImage,
  new kakao.maps.Size(25, 25)
);

const MapContainer = ({ searchPlace, foodieData, currentPlace }) => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(
        currentPlace.Latitude,
        currentPlace.Longitude
      ),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const place = new kakao.maps.services.Places();

    if (searchPlace !== "") {
      place.keywordSearch(searchPlace, placesSearchCB);
      foodieData.map((item) => {
        displayMarker(item, defaultIcon, true);
      });
    } else {
      displayMarker(
        {
          x: currentPlace.Longitude,
          y: currentPlace.Latitude,
        },
        currentPositionIcon,
        false
      );
      foodieData.map((item) => {
        displayMarker(item, defaultIcon, true);
      });
    }

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        // for (let i = 0; i < data.length; i++) {
        displayMarker(data[0], currentPositionIcon, false);
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
        // }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place, icon, clickable) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: icon,
        clickable: true,
      });

      if (clickable) {
        const iwContent = `<div style="padding:5px;">${place.title}</div>`;

        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: false,
        });

        kakao.maps.event.addListener(marker, "mouseover", function () {
          infowindow.open(map, marker);
        });

        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });
      }
    }
  }, [searchPlace, currentPlace]);

  return (
    <div
      id="myMap"
      style={{
        width: "100%",
        height: "60vh",
      }}
    ></div>
  );
};

export default MapContainer;
