import Swal from "sweetalert2";

const useSweetAlert = (
  functionToCall: (val1?: string, val2?: string) => string,
  message: string,
  confirmButtonText: string,
  cancelButtonText: string,
  text: string,
  publishTitle: string,
  cancleTitle: string,
  cancelText: string
) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-green-700 p-3 rounded-lg text-white mx-2",
      cancelButton: "p-3 bg-red-700 rounded-lg text-white ",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      //   text: "Everyone will see this!",
      text: text,
      icon: "warning",
      showCancelButton: true,
      //   confirmButtonText: "Yes, publish it!",
      //   cancelButtonText: "No, cancel!",
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        functionToCall;
        swalWithBootstrapButtons.fire({
          title: publishTitle,
          text: message.toString(),
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: cancleTitle,
          //   text: "No one else will see this except you :)",
          text: cancelText,
          icon: "error",
        });
      }
    });

  return {};
};

export default useSweetAlert;
