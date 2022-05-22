import { Fragment } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { IPresentation } from "../../@types";


interface IProps {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  presentations: IPresentation[];
}

const PresentationList: React.FC<IProps> = ({ presentations, show, setShowModal }) => {
  const presentationsKeys = presentations[0] && Object.keys(presentations[0]);

  return (
    <Modal show={show} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Presentation List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              {presentations[0] && presentationsKeys.map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {presentations[0] && presentations.map(presentation => (
                <Fragment key={presentation.id}>
                  <td>{presentation.id}</td>
                  <td>{presentation.details}</td>
                  <td>{presentation.room}</td>
                  <td>{presentation.speaker.name}</td>
                  <td>{presentation.attendees?.map(attendee => attendee.name).join(", ")}</td>
                </Fragment>
              ))}
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export { PresentationList };
