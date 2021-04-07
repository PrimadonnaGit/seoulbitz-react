import React, { useState } from "react";
import {
  CContainer,
  CRow,
  CBadge,
  CDataTable,
  CCollapse,
  CButton,
  CCardBody,
  CImg,
} from "@coreui/react";
// @ts-ignore
import foodieData from "../../data/foodie";
function DataTableContainer() {
  const [details, setDetails] = useState([]);

  const toggleDetails = (index) => {
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
    { key: "title", _style: { width: "25%" } },
    {
      key: "like",
      _style: { width: "5%" },
      filter: false,
    },
    { key: "tag", _style: { width: "5%" } },
    { key: "addr", _style: { width: "30%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];
  return (
    <>
      <CContainer>
        <CRow className={"w-100 mt-1 mx-auto col-12"}>
          <CDataTable
            items={foodieData}
            fields={fields}
            columnFilter
            tableFilter
            itemsPerPage={15}
            hover
            sorter
            pagination
            scopedSlots={{
              title: (item) => (
                <td>
                  <a href={item.insta} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </td>
              ),
              tag: (item) => (
                <td>
                  <CBadge color={"success"}>{item.tag}</CBadge>
                </td>
              ),
              like: (item) => {
                if (item.like > 250) {
                  return (
                    <td>
                      {item.like} <CBadge color="danger">HOT</CBadge>
                    </td>
                  );
                } else {
                  return <td>{item.like}</td>;
                }
              },
              show_details: (item, index) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="info"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(index);
                      }}
                    >
                      {details.includes(index) ? "숨기기" : "자세히보기"}
                    </CButton>
                  </td>
                );
              },
              details: (item, index) => {
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody className={"d-flex justify-content-center"}>
                      {item.imgList.split(",").map((img) => {
                        return (
                          <CImg
                            className={"m-2"}
                            src={img}
                            width={300}
                            height={300}
                          ></CImg>
                        );
                      })}
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />
        </CRow>
      </CContainer>
    </>
  );
}

export default DataTableContainer;
