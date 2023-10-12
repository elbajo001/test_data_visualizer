import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import InputSelect from "../elements/InputSelect";

const FormFilters = (props) => {
  /**
   * @INFO Input custom para las fechas
   */
  const CustomDatePicker = forwardRef((params, ref) => {
    return (
      <div
        className="date-picker-custom w-full d-flex justify-between"
        onClick={params?.onClick}
        ref={ref}
        style={{ height: "38px" }}
      >
        <div className="text-date d-flex justify-between pr-2">
          <p className="my-0 w-full">
            {props?.startDate || props?.endDate
              ? `${
                  props?.startDate ? new Date(props?.startDate).toLocaleDateString() : ""
                } a ${props?.endDate ? new Date(props?.endDate).toLocaleDateString() : ""}`
              : `Selecciona las fechas`}
            {/* {startDate || endDate ? (
              <i
                className="bi bi-x-square"
                onClick={() => {
                  setStartDate(null)
                  setEndDate(null)
                }}
              ></i>
            ) : (
              ``
            )} */}
          </p>
        </div>
        <div className="icon-date">
          <i
            className="bi bi-calendar-event"
            style={{ width: "22px", height: "20px" }}
          ></i>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between align-middle">
        <p className="my-0 font-semibold text-lg">Filtros</p>
        <i
          className="bi bi-caret-down-fill flex justify-center items-center cursor-pointer"
          style={{
            fontSize: "1.225rem",
            transform: `${
              props?.states?.showFilters ? "rotateZ(180deg)" : "rotateZ(0deg)"
            }`,
          }}
          onClick={() =>
            props?.setStates({ ...props?.states, showFilters: !props?.states?.showFilters })
          }
        ></i>
      </div>
      {props?.states?.showFilters ? (
        <>
          <div className="container-app_container-form grid md:gap-x-4 mt-2 lg:gap-x-6 xl:gap-x-12 gap-x-0 grid-cols-1 md:grid-cols-3">
            <InputSelect
              id={"type_graphic"}
              label={"Tipo de gráfica"}
              required
              placeholder={"Seleccione tipo de gráfica"}
              options={props?.typeGraphics}
              className={"mb-3"}
              value={props?.typeGraphics?.find(
                (o) => o?.value === props?.formData?.typeGraphic
              )}
              onChange={(e) => props?.handleChangeInput("typeGraphic", e)}
            />
            <InputSelect
              id={"type_data"}
              required
              label={"Datos a mostrar"}
              placeholder={"Seleccione tipo de datos"}
              options={props?.typeDataToShow}
              className={"mb-3"}
              value={props?.typeDataToShow?.find(
                (o) => o?.value === props?.formData?.typeData
              )}
              onChange={(e) => props?.handleChangeInput("typeData", e)}
            />
            <div className="flex flex-col">
              <label className="my-0 text-sm">
                Seleccione un rango de fechas
              </label>
              <DatePicker
                onChange={(e) => props?.onChangeDateRange(e)}
                startDate={props?.startDate}
                endDate={props?.endDate}
                selectsRange
                customInput={<CustomDatePicker />}
                dateFormat="MM/yyyy"
                showMonthDropdown
                showYearDropdown
                open={props?.showDatePicker}
                onClickOutside={() => props?.setShowDatePicker(false)}
                onInputClick={() => props?.setShowDatePicker(true)}
                maxDate={new Date()}
              />
            </div>
          </div>
          <button
            type="button"
            disabled={props?.hasEmptyFields(props?.formData, props?.states?.fetchingData)}
            className={`
              ${
                props?.hasEmptyFields(props?.formData, props?.states?.fetchingData)
                  ? "cursor-not-allowed"
                  : "pointer"
              } 
              ${
                props?.hasEmptyFields(props?.formData, props?.states?.fetchingData)
                  ? "opacity-50"
                  : "hover:bg-teal-400 hover:shadow-md"
              } 
              btn ms-auto mt-3 md:mt-0 flex justify-end py-2 px-6 bg-teal-500  text-white rounded-md font-semibold tracking-wide shadow-black
            `}
            onClick={() => {
              if (!props?.states?.fetchingData) props?.handleFetchData();
            }}
          >
            {!props?.states?.fetchingData ? "Generar gráfica" : "Generando..."}
          </button>
        </>
      ) : null}
    </div>
  );
};

export default FormFilters;
