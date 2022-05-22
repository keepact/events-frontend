import {
  Form,
  FormGroupProps,
  FormControlProps,
  FormLabelProps,
  FormTextProps,
  FloatingLabel,
} from "react-bootstrap";
import { forwardRef } from "react";

interface IInputProps extends FormControlProps {
  label?: string;
  text?: string;
  error?: string;
  textarea?: boolean;
  floatingLabel?: boolean;
  rows?: number;

  containerProps?: FormGroupProps;
  labelProps?: FormLabelProps;
  textProps?: FormTextProps;
}

interface IInputRef extends HTMLInputElement { }

const Input = forwardRef<IInputRef, IInputProps>(
  (
    {
      label,
      text,
      error,
      containerProps,
      labelProps,
      textProps,
      textarea,
      floatingLabel,
      ...rest
    },
    ref,
  ) => {
    if (floatingLabel)
      return (
        <FloatingLabel {...containerProps} {...{ label }}>
          <Form.Control
            ref={ref}
            {...(textarea && { as: "textarea" })}
            {...rest}
          />
          {(!!text || !!error) && (
            <Form.Text className={error ? "text-danger" : ""} {...textProps}>
              {error || text}
            </Form.Text>
          )}
        </FloatingLabel>
      );
    return (
      <Form.Group {...containerProps}>
        {!!label && <Form.Label {...labelProps}>{label}</Form.Label>}
        <Form.Control
          ref={ref}
          {...(textarea && { as: "textarea" })}
          {...rest}
          autoCorrect="false"
        />
        {(!!text || !!error) && (
          <Form.Text className={error ? "text-danger" : ""} {...textProps}>
            {error || text}
          </Form.Text>
        )}
      </Form.Group>
    );
  },
);

export { Input };
