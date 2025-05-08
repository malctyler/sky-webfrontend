import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
const AddEditEvent = ({
  eventData,
  isEditable,
  onAddEvent,
  onRemoveEvent,
  onUpdateEvent,
  open,
  toggle
}) => {
  const eventFormSchema = yup.object({
    title: yup.string().required('Please enter event title'),
    category: yup.string().required('Please select event category')
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(eventFormSchema),
    defaultValues: {
      title: eventData?.title ?? '',
      category: eventData?.className ? String(eventData.className) : 'bg-danger'
    }
  });
  useEffect(() => {
    if (eventData?.title) {
      setValue('title', String(eventData?.title));
      setValue('category', String(eventData?.className));
    }
  }, [eventData]);
  useEffect(() => {
    if (!open) reset();
  }, [open]);
  const onSubmitEvent = data => {
    isEditable ? onUpdateEvent(data) : onAddEvent(data);
  };
  return <Modal show={open} onHide={toggle}>
            <Modal.Header className="py-3 px-4 border-bottom-0" closeButton>
                <Modal.Title as="h5" id="modal-title">
                    {isEditable ? "Edit Event" : "Add New Event"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 pb-4 pt-0">
                <form onSubmit={handleSubmit(onSubmitEvent)}>
                    <Row>
                        <Col sm={12}>
                            <Controller control={control} render={({
              field
            }) => <Form.Group className="mb-3">
                                        <Form.Label>Event Name</Form.Label>
                                        <Form.Control {...field} type="text" placeholder="Insert Event Name" />
                                    </Form.Group>} name="title" />
                        </Col>
                        <Col sm={12}>
                            <Controller control={control} render={({
              field
            }) => <Form.Group className="mb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select {...field}>
                                            <option value="bg-danger">Danger</option>
                                            <option value="bg-success">Success</option>
                                            <option value="bg-primary">Primary</option>
                                            <option value="bg-info">Info</option>
                                            <option value="bg-dark">Dark</option>
                                            <option value="bg-warning">Warning</option>
                                        </Form.Select>
                                    </Form.Group>} name="category" />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col sm={4}>
                            {isEditable ? <Button variant="danger" onClick={onRemoveEvent}>
                                    Delete
                                </Button> : null}
                        </Col>
                        <Col sm={8} className="text-end">
                            <Button variant="light" className="me-1" onClick={toggle}>
                                Close
                            </Button>
                            <Button variant="success" type="submit">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>;
};
export default AddEditEvent;