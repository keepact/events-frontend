import {
  Form,
  FormGroupProps,
  FormLabelProps,
  FormTextProps,
  FloatingLabel,
  FormSelectProps,
} from "react-bootstrap";
import React, { forwardRef } from "react";

interface ISelectProps extends FormSelectProps {
  label?: string;
  text?: string;
  error?: string;
  textarea?: boolean;
  floatingLabel?: boolean;
  rows?: number;
  as?: any;

  containerProps?: FormGroupProps;
  labelProps?: FormLabelProps;
  textProps?: FormTextProps;
}

interface ISelectRef extends HTMLSelectElement { }

const Select = forwardRef<ISelectRef, ISelectProps>(
  (
    {
      label,
      text,
      error,
      containerProps,
      labelProps,
      textProps,
      floatingLabel,
      children,
      as,
      ...rest
    },
    ref,
  ) => {
    const ParentComponent = floatingLabel ? FloatingLabel : Form.Group;
    return (
      <ParentComponent
        as={as}
        {...containerProps}
        {...(floatingLabel && { label })}
      >
        {!!label && !floatingLabel && (
          <Form.Label {...labelProps}>{label}</Form.Label>
        )}
        <Form.Select ref={ref} {...rest}>
          {children}
        </Form.Select>
        {(!!text || !!error) && (
          <Form.Text className={error ? "text-danger" : ""} {...textProps}>
            {error || text}
          </Form.Text>
        )}
      </ParentComponent>
    );
  },
);

export { Select };
