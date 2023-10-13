import Chart from "chart.js/auto";
import { useEffect } from "react";

let myChart;

const ChartGraphic = (props) => {
  let ctx;

  useEffect(() => {
    handleChart(props);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleChart = async (data) => {
    const { type, labels, values, title } = data;
    ctx = document.querySelector("#chart-1");
    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
      type: type,
      options: {
        responsive: true,
      },
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: values,
          },
        ],
      },
    });
  };

  return (
    <div
      className="min-h-[15rem] h-full w-full flex justify-center max-h-[60vh]"
      style={{ maxHeight: "51vh", minHeight: "40vh"}}
    >
      <canvas id="chart-1" width={"100%"} height={"100%"}></canvas>
    </div>
  );
};

export default ChartGraphic;
