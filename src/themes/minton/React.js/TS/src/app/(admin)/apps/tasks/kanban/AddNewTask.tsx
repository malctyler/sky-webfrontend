import {CustomDatePicker} from "@/components";
import {FormInput} from "@/components/Form";
import {yupResolver} from "@hookform/resolvers/yup";

import {Button, Col, Modal, Row} from "react-bootstrap";
import * as yup from "yup";
import {useForm} from "react-hook-form";

interface AddNewTaskProps {
    show: boolean;
    toggle: () => void;
}

const AddNewTask = ({show, toggle}: AddNewTaskProps) => {

    const schemaResolver = yupResolver(
        yup.object().shape({
            title: yup.string().required(),
            priority: yup.string().required(),
            description: yup.string().required(),
        })
    );

    const {
        register,
        control,
        formState: {errors},
    } = useForm({resolver: schemaResolver});

    return (
        <Modal show={show} onHide={toggle} size="lg" centered>
            <Modal.Header closeButton>
                <h4 className="modal-title">Create New Task</h4>
            </Modal.Header>
            <Modal.Body>
                <form className="px-2">
                    <FormInput
                        name="title"
                        label="Title"
                        placeholder="Enter title"
                        type="text"
                        containerClass="mb-3"
                        className="form-control form-control-light"
                        register={register}
                        key="title"
                        errors={errors}
                        control={control}
                    />

                    <FormInput
                        name="description"
                        label="Description"
                        type="textarea"
                        containerClass="mb-3"
                        className="form-control form-control-light"
                        rows={3}
                        register={register}
                        key="description"
                        errors={errors}
                        control={control}
                    />

                    <Row>
                        <Col md={6}>
                            <FormInput
                                name="priority"
                                label="Priority"
                                type="select"
                                containerClass="mb-3"
                                className="form-select form-control-light"
                                register={register}
                                key="priority"
                                errors={errors}
                                control={control}
                            >
                                <option value="">Select</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </FormInput>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <label className="form-label">Due Date</label> <br/>
                                <CustomDatePicker
                                    hideAddon
                                    dateFormat="yyyy-MM-dd"
                                    inputClass="form-control-light"
                                    onChange={()=>{}}
                                />
                            </div>
                        </Col>
                    </Row>

                    <div className="text-end">
                        <Button
                            variant="light"
                            className="me-1"
                            onClick={toggle}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddNewTask;
