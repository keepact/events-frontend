import { useCallback, useEffect, useState } from 'react'
import { PresentationForm } from './modules/PresentationForm';
import { AttendeeForm } from './modules/AttendeeForm';

import logo from './logo.svg'
import './App.css'
import { AddAttendeeToPresentatioForm } from './modules/AddAttendeeToPresentatioForm';
import { IPresentation } from './@types';

function App() {
  const [presentations, setPresentations] = useState<IPresentation[]>([])

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
        <p>Welcome!</p>
        <div>
          <div>
            <p>Add Presentation</p>
          </div>
          <PresentationForm />
        </div>
        <div>
          <div>
            <p>Add Attendee</p>
          </div>
          <AttendeeForm />
        </div>
        <div>
          <div>
            <p>Add Attendee to presentation</p>
          </div>
          <AddAttendeeToPresentatioForm presentations={presentations} />
        </div>
      </header>
    </div>
  )
}

export default App
