import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// images
import logosm from "@/assets/images/logo-sm-dark.png";
const ReactSwal = withReactContent(Swal);
const openAlert = options => {
  ReactSwal.fire(options);
};
const AllSweetAlerts = () => {
  return <tbody>
        <tr>
            <td>A basic message</td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="sa-basic" onClick={() => openAlert({
          title: "Any fool can use a computer!",
          confirmButtonColor: "#3bafda"
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>A title with a text under</td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="sa-title" onClick={() => openAlert({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question",
          confirmButtonColor: "#3bafda"
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>A success message!</td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="sa-success" onClick={() => openAlert({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3bafda",
          cancelButtonColor: "#f1556c"
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>A modal window with a long content inside:</td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="sa-long-content" onClick={() => openAlert({
          imageUrl: "https://placeholder.pics/svg/300x1500",
          imageHeight: 1500,
          imageAlt: "A tall image",
          confirmButtonColor: "#3bafda"
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>A custom positioned dialog</td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="sa-custom-position" onClick={() => openAlert({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>
                A modal with a title, an error icon, a text, and a footer
            </td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="sa-error" onClick={() => openAlert({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "<a href>Why do I have this issue?</a>",
          confirmButtonColor: "#3bafda"
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>
                A confirm dialog, with a function attached to the
                &quot;Confirm&quot;-button...
            </td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="sa-warning" onClick={() => ReactSwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#1abc9c",
          cancelButtonColor: "#f1556c",
          confirmButtonText: "Yes, delete it!"
        }).then(function (result) {
          if (result.value) {
            ReactSwal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>
                By passing a parameter, you can execute something else for
                &quot;Cancel&quot;.
            </td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="sa-params" onClick={() => ReactSwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          customClass: {
            confirmButton: 'btn btn-primary mt-2',
            cancelButton: 'btn btn-danger ms-2 mt-2'
          },
          buttonsStyling: false
        }).then(function (result) {
          if (result.value) {
            ReactSwal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              confirmButtonColor: "#1abc9c"
            });
          } else if (
          // Read more about handling dismissals
          result.dismiss === ReactSwal.DismissReason.cancel) {
            ReactSwal.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error",
              confirmButtonColor: "#1abc9c"
            });
          }
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>A message with custom Image Header</td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="sa-image" onClick={() => openAlert({
          title: "Minton",
          text: "Responsive Bootstrap 5 Admin Dashboard",
          imageUrl: logosm,
          imageHeight: 50,
          confirmButtonColor: "#3bafda",
          animation: false
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>A message with auto close timer</td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="sa-close" onClick={() => ReactSwal.fire({
          title: "Auto close alert!",
          html: "I will close in <strong></strong> seconds.",
          timer: 2000,
          confirmButtonColor: "#3bafda"
        }).then(function (result) {
          if (
          // Read more about handling dismissals
          result.dismiss === ReactSwal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>Custom HTML description and buttons</td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="custom-html-alert" onClick={() => openAlert({
          title: "<i>HTML</i> <u>example</u>",
          icon: "info",
          html: "You can use <b>bold text</b>, " + '<a href="//coderthemes.com/">links</a> ' + "and other HTML tags",
          showCloseButton: true,
          showCancelButton: true,
          customClass: {
            confirmButton: "btn btn-success mt-2",
            cancelButton: "btn btn-danger ms-2 mt-2"
          },
          confirmButtonColor: "#1abc9c",
          cancelButtonColor: "#f1556c",
          confirmButtonText: '<i class="mdi mdi-thumb-up-outline"></i> Great!',
          cancelButtonText: '<i class="mdi mdi-thumb-down-outline"></i>'
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>A message with custom width, padding and background</td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="custom-padding-width-alert" onClick={() => openAlert({
          title: "Custom width, padding, background.",
          width: 600,
          padding: 100,
          confirmButtonColor: "#3bafda",
          background: "#fff url(//subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png)"
        })}>
                    Click me
                </button>
            </td>
        </tr>
        <tr>
            <td>Ajax request example</td>
            <td>
                <button type="button" className="btn btn-info btn-xs" id="ajax-alert" onClick={() => ReactSwal.fire({
          title: "Submit your Github username",
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          confirmButtonText: "Look up",
          showLoaderOnConfirm: true,
          confirmButtonColor: "#3bafda",
          cancelButtonColor: "#f1556c",
          preConfirm: function (login) {
            return fetch("https://api.github.com/users/" + login).then(function (response) {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            }).catch(function (error) {
              ReactSwal.showValidationMessage("Request failed: " + error);
            });
          },
          allowOutsideClick: false
        }).then(function (result) {
          if (result.value) {
            ReactSwal.fire({
              title: result.value.login + "'s avatar",
              imageUrl: result.value.avatar_url,
              imageHeight: 60,
              confirmButtonColor: "#1abc9c"
            });
          }
        })}>
                    Click me
                </button>
            </td>
        </tr>
        </tbody>;
};
export default AllSweetAlerts;