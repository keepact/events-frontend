import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";

import { Input } from "../../components/Input";
import { Toast } from "../../components/Toast";
import { IToastState } from "../../@types";

interface IAttendeeForm {
  name: string;
  company: string;
  email: number;
}

interface IProps {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AttendeeForm: React.FC<IProps> = ({ show, setShowModal }) => {
  const [showToast, setShowToast] = useState<IToastState>({
    isError: false,
    visible: false,
    errorMessage: undefined
  });

  const attendeeValidationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    company: Yup.string().required("Company is required."),
    email: Yup.string().email().required("Email is required."),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IAttendeeForm>({
    resolver: yupResolver(attendeeValidationSchema),
  });

  const onSubmit = useCallback<SubmitHandler<IAttendeeForm>>(
    async attendee => {
      try {
        const data = await fetch(`${import.meta.env.VITE_BASE_URL}/attendees`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(attendee)
        })
        const content = await data.json()
        if (content.error) {
          setShowToast({ isError: true, visible: true, errorMessage: content.error })
        } else {
          setShowToast({ isError: false, visible: true })
          setTimeout(() => {
            setShowModal(false);
          }, 2000)
        }
        return content
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
        <Modal.Title>Add Attendee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Container>
            <Row>
              <Col>
                <Input
                  {...register("name")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Attendee Name*"
                  error={errors.name?.message}
                />
              </Col>
              <Col>
                <Input
                  {...register("company")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Attendee Company*"
                  error={errors.company?.message}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Input
                  {...register("email")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Attendee Email*"
                  error={errors.email?.message}
                />
              </Col>
            </Row>
          </Container>
        </Form >
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

export { AttendeeForm };

