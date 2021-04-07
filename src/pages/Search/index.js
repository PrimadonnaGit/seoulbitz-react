import React, { useEffect, useState } from "react";
import MapContainer from "src/components/MapContainer";
import Header from "./../../components/Header/index";
import { CForm, CFormGroup, CLabel, CInput, CButton } from "@coreui/react";

// @ts-ignore
import foodieData from "../../data/foodie";

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

  return (
    <>
      <Header></Header>

      <CForm onSubmit={handleSubmit}>
        <CFormGroup>
          <CLabel htmlFor="searchPlace">장소 검색</CLabel>
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

      <MapContainer searchPlace={place} foodieData={foodieData}></MapContainer>
    </>
  );
}

export default Search;
