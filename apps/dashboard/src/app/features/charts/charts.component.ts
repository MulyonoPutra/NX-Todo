import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'todo-charts',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './charts.component.html',
	styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit {
	public chart: unknown;

	ngOnInit(): void {
		this.createChart();
	}

	createChart() {
		this.chart = new Chart('MyChart', {
			type: 'bar',

			data: {
				labels: [
					'2022-05-10',
					'2022-05-11',
					'2022-05-12',
					'2022-05-13',
					'2022-05-14',
					'2022-05-15',
					'2022-05-16',
					'2022-05-17',
				],
				datasets: [
					{
						label: 'Pending',
						data: ['467', '576', '572', '79', '92', '574', '573', '576'],
						backgroundColor: 'blue',
					},
					{
						label: 'Completed',
						data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
						backgroundColor: 'limegreen',
					},
				],
			},
			options: {
				aspectRatio: 2.5,
			},
		});
	}
}
