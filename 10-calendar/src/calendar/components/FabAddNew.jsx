import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Andres",
      },
    });
    openDateModal();
  };

  return (
    <button className="btn btn-success fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
