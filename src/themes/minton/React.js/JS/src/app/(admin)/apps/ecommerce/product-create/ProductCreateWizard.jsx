import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { useWizard, Wizard } from 'react-use-wizard';
import 'react-quill-new/dist/quill.snow.css';

// components
import { FormInput } from "@/components/Form";
import { FileUploader } from "@/components";
import ReactQuill from "react-quill-new";
const modules = {
  toolbar: [[{
    font: []
  }, {
    size: []
  }], ['bold', 'italic', 'underline', 'strike'], [{
    color: []
  }, {
    background: []
  }], [{
    script: 'super'
  }, {
    script: 'sub'
  }], [{
    header: [false, 1, 2, 3, 4, 5, 6]
  }, 'blockquote', 'code-block'], [{
    list: 'ordered'
  }, {
    list: 'bullet'
  }, {
    indent: '-1'
  }, {
    indent: '+1'
  }], ['direction', {
    align: []
  }], ['link', 'image', 'video'], ['clean']]
};
const Header = () => {
  const {
    goToStep,
    activeStep
  } = useWizard();
  return <ul className="nav-justified twitter-bs-wizard-nav mb-2 nav nav-pills mb-3">
            <li className="nav-item" role="presentation">
                <button onClick={() => goToStep(0)} type="button" className={`nav-link ${activeStep === 0 && 'active'}`}>
                    <span className="number">01</span><span className="d-none d-sm-inline">General</span></button>
            </li>
            <li className="nav-item" role="presentation">
                <button onClick={() => goToStep(1)} type="button" className={`nav-link ${activeStep === 1 && 'active'}`}>
                    <span className="number">02</span><span className="d-none d-sm-inline">Product Images</span></button>
            </li>
            <li className="nav-item" role="presentation">
                <button onClick={() => goToStep(2)} type="button" className={`nav-link ${activeStep === 2 && 'active'}`}>
                    <span className="number">03</span><span className="d-none d-sm-inline">Meta Data</span></button>
            </li>
        </ul>;
};
const Step1 = () => {
  const categories = [{
    label: "Shopping",
    options: [{
      value: "SH1",
      label: "Shopping 1"
    }, {
      value: "SH2",
      label: "Shopping 2"
    }, {
      value: "SH3",
      label: "Shopping 3"
    }]
  }, {
    label: "CRM",
    options: [{
      value: "CRM1",
      label: "Crm 1"
    }, {
      value: "CRM2",
      label: "Crm 2"
    }, {
      value: "CRM3",
      label: "Crm 3"
    }, {
      value: "CRM4",
      label: "Crm 4"
    }]
  }, {
    label: "eCommerce",
    options: [{
      value: "E1",
      label: "eCommerce 1"
    }, {
      value: "E2",
      label: "eCommerce 2"
    }, {
      value: "E3",
      label: "eCommerce 3"
    }, {
      value: "E4",
      label: "eCommerce 4"
    }]
  }];
  const schemaResolver = yupResolver(yup.object().shape({
    name: yup.string().required("Please enter Project Name"),
    summary: yup.string().required("Please enter Project Name"),
    price: yup.string().required("Please enter Project Name"),
    comment: yup.string().required("Please enter Project Name")
  }));
  const {
    register,
    control,
    formState: {
      errors
    }
  } = useForm({
    resolver: schemaResolver
  });
  const {
    nextStep
  } = useWizard();
  return <>
            <h4 className="header-title">
                General Information
            </h4>
            <p className="sub-header">
                Fill all information below
            </p>

            <div>
                <form>
                    <FormInput name="name" label="Product Name" placeholder="e.g : Apple iMac" containerClass={"mb-3"} register={register} key="productname" errors={errors} control={control} />
                    <Form.Group className="mb-3">
                        <Form.Label>Product Description</Form.Label>

                        <ReactQuill theme="snow" modules={modules} style={{
            minHeight: "300px",
            width: "100%"
          }} />
                    </Form.Group>

                    <Row>
                        <Col lg={6}>
                            <FormInput type="textarea" rows={5} name="summary" label="Product Summary" placeholder="Please enter summary" containerClass={"mb-3"} register={register} key="summary" errors={errors} control={control} />
                        </Col>

                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Categories</Form.Label>
                                <Select className="react-select react-select-container" classNamePrefix="react-select" options={categories} id="product-category" />
                            </Form.Group>

                            <FormInput name="price" label="Price" placeholder="Enter amount" containerClass={"mb-3"} register={register} key="price" errors={errors} control={control} />
                        </Col>
                    </Row>

                    <div className="mb-3">
                        <label className="mb-2">Status</label>
                        <br />
                        <div className="radio form-check-inline">
                            <input type="radio" id="inlineRadio1" value="option1" name="radioInline" defaultChecked />{" "}
                            <label htmlFor="inlineRadio1">
                                Online
                            </label>
                        </div>
                        <div className="radio form-check-inline">
                            <input type="radio" id="inlineRadio2" value="option2" name="radioInline" />{" "}
                            <label htmlFor="inlineRadio2">
                                {" "}
                                Offline{" "}
                            </label>
                        </div>
                        <div className="radio form-check-inline">
                            <input type="radio" id="inlineRadio3" value="option3" name="radioInline" />{" "}
                            <label htmlFor="inlineRadio3">
                                {" "}
                                Draft{" "}
                            </label>
                        </div>
                    </div>

                    <FormInput type="textarea" rows={3} name="comment" label="Comment" placeholder="Please enter comment" containerClass={"mb-3"} register={register} key="comment" errors={errors} control={control} />

                    <ul className="pager wizard mb-0 list-inline text-end mt-3">
                        <li className="next list-inline-item float-end">
                            <Button onClick={nextStep} variant="success" type="submit">
                                Add More Info{" "}
                                <i className="mdi mdi-arrow-right ms-1"></i>
                            </Button>
                        </li>
                    </ul>
                </form>
            </div>
        </>;
};
const Step2 = () => {
  const {
    previousStep,
    nextStep
  } = useWizard();
  return <>
            <h4 className="header-title">Product Images</h4>
            <p className="sub-header">Upload product image</p>

            <div>
                <FileUploader />
            </div>

            <ul className="pager wizard mb-0 list-inline text-end mt-3">
                <li className="previous list-inline-item">
                    <Button onClick={previousStep} variant="secondary">
                        <i className="mdi mdi-arrow-left"></i> Back
                        to General
                    </Button>
                </li>
                <li className="next list-inline-item float-end">
                    <Button onClick={nextStep} variant="success" type="submit">
                        Add Meta Data{" "}
                        <i className="mdi mdi-arrow-right ms-1"></i>
                    </Button>
                </li>
            </ul>
        </>;
};
const Step3 = () => {
  const schemaResolver = yupResolver(yup.object().shape({
    name: yup.string().required("Please enter Project Name"),
    summary: yup.string().required("Please enter Project Name"),
    price: yup.string().required("Please enter Project Name"),
    comment: yup.string().required("Please enter Project Name")
  }));
  const {
    register,
    control,
    formState: {
      errors
    }
  } = useForm({
    resolver: schemaResolver
  });
  const {
    previousStep
  } = useWizard();
  return <>
            <h4 className="header-title">Meta Data</h4>
            <p className="sub-header">
                Fill all information below
            </p>
            <div>
                <FormInput name="metatitle" label="Meta title" placeholder="Enter title" containerClass={"mb-3"} register={register} key="metatitle" errors={errors} control={control} />
                <FormInput name="metakeywords" label="Meta Keywords" placeholder="Enter keywords" containerClass={"mb-3"} register={register} key="metakeywords" errors={errors} control={control} />
                <FormInput type="textarea" rows={5} name="metadescription" label="Meta Description" placeholder="Please enter description" containerClass={"mb-3"} register={register} key="metadescription" errors={errors} control={control} />
            </div>
            <ul className="pager wizard mb-0 list-inline text-end mt-3">
                <li className="previous list-inline-item">
                    <Button onClick={previousStep} variant="secondary">
                        <i className="mdi mdi-arrow-left"></i> Edit
                        Information
                    </Button>
                </li>

                <li className="next list-inline-item float-end">
                    <Button variant="success">
                        Publish Product{" "}
                        <i className="mdi mdi-arrow-right ms-1"></i>
                    </Button>
                </li>
            </ul>
        </>;
};
const ProductCreateWizard = () => {
  return <>
            <Wizard header={<Header />}>
                <Step1 />
                <Step2 />
                <Step3 />
            </Wizard>
        </>;
};
export default ProductCreateWizard;