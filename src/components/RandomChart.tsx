import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	interaction: {
		mode: "index" as const,
		intersect: false,
	},
	plugins: {
		legend: {
			position: "top" as const,
			align: "end" as const,
			labels: {
				usePointStyle: true,
			},
		},
		title: {
			display: false,
			text: "Chart.js Line Chart",
		},
	},
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
	labels,
	datasets: [
		{
			label: "Qualified",
			data: labels.map(() =>
				faker.datatype.number({ min: 450, max: 740 })
			),
			borderColor: "rgb(251, 227, 142)",
			backgroundColor: "rgba(251, 227, 142,0.5)",
			pointStyle: "circle",
			pointRadius: 8,
			pointHoverRadius: 10,
		},
		{
			label: "Disqualified",
			data: labels.map(() =>
				faker.datatype.number({ min: 450, max: 740 })
			),
			borderColor: "rgb(177,165,255)",
			backgroundColor: "rgba(177,165,255,0.5)",
			pointStyle: "circle",
			pointRadius: 8,
			pointHoverRadius: 10,
		},
	],
};

export function RandomChart() {
	return (
		<div
			className="chart-container"
			style={{ position: "relative", minHeight: "15rem", width: "100%" }}
		>
			<Line options={options} data={data} />
		</div>
	);
}
