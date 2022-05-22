import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { Form, Row } from "react-bootstrap";
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

const PresentationForm: React.FC = () => {
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Input
          {...register("details")}
          containerProps={{
            className: "col-auto",
          }}
          label="Details"
          text="Please input the event details"
          error={errors.details?.message}
        />
      </Row>
      <Row>
        <Input
          {...register("room")}
          containerProps={{
            className: "col-auto",
          }}
          label="Room"
          text="Please input the event room"
          error={errors.room?.message}
        />
      </Row>
      <Row>
        <Input
          {...register("speakerName")}
          containerProps={{
            className: "col-auto",
          }}
          label="Speaker Name"
          text="Please input the speaker name"
          error={errors.speakerName?.message}
        />
      </Row>
      <Row>
        <Input
          {...register("speakerCompany")}
          containerProps={{
            className: "col-auto",
          }}
          label="Speaker Company"
          text="Please input the speaker company"
          error={errors.speakerCompany?.message}
        />
      </Row>
      <Row>
        <Input
          {...register("speakerEmail")}
          containerProps={{
            className: "col-auto",
          }}
          label="Speaker Email"
          text="Please input the speaker email"
          error={errors.speakerEmail?.message}
        />
      </Row>
      <Row>
        <Input
          {...register("speakerBio")}
          containerProps={{
            className: "col-auto",
          }}
          label="Speaker Bio"
          text="Please input the speaker email"
          error={errors.speakerBio?.message}
        />
      </Row>
      <button type="submit">
        Add Presentation
      </button>
    </Form>

  )
}

export { PresentationForm };

