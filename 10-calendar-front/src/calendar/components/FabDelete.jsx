import { useCalendarStore, useUiStore } from "../../hooks";
import Swal from "sweetalert2";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras rehacer esta accion una vez tomada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Eliminado!",
          "Tu archivo ha sido borrado correctamente.",
          "success"
        );
        startDeletingEvent();
      }
    });
  };

  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display: hasEventSelected && !isDateModalOpen ? "" : "none",
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
