import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";

interface IPresentationForm {
  details: string;
  room: number;
  speakerName: string;
  speakerCompany: string;
  speakerEmail: string;
  speakerBio: string;
}

interface IProps {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  reload: React.Dispatch<React.SetStateAction<boolean>>;
}

const PresentationForm: React.FC<IProps> = ({ show, setShowModal, reload }) => {
  const presentationValidationSchema = Yup.object({
    details: Yup.string().required("Details is required."),
    room: Yup.string().required("Room is required."),
    speakerName: Yup.string().required("Speaker Name is required."),
    speakerCompany: Yup.string().required("Speaker Company is required."),
    speakerEmail: Yup.string().email().required("Speaker Email is required."),
    speakerBio: Yup.string().required("Speaker Bio is required."),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IPresentationForm>({
    resolver: yupResolver(presentationValidationSchema),
  });

  const onSubmit = useCallback<SubmitHandler<IPresentationForm>>(
    async ({ details, room, speakerBio, speakerCompany, speakerEmail, speakerName }) => {
      const speaker = {
        email: speakerEmail,
        name: speakerName,
        company: speakerCompany,
        bio: speakerBio
      }

      const presentation = { details, room: +room, speaker }

      try {
        const data = await fetch(`${import.meta.env.VITE_BASE_URL}/presentation`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(presentation)
        });
        const content = await data.json();
        reload(true);
        setShowModal(false);
        return content;
      } catch (err) {
        console.log(err)
      }
    },
    [],
  );

  return (
    <Modal show={show} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Presentation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Container>
            <Row>
              <Col>
                <Input
                  {...register("details")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Details*"
                  error={errors.details?.message}
                />
              </Col>
              <Col>
                <Input
                  {...register("room")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Room*"
                  error={errors.room?.message}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Input
                  {...register("speakerName")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Speaker Name*"
                  error={errors.speakerName?.message}
                />
              </Col>
              <Col>
                <Input
                  {...register("speakerCompany")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Speaker Company*"
                  error={errors.speakerCompany?.message}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Input
                  {...register("speakerEmail")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Speaker Email*"
                  error={errors.speakerEmail?.message}
                />
              </Col>
              <Col>
                <Input
                  {...register("speakerBio")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Speaker Bio*"
                  error={errors.speakerBio?.message}
                />
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={handleSubmit(onSubmit)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export { PresentationForm };

