import React from "react";
import { Toast as BootstrapToast } from "react-bootstrap";

interface IToast {
  isError: boolean
  visible: boolean
}

interface IProps {
  showToast: IToast
  message: string
  setShowToast: React.Dispatch<React.SetStateAction<any>>
}

const Toast: React.FC<IProps> = ({ showToast, setShowToast, message }) => {
  return (
    <BootstrapToast
      onClose={() => setShowToast({ isError: showToast.isError, visible: false })}
      bg={showToast.isError ? "warning" : "success"}
      autohide
      delay={3000}
      show={showToast.visible}
    >
      <BootstrapToast.Header closeButton={false}>
        <strong className="me-auto">{showToast.isError ? "Error" : "Success"}</strong>
      </BootstrapToast.Header>
      <BootstrapToast.Body>{message}</BootstrapToast.Body>
    </BootstrapToast>
  );
}

export { Toast }