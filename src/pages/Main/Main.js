import {
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CIcon,
} from '@coreui/react';
import React from 'react';

function Main() {
  return (
    <div className={'mt-2 col-12 d-flex'}>
      <CInputGroup>
        <CInputGroupPrepend>
          <CInputGroupText className={'bg-info text-white'}>역검색</CInputGroupText>
        </CInputGroupPrepend>
        <CInput type="text" id="search-station" name="search-station" autoComplete="name" />
        <CInputGroupAppend>
          <CInputGroupText className={'bg-info text-white'}></CInputGroupText>
        </CInputGroupAppend>
      </CInputGroup>
    </div>
  );
}

export default Main;
