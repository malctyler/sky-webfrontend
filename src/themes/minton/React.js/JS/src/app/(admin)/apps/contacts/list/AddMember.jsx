import { FormInput, VerticalForm } from "@/components/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "react-bootstrap";
import * as yup from "yup";

// components

const AddMember = ({
  show,
  onHide,
  onSubmit
}) => {
  /*
    form validation schema
    */
  const schemaResolver = yupResolver(yup.object().shape({
    name: yup.string().required("Please enter name"),
    position: yup.string().required("Please enter position"),
    company: yup.string().required("Please enter company"),
    email: yup.string().required("Please enter email").email("Please enter valid email")
  }));
  return <>
      <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="bg-light" onHide={onHide} closeButton>
          <Modal.Title className="m-0">Add New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
            <FormInput label="Name" type="text" name="name" placeholder="Enter name" containerClass={"mb-3"} />
            <FormInput label="Position" type="text" name="position" placeholder="Enter position" containerClass={"mb-3"} />
            <FormInput label="Company" type="text" name="company" placeholder="Enter company" containerClass={"mb-3"} />
            <FormInput label="Email address" type="email" name="email" placeholder="Enter email" containerClass={"mb-3"} />

            <div className="text-end">
              <Button variant="success" type="submit" className="waves-effect waves-light me-1">
                Save
              </Button>
              <Button variant="danger" className="waves-effect waves-light" onClick={onHide}>
                Continue
              </Button>
            </div>
          </VerticalForm>
        </Modal.Body>
      </Modal>
    </>;
};
export default AddMember;