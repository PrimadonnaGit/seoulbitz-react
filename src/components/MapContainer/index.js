import React, { useEffect } from "react";
import markerImage from "../../data/img/pin_blue.png";
// @ts-ignore
const { kakao } = window;

const MapContainer = ({ searchPlace, foodieData }) => {
  const icon = new kakao.maps.MarkerImage(
    markerImage,
    new kakao.maps.Size(31, 35)
  );

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(37.50927760377195, 127.01968002918031),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const place = new kakao.maps.services.Places();

    if (searchPlace !== "") {
      place.keywordSearch(searchPlace, placesSearchCB);
    } else {
      foodieData.map((item) => {
        displayMarker(item);
      });
    }

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: icon,
      });
    }
  }, [searchPlace]);

  return (
    <div
      id="myMap"
      style={{
        width: "50%",
        height: "50vh",
      }}
    ></div>
  );
};

export default MapContainer;
