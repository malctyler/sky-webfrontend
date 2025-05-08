

import { Modal, Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// editor
import 'react-quill-new/dist/quill.snow.css';

// styles
import { FormInput, VerticalForm } from "@/components/Form";
import ReactQuill from "react-quill-new";

interface ComposeEmailProps {
  isOpen: boolean;
  toggleComposeModal: () => void;
}

const modules = {
    toolbar: [
        [{font: []}, {size: []}],
        ['bold', 'italic', 'underline', 'strike'],
        [{color: []}, {background: []}],
        [{script: 'super'}, {script: 'sub'}],
        [{header: [false, 1, 2, 3, 4, 5, 6]}, 'blockquote', 'code-block'],
        [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
        ['direction', {align: []}],
        ['link', 'image', 'video'],
        ['clean'],
    ],
}

const ComposeEmail = ({ isOpen, toggleComposeModal }: ComposeEmailProps) => {

  const schemaResolver = yupResolver(
    yup.object().shape({
      to: yup
        .string()
        .required("Please specify to email")
        .email("Please enter Email"),
      subject: yup.string().required("Please specify subject"),
    })
  );

  return (
    <Modal show={isOpen} onHide={toggleComposeModal} centered>
      <Modal.Header closeButton onHide={toggleComposeModal}>
        <Modal.Title as="h5">New Message</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-3">
        <VerticalForm onSubmit={() => {}} resolver={schemaResolver}>
          <FormInput
            label="To"
            type="email"
            name="to"
            placeholder="Example@email.com"
            containerClass={"mb-2"}
          />
          <FormInput
            label="Subject"
            type="text"
            name="subject"
            placeholder="Your subject"
            containerClass={"mb-2"}
          />
          <div className="mb-2">
            <label className="form-label">Message</label>
            <ReactQuill theme="snow" modules={modules}
                          style={{minHeight: "200px", width: "100%"}}/>
          </div>
        </VerticalForm>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={toggleComposeModal}>
          Close
        </Button>
        <Button type="submit">
          Send <i className="fab fa-telegram-plane ms-1"></i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComposeEmail;
