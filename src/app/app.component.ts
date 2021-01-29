import { AfterContentInit, AfterViewInit, Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Truck } from 'src/models/Trucks';
import { TruckService } from 'src/services/truck.service';

declare var google: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
	title = 'nexogen';
	timelineWidth = window.innerWidth * 0.9;

	truckName: string = '';

	trucks: Array<Truck> = new Array<Truck>();
	rows = 0;
	loading = false;

	chart: any;
	dataTable: any;

	constructor(private truckService: TruckService, private activatedRoute: ActivatedRoute, private router: Router) {
		this.truckService.getTrucks().subscribe(trucks => {
			this.trucks = trucks;
		});
	}

	ngAfterViewInit() {
		google.charts.load('current', { 'packages': ['timeline'] });
		google.charts.setOnLoadCallback(() => this.drawChart());
	}

	drawChart() {
		let container = document.getElementById('timeline');
		this.chart = new google.visualization.Timeline(container);
		this.activatedRoute.queryParams.subscribe(params => {
			let truckName = params['truck'];
			if (truckName) {
				this.truckName = truckName;
			}
			this.drawOrders();
		});
	}

	drawOrders(truckName: string = this.truckName) {
		console.log('drawOrders', this.trucks.length, google.visualization);

		if (this.trucks.length == 0 || google.visualization == undefined)
			return;
			
		this.dataTable = new google.visualization.DataTable();
		truckName = truckName.trim();
		let maxDate = this.trucks[0].orders[0].to;

		this.dataTable.addColumn({ type: 'string', id: 'Truck' });
		this.dataTable.addColumn({ type: 'string', id: 'Order' });
		this.dataTable.addColumn({ type: 'date', id: 'Start' });
		this.dataTable.addColumn({ type: 'date', id: 'End' });

		this.rows = 0;
		this.loading = true;
		for (let truck of this.trucks) {
			if (truckName.length > 0 && !truck.name.toLowerCase().includes(truckName.toLowerCase()))
				continue;
			if (truck.orders.length > 0)
				this.rows += 1;
			for (let order of truck.orders) {
				if (order.to > maxDate)
					maxDate = order.to;
				this.dataTable.addRows([
					[truck.name, `(${order.index})`, order.from, order.to]
				]);
			}

		}


		this.dataTable.insertColumn(2, { type: 'string', role: 'tooltip', p: { html: true } });



		for (let i = 0; i < this.dataTable.getNumberOfRows(); i++) {

		 let start = new Date(this.dataTable.getValue(i, 3));
		 let end = new Date(this.dataTable.getValue(i, 4));

			let tooltip = '<div class="ggl-tooltip"><span>' +
				this.dataTable.getValue(i, 1) + '</span></div><div class="ggl-tooltip"><span><b>' +
				this.dataTable.getValue(i, 0) + '</span></b>:<br> ' +
				start.toLocaleString() + ' - <br>' +
				end.toLocaleString()
				+ '<br><b>Duration: ' + this.dateDiff(start,end).toFixed(1) + ' h</b>'
				+ '</div>';

			this.dataTable.setValue(i, 2, tooltip);
		}

		let _maxDate = new Date(maxDate);
		_maxDate.setDate(_maxDate.getDate() + 1);

		let chartHeight = (this.rows * 0.2) * window.innerHeight;
		let chartWidth = window.innerWidth * 0.9;

		if (chartHeight > window.innerHeight * 0.75) {
			chartHeight = window.innerHeight * 0.75;
		}

		if (chartHeight == 0) {
			chartHeight = 1;
			chartWidth = 100;
		}

		this.timelineWidth = chartWidth;

		let options = {
			timeline: { colorByRowLabel: true },
			tooltip: {
				isHtml: true
			},
			hAxis: {
				maxValue: _maxDate
			},
			height: chartHeight,
			width: chartWidth
		};
		this.chart.draw(this.dataTable, options);

		//for visual only
		setTimeout(() => {
			this.loading = false;
		},
			2000);
	}

	copy(inputDom: any) {
		let url = window.location.host + '/?truck=' + this.truckName;
		let original = this.truckName;
		inputDom.value = url;
		inputDom.select();
		document.execCommand('copy');
		inputDom.setSelectionRange(0, 0);
		inputDom.value = original;
		alert('Copied!');
		this.router.navigate([''], { queryParams: { truck: original } });
	}

	dateDiff(date1: Date, date2: Date) {
		console.log(date1);
		console.log('---');
		console.log(date2);
		return Math.abs(date1.getTime() - date2.getTime()) / 36e5;
	}
}
