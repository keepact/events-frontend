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
  close: () => void;
}

const PresentationForm: React.FC<IProps> = ({ show, close }) => {
  const presentationValidationSchema = Yup.object({
    details: Yup.string().required("Details is required."),
    room: Yup.number().required("Room is required."),
    speakerName: Yup.string().required("Speaker Name is required."),
    speakerCompany: Yup.string().required("Speaker Company is required."),
    speakerEmail: Yup.string().required("Speaker Email is required."),
    speakerBio: Yup.string().required("Speaker Bio is required."),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IPresentationForm>({
    resolver: yupResolver(presentationValidationSchema),
  });


  const onSubmit = useCallback<SubmitHandler<IPresentationForm>>(
    async presentation => {
      const data = await fetch("/presentation", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(presentation)
      });
      const content = await data.json();
      return content;
    },
    [],
  );

  return (
    <Modal show={show} onHide={close}>
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
                  label="Details"
                  text="Please input the event details"
                  error={errors.details?.message}
                />
              </Col>
              <Col>
                <Input
                  {...register("room")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Room"
                  text="Please input the event room"
                  error={errors.room?.message}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  {...register("speakerName")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Speaker Name"
                  text="Please input the speaker name"
                  error={errors.speakerName?.message}
                />
              </Col>
              <Col>
                <Input
                  {...register("speakerCompany")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Speaker Company"
                  text="Please input the speaker company"
                  error={errors.speakerCompany?.message}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  {...register("speakerEmail")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Speaker Email"
                  text="Please input the speaker email"
                  error={errors.speakerEmail?.message}
                />
              </Col>
              <Col>
                <Input
                  {...register("speakerBio")}
                  containerProps={{
                    className: "col-auto",
                  }}
                  label="Speaker Bio"
                  text="Please input the speaker email"
                  error={errors.speakerBio?.message}
                />
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

export { PresentationForm };

