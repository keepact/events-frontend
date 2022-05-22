import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";


interface IAttendeeForm {
  name: string;
  company: string;
  email: number;
}

interface IProps {
  show: boolean;
  close: () => void;
}

const AttendeeForm: React.FC<IProps> = ({ show, close }) => {
  const attendeeValidationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    company: Yup.string().required("Company is required."),
    email: Yup.string().required("Email is required."),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IAttendeeForm>({
    resolver: yupResolver(attendeeValidationSchema),
  });


  const onSubmit = useCallback<SubmitHandler<IAttendeeForm>>(
    async attendee => {
      const data = await fetch("/attendees", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attendee)
      });
      const content = await data.json();
      return content;
    },
    [],
  );

  return (
    <Modal show={show} onHide={close}>
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

export { AttendeeForm };

