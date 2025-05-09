import { yupResolver } from "@hookform/resolvers/yup";
import { InputMask } from '@react-input/mask';
import { useForm } from "react-hook-form";
import Select from "react-select";
import * as yup from "yup";


// components
// dafault data
import { FormInput } from "@/components/Form";
import { Col, Row } from "react-bootstrap";
import { countries } from "./data";

// Billing
const Billing = () => {
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            billing_firstname: yup.string().required("Please enter firstname"),
            billing_lastname: yup.string().required("Please enter lastname"),
            billing_email: yup.string().required("Please enter Email address"),
        })
    );

    /*
     * form methods
     */
    const methods = useForm({resolver: schemaResolver});
    const {
        handleSubmit,
        register,
        control,
        formState: {errors},
    } = methods;

    return (
        <div>
            <h4 className="header-title">Billing Information</h4>
            <p className="sub-header">
                Fill the form below in order to send you the order&apos;s invoice.
            </p>

            <form onSubmit={handleSubmit(() => {
            })}>
                <Row>
                    <Col md={6}>
                        <FormInput
                            label="First Name"
                            type="text"
                            name="billing_firstname"
                            placeholder="Enter your first name"
                            containerClass={"mb-3"}
                            register={register}
                            key="firstname"
                            errors={errors}
                            control={control}
                        />
                    </Col>
                    <Col md={6}>
                        <FormInput
                            label="Last Name"
                            type="text"
                            name="billing_lastname"
                            placeholder="Enter your last name"
                            containerClass={"mb-3"}
                            register={register}
                            key="lastname"
                            errors={errors}
                            control={control}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormInput
                            label="Email Address"
                            type="email"
                            name="billing_email"
                            placeholder="Enter your email"
                            containerClass={"mb-3"}
                            register={register}
                            key="email"
                            errors={errors}
                            control={control}
                        />
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <InputMask mask="(___) ____-____" replacement={{_: /\d/}}
                                       placeholder="(xxx) xxxx-xxxx"
                                       className="form-control"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormInput
                            label="Address"
                            type="text"
                            name="billing_address"
                            placeholder="Enter full address"
                            containerClass={"mb-3"}
                            register={register}
                            key="address"
                            errors={errors}
                            control={control}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormInput
                            label="Town / City"
                            type="text"
                            name="billing_towncity"
                            placeholder="Enter your city name"
                            containerClass={"mb-3"}
                            register={register}
                            key="towncity"
                            errors={errors}
                            control={control}
                        />
                    </Col>
                    <Col md={4}>
                        <FormInput
                            label="State"
                            type="text"
                            name="billing_state"
                            placeholder="Enter your state"
                            containerClass={"mb-3"}
                            register={register}
                            key="state"
                            errors={errors}
                            control={control}
                        />
                    </Col>
                    <Col md={4}>
                        <FormInput
                            label="Zip / Postal Code"
                            type="text"
                            name="billing_zippostal"
                            placeholder="Enter your zip code"
                            containerClass={"mb-3"}
                            register={register}
                            key="zippostal"
                            errors={errors}
                            control={control}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="mb-3">
                            <label className="form-label">Country</label>
                            <Select
                                className="react-select react-select-container"
                                classNamePrefix="react-select"
                                options={countries}
                            ></Select>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <FormInput
                            label="Ship to different address ?"
                            type="checkbox"
                            name="customCheck2"
                            containerClass={"mb-3"}
                            register={register}
                            key="customCheck2"
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label="Order Notes:"
                            type="textarea"
                            rows={3}
                            name="billing_notes"
                            placeholder="Write some note.."
                            containerClass={"mb-3"}
                            register={register}
                            key="notes"
                            errors={errors}
                            control={control}
                        />
                    </Col>
                </Row>
            </form>
        </div>
    );
};

export default Billing;
