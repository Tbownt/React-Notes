import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal()); // Llama a la acción onOpenDateModal
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal()); // Llama a la acción onCloseDateModal
  };

  const toggleDateModal = () => {
    isDateModalOpen
      ? dispatch(onCloseDateModal())
      : dispatch(onOpenDateModal());
  };

  return {
    // Propiedades
    isDateModalOpen,
    // Métodos
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
