const WindowPrintButton = () => {
  return <button onClick={() => window.print()} className="btn btn-primary waves-effect waves-light me-1">
      <i className="mdi mdi-printer me-1"></i> Print
    </button>;
};
export default WindowPrintButton;