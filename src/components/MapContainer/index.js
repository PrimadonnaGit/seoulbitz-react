import React, { useEffect, useState } from "react";
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
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const map = new kakao.maps.Map(document.getElementById("myMap"), {
      center: new kakao.maps.LatLng(
        currentPlace.Latitude,
        currentPlace.Longitude
      ),
      level: 3,
    });
    const place = new kakao.maps.services.Places();
    const currentCircle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(
        currentPlace.Latitude,
        currentPlace.Longitude
      ), // 원의 중심좌표 입니다
      radius: 10, // 미터 단위의 원의 반지름입니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: "red", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "", // 선의 스타일 입니다
      fillColor: "red", // 채우기 색깔입니다
      fillOpacity: 0.4, // 채우기 불투명도 입니다
    });

    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 4, // 클러스터 할 최소 지도 레벨
    });

    currentCircle.setMap(map);

    // 클러스터러 초기화
    setMarkers([]);
    if (searchPlace !== "") {
      place.keywordSearch(searchPlace, placesSearchCB);
      foodieData.map((item) => {
        displayMarker(item, defaultIcon, true);
      });
    } else {
      foodieData.map((item) => {
        displayMarker(item, defaultIcon, true);
      });
    }

    // TODO
    // clusterer.addMarkers(markers);

    // 검색 결과 첫번 째 장소로 지도 이동
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        displayMarker(data[0], currentPositionIcon, false);
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));

        map.setBounds(bounds);
      }
    }

    // 마커 표시
    function displayMarker(place, icon, clickable) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: icon,
        clickable: true,
      });

      if (clickable) {
        const iwContent = `<div class="customoverlay"><a href="${place.insta}" target="_blank" rel="noreferrer"><span class="title">${place.title}</span></a></div>`;
        const customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
          content: iwContent,
          yAnchor: 1,
          clickable: true,
        });

        // 기본 오버레이 닫은 상태
        customOverlay.setMap(null);

        // 상점 클릭 시 오버레이 열기
        kakao.maps.event.addListener(marker, "click", function () {
          customOverlay.setMap(map);
        });

        // 맵 클릭 시 오버레이 닫기
        kakao.maps.event.addListener(map, "click", function () {
          customOverlay.setMap(null);
        });
      }

      setMarkers((pre) => [...pre, marker]);
    }
  }, [searchPlace, currentPlace]);

  return (
    <div
      id="myMap"
      style={{
        width: "100%",
        height: "70vh",
      }}
    ></div>
  );
};

export default MapContainer;
