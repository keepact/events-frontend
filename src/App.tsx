import { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

import logo from './logo.svg'
import { IPresentation } from './@types'

import { AddAttendeeToPresentatioForm } from './modules/AddAttendeeToPresentatioForm'
import { PresentationForm } from './modules/PresentationForm'
import { AttendeeForm } from './modules/AttendeeForm'
import { PresentationList } from './modules/PresentationList'

import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Toast } from './components/Toast'
import { IToastState } from "./@types";

function App() {
  const [presentations, setPresentations] = useState<IPresentation[]>([])

  const [showPresentationForm, setShowPresentationForm] = useState(false)
  const [showAttendeForm, setShowAttendeForm] = useState(false)
  const [showAddAttendeToPresentation, setShowAddAttendeToPresentation] = useState(false)
  const [showPresentationList, setShowPresentationList] = useState(false)

  const [reload, setReload] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [showToast, setShowToast] = useState<IToastState>({
    isError: false,
    visible: false,
    errorMessage: undefined
  })

  const getPresentions = useCallback(
    async () => {
      try {
        const data = await fetch(`${import.meta.env.VITE_BASE_URL}/presentations`, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        const content = await data.json();
        if (firstLoad) setFirstLoad(false);

        setPresentations(content)
        setReload(false);
      } catch (error: any | string) {
        setShowToast({ isError: true, visible: true, errorMessage: !!error.error ? error.error : error })
      }
    },
    [presentations],
  );

  useEffect(() => {
    if (reload || firstLoad) {
      getPresentions()
    }
  }, [reload, getPresentions]);

  return (
    <div className="App">
      <header className="App-header">
        <Toast
          message={`${showToast.errorMessage}`}
          showToast={showToast}
          setShowToast={setShowToast}
        />
        <img src={logo} className="App-logo" alt="logo" />
        <p className="mt-5">Welcome!</p>
        <Container className="py-2 flex-column">
          <Row>
            <Col>
              <Button variant="primary" onClick={() => setShowPresentationForm(true)}>
                Add Presentation
              </Button>
              <PresentationForm
                setShowModal={setShowPresentationForm}
                show={showPresentationForm}
                reload={setReload}
              />
            </Col>
            <Col>
              <Button variant="primary" onClick={() => setShowAttendeForm(true)}>
                Add Attendee
              </Button>
              <AttendeeForm
                setShowModal={setShowAttendeForm}
                show={showAttendeForm}
              />
            </Col>
            <Col className="custom">
              <Button variant="primary" onClick={() => setShowAddAttendeToPresentation(true)}>
                Add Attendee to Presentation
              </Button>
              <AddAttendeeToPresentatioForm
                setShowModal={setShowAddAttendeToPresentation}
                show={showAddAttendeToPresentation}
                presentations={presentations}
                reload={setReload}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Button variant="primary" onClick={() => setShowPresentationList(true)}>
                View All Presentations
              </Button>
              <PresentationList
                presentations={presentations}
                setShowModal={setShowPresentationList}
                show={showPresentationList}
              />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  )
}

export default App
