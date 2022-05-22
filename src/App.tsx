import { useCallback, useEffect, useState } from 'react'
import { PresentationForm } from './modules/PresentationForm';
import { AttendeeForm } from './modules/AttendeeForm';

import logo from './logo.svg'
import './App.css'
import { AddAttendeeToPresentatioForm } from './modules/AddAttendeeToPresentatioForm';
import { IPresentation } from './@types';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [presentations, setPresentations] = useState<IPresentation[]>([])
  const [showPresentationForm, setShowPresentationForm] = useState(false);
  const [showAttendeForm, setShowAttendeForm] = useState(false);
  const [showAddAttendeToPresentation, setShowAddAttendeToPresentation] = useState(false);

  const getPresentions = useCallback(
    async () => {
      const data = await fetch("/presentations", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const content = await data.json();
      setPresentations(content)
    },
    [presentations],
  );

  useEffect(() => {
    if (presentations.length > 0) {
      getPresentions()
    }
  }, [presentations, getPresentions]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="mt-5">Welcome!</p>
        <Container className="py-2 flex-column">
          <div className="mt-5">
            <Button variant="primary" onClick={() => setShowPresentationForm(true)}>
              Add Presentation
            </Button>
            <PresentationForm
              close={() => setShowPresentationForm(false)}
              show={showPresentationForm}
            />
          </div>
          <div className="mt-5">
            <Button variant="primary" onClick={() => setShowAttendeForm(true)}>
              Add Attendee
            </Button>
            <AttendeeForm
              close={() => setShowAttendeForm(false)}
              show={showAttendeForm}
            />
          </div>
        </Container>
        <div className="mt-5">
          <Button variant="primary" onClick={() => setShowAddAttendeToPresentation(true)}>
            Add Attendee to Presentation
          </Button>
          <AddAttendeeToPresentatioForm
            close={() => setShowAddAttendeToPresentation(false)}
            show={showAddAttendeToPresentation}
            presentations={presentations}
          />
        </div>
      </header>
    </div>
  )
}

export default App
