import React, { useEffect, useState } from "react";
import MapContainer from "src/components/MapContainer";
import Header from "./../../components/Header/index";
import { CForm, CFormGroup, CLabel, CInput, CButton } from "@coreui/react";
import Autocomplete from "react-autocomplete";
// @ts-ignore
import foodieData from "../../data/foodie";
// // @ts-ignore
// import subwayData from "../../data/subway";

function Search() {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            console.info(
              `re:${position.coords.latitude} ${position.coords.longitude}`
            );
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          function (error) {
            console.error(error);
            resolve({
              latitude: 37.3595704,
              longitude: 127.105399,
            });
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      }).then((coords) => {
        console.log(`coords:${JSON.stringify(coords)}`);
        return coords;
      });
    }
    console.info("GPS를 지원하지 않습니다");
    return {
      latitude: 37.3595704,
      longitude: 127.105399,
    };
  }

  getLocation();

  return (
    <>
      <Header></Header>

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

      <div className={"w-100 mx-auto d-flex justify-content-center"}>
        <MapContainer
          searchPlace={place}
          foodieData={foodieData}
        ></MapContainer>
      </div>
    </>
  );
}

export default Search;
