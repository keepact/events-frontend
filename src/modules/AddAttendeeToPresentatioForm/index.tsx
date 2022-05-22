import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";

import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { IPresentation } from "../../@types";


interface IAddAttendeeToPresentatioForm {
  email: string;
  presentationId: string;
}

interface IProps {
  show: boolean;
  close: () => void;
  presentations: IPresentation[];
}

const AddAttendeeToPresentatioForm: React.FC<IProps> = ({ presentations, show, close }) => {
  const addAttendeeToPresentatioFormValidationSchema = Yup.object({
    email: Yup.string().required("Email is required."),
    presentationId: Yup.string().required("Presentation id is required."),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IAddAttendeeToPresentatioForm>({
    resolver: yupResolver(addAttendeeToPresentatioFormValidationSchema),
  });


  const onSubmit = useCallback<SubmitHandler<IAddAttendeeToPresentatioForm>>(
    async attendee => {
      const data = await fetch(`/presentations/:${attendee.presentationId}/attendees/:${attendee.email}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const content = await data.json();
      return content;
    },
    [],
  );



  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Add Attendee to Presentation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Container>
            <Row>
              <Col>
                <Input
                  {...register("email")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Attendee Email"
                  text="Please input the attendee email"
                  error={errors.email?.message}
                />
              </Col>
              <Col>
                <Select
                  {...register("presentationId")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Presentation ID"
                  text="Please input the presentation ID"
                  error={errors.presentationId?.message}
                  as="div"
                >
                  {presentations && presentations.map(presentation =>
                    <option value={presentation.id}>{presentation.id}</option>
                  )}
                </Select>
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={handleSubmit(onSubmit)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export { AddAttendeeToPresentatioForm };

