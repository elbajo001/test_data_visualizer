import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import data from './dataset.json';
import FormFilters from "./components/FormFilters.jsx";
import ChartGraphic from "./components/ChartGraphic";

const App = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [states, setStates] = useState({
    fetchingData: false,
    showFilters: true
  });
  const [formData, setFormData] = useState({
    typeGraphic: "",
    typeData: "",
    data: [],
    start: null,
    end: null,
  });

  const typeGraphics = [
    { value: "bar", label: "Gráfico de barras" },
    { value: "line", label: "Gráfico de líneas" },
    { value: "pie", label: "Gráfico de torta" },
  ];

  const typeDataToShow = [
    { value: "ventas_por_region", label: "Datos de ventas por región" },
    { value: "usuarios_registrados_por_mes", label: "Datos de usuarios registrados por mes" },
    {
      value: "tiempo_de_carga_de_la_pagina_por_dispositivo",
      label: "Datos de tiempo de carga de la página por dispositivo",
    },
    { value: "satisfaccion_del_cliente_por_canal", label: "Datos de satisfacción del cliente por canal" },
    { value: "rendimiento_de_las_campañas_de_marketing", label: "Datos de rendimiento de las campañas de marketing" },
  ];

  /**
   * @INFO Método para capturar los campos del formulario
   * @param {*} type hace refencia identificador del input
   * @param {*} value valor del input
   */
  const handleChangeInput = (type, value) => {
    setFormData({
      ...formData,
      data: [],
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
      data: [],
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
    setFormData({ ...formData, data: [] })
    setTimeout(() => {
      setFormData({ ...formData, data: data[`${formData?.typeData}`] })
      setStates({ ...states, fetchingData: false, showFilters: true });
    }, 1000);
  };

  return (
    <div className="container-app md:container md:mx-auto max-h-screen p-2 md:p-4">
      <div className="mx-auto mb-1 lg:mb-2 w-full rounded-lg bg-white p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-2 ring-indigo-50">
        <h1 className="my-0 text-xl uppercase font-extrabold">
          Datos estadísticos
        </h1>
      </div>
      <div className="mx-auto mb-1 lg:mb-2 w-full rounded-lg bg-white p-4 leading-5 shadow-xl shadow-black/5 ring-2 ring-indigo-50">
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
      {formData?.data !== undefined && formData?.data?.length ?
        <div className="mx-auto w-full rounded-lg max-h-full bg-white p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 ring-2 ring-indigo-50">
          <ChartGraphic
            type={formData?.typeGraphic}
            labels={formData?.data?.map(d => (d?.name))}
            values={formData?.data?.map(d => d?.value)}
            title={`${typeDataToShow?.find(t => t?.value === formData?.typeData)?.label?.toString()?.slice(0, 25)}...`}
          />
        </div>
      :
        states?.fetchingData ?
        <div className="w-full h-full flex justify-center items-center py-60">
          <div className='spinner'></div>
        </div>
        : !formData?.data ? 
          <p className="text-center my-48 text-xl">Oops! No hay datos para mostrar.</p>
          : null
      }
    </div>
  );
};

export default App;
