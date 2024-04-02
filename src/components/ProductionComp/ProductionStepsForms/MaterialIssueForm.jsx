'use client'
import Container from '@/components/common/Container'
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiPrinter, FiSave } from 'react-icons/fi';
import { CFormLabel, CCol, CForm, CRow, CFormInput } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'

const MaterialIssueForm = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container>
      <div className="w-full h-[85vh] p-8 mx-auto bg-white rounded shadow-md">
        <button
          onClick={handleGoBack}
          className="flex items-center mb-4 text-lg font-bold text-black"
        >
          <FiArrowLeft className="mr-2" /> {/* Left arrow icon */}
          Back
        </button>

        <hr className="my-2 border-t border-gray-300" />

        <CForm >
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</CFormLabel>
            <CCol sm={10} >
              <CFormInput type="email" id="inputEmail3" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</CFormLabel>
            <CCol sm={10} >
              <CFormInput type="password" id="inputPassword3" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</CFormLabel>
            <CCol sm={10} >
              <CFormInput type="password" id="inputPassword3" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</CFormLabel>
            <CCol sm={10} >
              <CFormInput type="password" id="inputPassword3" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</CFormLabel>
            <CCol sm={10} >
              <CFormInput type="password" id="inputPassword3" />
            </CCol>
          </CRow>
          <div className="flex flex-row items-center col-span-2 mb-4">
            <label htmlFor="attachment" className="mr-4 text-lg font-semibold">Attachment:</label>
            <input type="file" id="attachment" className="flex-grow px-3 py-2 mt-1 " />
          </div>
        </CForm>

        <hr className="my-2 border-t border-gray-300" />
        <div className="flex justify-end">
          <button className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded">
            Save
            <FiSave className="ml-2" />
          </button>
          <button className="flex items-center px-4 py-2 text-black bg-gray-300 rounded">
            Print
            <FiPrinter className="ml-2" />
          </button>
        </div>
      </div>
    </Container >
  )
}

export default MaterialIssueForm