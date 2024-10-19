import Swal from "sweetalert2";

const DeleteButton = ({ api, id, getData }) => {
  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          api(id).unwrap()
            .then(() => {
              getData();
            })
            .catch(() => {
              showErrorAlert();
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)"
          );
        }
      });
  };

  const showErrorAlert = () => {
    Swal.fire(
      "Error",
      "You can't delete this user. You should have super admin permissions.",
      "error"
    );
  };

  return (
    <div title="Delete" className="icon-1" onClick={handleDelete} type="button">
      <i className="bi bi-trash"></i>
    </div>
  );
};

export default DeleteButton;
