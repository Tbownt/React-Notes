import { useEffect, useMemo, useState } from "react";

import { useCalendarStore, useUiStore } from "../../hooks";

import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import { addHours, differenceInSeconds } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

//esta funcion solo hace que los inputs del tipo DatePicker se pasen a español pasandole como argumentos
//un estring y un modulo de date-fns
registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent, setActiveEvent } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date().getTime(),
    end: addHours(new Date(), 2),
  });

  //Validaciones

  const isValid = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  //Efectos

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  //Changes

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
    setActiveEvent(null);
  };

  //Eventos
  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1 className="m-2"> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          {/* input de fecha */}
          <DatePicker
            selected={formValues.start}
            className="form-control custom-datepicker"
            onChange={(event) => onDateChanged(event, "start")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
            timeFormat="h:mm:ss a"
            popperPlacement={
              window.innerWidth > 768 ? "bottom-start" : "bottom-end"
            }
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          {/* input de fecha */}
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(event) => onDateChanged(event, "end")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
            timeFormat="h:mm:ss a"
            //personalmente agregue un tiempo minimo y maximo para el input de end
            //agregue un condicional dado a que si solamente pongo la fecha limite con el max y el min
            //cuando el usuario borra el contenido del input no puede hacer la evaluacion
            //de esta forma, el usuario puede borrar la informacion almacenada y manejarla a su gusto
            minTime={formValues.start ? formValues.start : new Date().getTime()}
            //la hora maxima para un evento sera la hora que inicio el inicio en un rango de 12 horas
            maxTime={addHours(formValues.start, 12)}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${isValid}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
