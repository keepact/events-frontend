import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { Form, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";


interface IAttendeeForm {
  name: string;
  company: string;
  email: number;
}

const AttendeeForm: React.FC = () => {
  const attendeeValidationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    company: Yup.number().required("Company is required."),
    email: Yup.string().required("Email Name is required."),
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Input
          {...register("name")}
          containerProps={{
            className: "col-auto",
          }}
          label="Attendee Name"
          text="Please input the attendee name"
          error={errors.name?.message}
        />
      </Row>
      <Row>
        <Input
          {...register("company")}
          containerProps={{
            className: "col-auto",
          }}
          label="Attendee Company"
          text="Please input the attendee company"
          error={errors.company?.message}
        />
      </Row>
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
      <button type="submit">
        Add Attendee
      </button>
    </Form>

  )
}

export { AttendeeForm };

