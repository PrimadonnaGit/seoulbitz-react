import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CNavbar,
  CToggler,
  CNavbarBrand,
  CCollapse,
  CNavbarNav,
} from "@coreui/react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CNavbar expandable="sm" color="info">
      <CToggler inNavbar onClick={() => setIsOpen(!isOpen)} />
      <CNavbarBrand>Seoulbitz</CNavbarBrand>
      <CCollapse show={isOpen} navbar>
        <CNavbarNav>
          <Link className={"m-1"} to="/">
            Home
          </Link>
          <Link className={"m-1"} to="/search">
            Search
          </Link>
        </CNavbarNav>
      </CCollapse>
    </CNavbar>
  );
}

export default Header;
