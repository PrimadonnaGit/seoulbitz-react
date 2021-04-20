import React, { useEffect, useState } from "react";
import MapContainer from "src/components/MapContainer";
import Header from "./../../components/Header/index";
import { CForm, CFormGroup, CInput, CButton } from "@coreui/react";
// @ts-ignore
import foodieData from "../../data/foodie";
// // @ts-ignore
// import subwayData from "../../data/subway";

function Search() {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const [currentCoords, setCurrentCoords] = useState({
    Latitude: 37.5682,
    Longitude: 126.9977,
  });

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        // GPS를 지원하면
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              resolve({
                Latitude: position.coords.latitude,
                Longitude: position.coords.longitude,
              });
              console.log("resolve", position.coords);
            },
            function (error) {
              console.error(error);
              resolve(currentCoords);
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: Infinity,
            }
          );
        }).then((coords) => {
          console.log("then", coords);
          setCurrentCoords(coords);
        });
      }
      console.info("GPS를 지원하지 않습니다");
    }

    getLocation();
  }, []);

  return (
    <>
      <Header></Header>

      <div className={"w-100 mx-auto d-flex justify-content-center"}>
        <MapContainer
          searchPlace={place}
          foodieData={foodieData}
          currentPlace={currentCoords}
        ></MapContainer>
      </div>
      
      <CForm onSubmit={handleSubmit}>
        <CFormGroup className={"w-75 mt-5 mx-auto"}>
          <CInput
            type="text"
            id="searchPlace"
            name="searchPlace"
            placeholder="Search Place ..."
            onChange={onChange}
            value={inputText}
          />
          <CButton type="submit"></CButton>
        </CFormGroup>
      </CForm>
    </>
  );
}

export default Search;
