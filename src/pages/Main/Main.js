import {
  CContainer,
  CRow,
  CBadge,
  CCol,
  CCallout,
  CDataTable,
  CNavbar,
  CToggler,
  CNavbarBrand,
  CCollapse,
  CNavbarNav,
  CNavLink,
  CForm,
  CInput,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCardBody,
  CImg,
} from '@coreui/react';
import { freeSet } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import React, { useState } from 'react';

// @ts-ignore
import foodieData from '../../data/seoulbitz_foodie';
import { Link } from 'react-router-dom';

function Main() {
  const [details, setDetails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = index => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: 'title', _style: { width: '25%' } },
    {
      key: 'like',
      _style: { width: '5%' },
      filter: false,
    },
    { key: 'tag', _style: { width: '5%' } },
    { key: 'addr', _style: { width: '30%' } },
    {
      key: 'insta',
      _style: { width: '10%' },
      sorter: false,
      filter: false,
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false,
    },
  ];

  function getDataLength() {
    return 251;
  }

  return (
    <CContainer>
      <CNavbar expandable="sm" color="info">
        <CToggler inNavbar onClick={() => setIsOpen(!isOpen)} />
        <CNavbarBrand>Seoulbitz</CNavbarBrand>
        <CCollapse show={isOpen} navbar>
          <CNavbarNav>
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
          </CNavbarNav>
        </CCollapse>
      </CNavbar>
      <CRow>
        <CCol cols={12} sm="6">
          <CCallout color="info" className={'bg-white'}>
            <small className="text-muted">총 음식점 수</small>
            <br />
            <strong className="h4">{getDataLength()}</strong>
          </CCallout>
        </CCol>
        <CCol cols={12} sm="6">
          <CCallout color="danger" className={'bg-white'}>
            <small className="text-muted">Recurring Clients</small>
            <br />
            <strong className="h4">22,643</strong>
          </CCallout>
        </CCol>
      </CRow>
      <CRow className={'w-100 mt-5 mx-auto col-12'}>
        <CDataTable
          items={foodieData}
          fields={fields}
          columnFilter
          tableFilter
          itemsPerPage={20}
          hover
          sorter
          pagination
          scopedSlots={{
            tag: item => (
              <td>
                <CBadge color={'success'}>{item.tag}</CBadge>
              </td>
            ),
            insta: item => (
              <td>
                <a href={item.insta} target="_blank" rel="noreferrer" className={'black'}>
                  <CIcon content={freeSet.cilExternalLink} />
                </a>
              </td>
            ),
            show_details: (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      toggleDetails(index);
                    }}
                  >
                    {details.includes(index) ? 'Hide' : 'Show'}
                  </CButton>
                </td>
              );
            },
            details: (item, index) => {
              return (
                <CCollapse show={details.includes(index)}>
                  <CCardBody>
                    <CImg src={item.thumb} width={300} height={300}></CImg>
                    <h4>{item.title}</h4>
                    <p className="text-muted">Instagram: {item.insta}</p>
                  </CCardBody>
                </CCollapse>
              );
            },
          }}
        />
      </CRow>
    </CContainer>
  );
}

export default Main;
