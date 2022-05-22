import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { Select } from "../Select";

import { Form, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { IPresentation } from "../../@types";


interface IAddAttendeeToPresentatioForm {
  email: string;
  presentationId: string;
}

interface IProps {
  presentations: IPresentation[];
}

const AddAttendeeToPresentatioForm: React.FC<IProps> = ({ presentations }) => {
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Input
          {...register("email")}
          containerProps={{
            className: "col-auto",
          }}
          label="Attendee Email"
          text="Please input the attendee email"
          error={errors.email?.message}
        />
      </Row>
      <Row>
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
      </Row>
      <button type="submit">
        Add Attendee to presentation
      </button>
    </Form>

  )
}

export { AddAttendeeToPresentatioForm };

