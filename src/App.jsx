import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import data from './dataset.json';
import FormFilters from "./components/FormFilters.jsx";

const App = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [states, setStates] = useState({
    fetchingData: false,
    showFilters: true,
  });
  const [formData, setFormData] = useState({
    typeGraphic: "",
    typeData: "",
    data: [],
    start: null,
    end: null,
  });

  const typeGraphics = [
    { value: "bars", label: "Gráfico de barras" },
    { value: "lines", label: "Gráfico de líneas" },
    { value: "pie", label: "Gráfico de torta" },
  ];

  const typeDataToShow = [
    { value: "ventas_por_region", label: "Datos de ventas por región" },
    { value: "usuarios_registrados_por_mes", label: "Datos de usuarios registrados por mes" },
    {
      value: "2",
      label: "Datos de tiempo de carga de la página por dispositivo",
    },
    { value: "3", label: "Datos de satisfacción del cliente por canal" },
    { value: "3", label: "Datos de rendimiento de las campañas de marketing" },
  ];

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  /**
   * @INFO Método para capturar los campos del formulario
   * @param {*} type hace refencia identificador del input
   * @param {*} value valor del input
   */
  const handleChangeInput = (type, value) => {
    setFormData({
      ...formData,
      [`${type}`]: value?.value,
    });
  };

  /**
   * @INFO Método para capturar las fechas
   * @param {*} dates
   */
  const onChangeDateRange = (dates) => {
    const [start, end] = dates;
    setFormData({
      ...formData,
      start,
      end,
    });
    setStartDate(start);
    setEndDate(end);
  };

  /**
   * @INFO Método para validar los campos obligatorios
   * @param {*} fields
   * @param {*} state
   * @returns returna true si tiene campos obligatorios sin llenar, false en otro caso
   */
  const hasEmptyFields = (fields, state) => {
    let { typeGraphic, typeData, start, end } = fields;
    if (state) return true;
    if (typeGraphic === "" || typeData === "") return true;
    if (start && !end) return true;
    return false;
  };

  /**
   * @INFO Obtener la data dependiendo de los filtros
   */
  const handleFetchData = async () => {
    setStates({ ...states, fetchingData: true });
    setTimeout(() => {
      console.log(data)
      setFormData({ ...formData, data: data[`${formData?.typeData}`] })
      setStates({ ...states, fetchingData: false, showFilters: false });
    }, 2000);
  };

  return (
    <div className="container-app md:container md:mx-auto p-2 md:p-4">
      <div className="mx-auto mb-1 lg:mb-2 w-full rounded-lg bg-white p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-2 ring-indigo-50">
        <h1 className="my-0 text-xl uppercase font-extrabold">
          Datos estadísticos
        </h1>
      </div>
      <div className="mx-auto mb-1 lg:mb-2 w-full rounded-lg bg-white p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-2 ring-indigo-50">
        <FormFilters
          states={states}
          typeGraphics={typeGraphics}
          typeDataToShow={typeDataToShow}
          formData={formData}
          startDate={startDate}
          endDate={endDate}
          showDatePicker={showDatePicker}
          setStates={setStates}
          handleChangeInput={handleChangeInput}
          onChangeDateRange={onChangeDateRange}
          setShowDatePicker={setShowDatePicker}
          hasEmptyFields={hasEmptyFields}
          handleFetchData={handleFetchData}
        />
      </div>
      <div className="mx-auto w-full rounded-lg bg-white p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-2 ring-indigo-50"></div>
    </div>
  );
};

export default App;
