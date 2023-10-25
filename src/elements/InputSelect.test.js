import { render, screen, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputSelect from "./InputSelect";

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

describe("<InputSelect />", () => {
  test("should show input select", () => {
    let value = null
    render(
      <InputSelect
        id={"type_graphic"}
        label={"Tipo de gráfica"}
        required
        placeholder={"Seleccione tipo de gráfica"}
        options={typeDataToShow}
        value={value}
        onChange={() => {}}
      />
    );
    const label = screen.getByText(/Seleccione tipo de gráfica/i);
    render(
      <InputSelect
        id={"type_graphic"}
        label={"Datos a mostrar"}
        required
        placeholder={"Seleccione tipo de datos"}
        options={typeDataToShow}
        value={value}
        onChange={() => {}}
      />
    );
    const label1 = screen.getByText(/Seleccione tipo de datos/i);
    
    expect(label).toBeInTheDocument()
    expect(label1).toBeInTheDocument()
  });
});
