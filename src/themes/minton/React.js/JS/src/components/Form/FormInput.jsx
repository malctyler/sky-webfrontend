import classNames from "classnames";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
/* Password Input with addons */
const PasswordInput = ({
  name,
  placeholder,
  refCallback,
  errors,
  control,
  register,
  className,
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return <>
      <InputGroup className="mb-0">
        <Form.Control type={showPassword ? "text" : "password"} placeholder={placeholder} name={name} id={name} as="input" ref={r => {
        if (refCallback) refCallback(r);
      }} className={className} isInvalid={errors && errors[name] ? true : false} {...register ? register(name) : {}} autoComplete={name} {...otherProps} />
        <div className={classNames("input-group-text", "input-group-password", {
        "show-password": showPassword
      })} data-password={showPassword ? "true" : "false"}>
          <span className="password-eye" onClick={() => {
          setShowPassword(!showPassword);
        }}></span>
        </div>
      </InputGroup>

      {errors && errors[name] ? <Form.Control.Feedback type="invalid" className="d-block">
          {errors[name]["message"]}
        </Form.Control.Feedback> : null}
    </>;
};

// textual form-controls—like inputs, passwords, textareas etc.
const TextualInput = ({
  type,
  name,
  placeholder,
  endIcon,
  register,
  errors,
  comp,
  rows,
  className,
  refCallback,
  ...otherProps
}) => {
  return <>
      {type === "password" && endIcon ? <>
          <PasswordInput name={name} placeholder={placeholder} refCallback={refCallback} errors={errors} register={register} className={className} {...otherProps} />
        </> : <>
          <Form.Control type={type} placeholder={placeholder} name={name} as={comp} id={name} ref={r => {
        if (refCallback) refCallback(r);
      }} className={className} isInvalid={errors && errors[name] ? true : false} {...register ? register(name) : {}} rows={rows} {...otherProps}></Form.Control>

          {errors && errors[name] ? <Form.Control.Feedback type="invalid" className="d-block">
              {errors[name]["message"]}
            </Form.Control.Feedback> : null}
        </>}
    </>;
};

// non-textual checkbox and radio controls
const CheckInput = ({
  type,
  label,
  name,
  placeholder,
  register,
  errors,
  comp,
  rows,
  className,
  refCallback,
  ...otherProps
}) => {
  return <>
      <Form.Check type={type} label={label} name={name} id={name} ref={r => {
      if (refCallback) refCallback(r);
    }} className={className} isInvalid={errors && errors[name] ? true : false} {...register ? register(name) : {}} {...otherProps} />

      {errors && errors[name] ? <Form.Control.Feedback type="invalid" className="d-block">
          {errors[name]["message"]}
        </Form.Control.Feedback> : null}
    </>;
};

// handle select controls
const SelectInput = ({
  type,
  label,
  name,
  placeholder,
  register,
  errors,
  comp,
  className,
  children,
  refCallback,
  ...otherProps
}) => {
  return <>
      <Form.Select type={type} label={label} name={name} id={name} ref={r => {
      if (refCallback) refCallback(r);
    }} className={className} isInvalid={errors && errors[name] ? true : false} {...register ? register(name) : {}} {...otherProps}>
        {children}
      </Form.Select>
      {errors && errors[name] ? <Form.Control.Feedback type="invalid">
          {errors[name]["message"]}
        </Form.Control.Feedback> : null}
    </>;
};
const FormInput = ({
  label,
  type,
  name,
  placeholder,
  endIcon,
  register,
  errors,
  control,
  className,
  labelClassName,
  containerClass,
  refCallback,
  children,
  rows,
  ...otherProps
}) => {
  // handle input type
  const comp = type === "textarea" ? "textarea" : type === "select" ? "select" : "input";
  const hasEndIcon = endIcon !== undefined ? endIcon : true;
  return <>
      {type === "hidden" ? <input type={type} name={name} control={control} {...register ? register(name) : {}} {...otherProps} /> : <>
          {type === "select" ? <Form.Group className={containerClass}>
              {label && <Form.Label className={labelClassName}>{label}</Form.Label>}

              <SelectInput type={'select'} name={name} placeholder={placeholder} refCallback={refCallback} errors={errors} register={register} comp={comp} className={className} {...otherProps}>
                {children}
              </SelectInput>
            </Form.Group> : <>
              {type === "checkbox" || type === "radio" ? <Form.Group className={containerClass}>
                  <CheckInput type={type} label={label} name={name} placeholder={placeholder} refCallback={refCallback} errors={errors} register={register} comp={comp} className={className} rows={rows} {...otherProps} />
                </Form.Group> : <Form.Group className={containerClass}>
                  {label ? <Form.Label className={labelClassName}>{label}</Form.Label> : null}

                  <TextualInput control={control} type={type} name={name} placeholder={placeholder} endIcon={hasEndIcon} refCallback={refCallback} errors={errors} register={register} comp={comp} className={className} rows={rows} {...otherProps} />
                </Form.Group>}
            </>}
        </>}
    </>;
};
export default FormInput;