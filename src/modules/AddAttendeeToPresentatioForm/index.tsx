import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { IPresentation, IToastState } from "../../@types";

import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Toast } from "../../components/Toast";

interface IAddAttendeeToPresentatioForm {
  email: string;
  presentationId: string;
}

interface IProps {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  presentations: IPresentation[];
}

const AddAttendeeToPresentatioForm: React.FC<IProps> = ({ presentations, show, setShowModal }) => {
  const [showToast, setShowToast] = useState<IToastState>({ isError: false, visible: false });

  const addAttendeeToPresentatioFormValidationSchema = Yup.object({
    email: Yup.string().email().required("Email is required."),
    presentationId: Yup.string().required("Presentation id is required."),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IAddAttendeeToPresentatioForm>({
    resolver: yupResolver(addAttendeeToPresentatioFormValidationSchema),
  });

  const onSubmit = useCallback<SubmitHandler<IAddAttendeeToPresentatioForm>>(
    async attendee => {
      try {
        const data = await fetch(`${import.meta.env.VITE_BASE_URL}/presentations/${attendee.presentationId}/attendees/${attendee.email}`, {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        const content = await data.json()

        if (content.error) {
          setShowToast({ isError: true, visible: true, errorMessage: content.error })
        } else {
          setShowToast({ isError: false, visible: true })
          setTimeout(() => {
            setShowToast({ isError: false, visible: false })
            setShowModal(false);
            reset();
          }, 2000)
        }
      } catch (error: any | string) {
        setShowToast({ isError: true, visible: true, errorMessage: !!error.error ? error.error : error })
      }
    },
    [],
  );

  return (
    <Modal show={show} onHide={() => setShowModal(false)}>
      <Toast
        message={showToast.isError ? `${showToast.errorMessage}` : "Added"}
        showToast={showToast}
        setShowToast={setShowToast}
      />
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
                  label="Attendee Email*"
                  error={errors.email?.message}
                />
              </Col>
              <Col>
                <Select
                  {...register("presentationId")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Presentation ID*"
                  error={errors.presentationId?.message}
                >
                  {presentations && presentations.map(presentation =>
                    <option key={presentation.id} value={presentation.id}>{presentation.id}</option>
                  )}
                </Select>
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setShowModal(false)
          setShowToast({
            isError: showToast.isError,
            visible: false,
            errorMessage: !!showToast.errorMessage && showToast.errorMessage
          })
        }}>
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

