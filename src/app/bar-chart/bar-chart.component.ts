import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Frequency} from '../shared/statistics'

@Component({
    selector: 'app-bar-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

    title = 'Orders Statistics:';

    private width: number;
    private height: number;
    private margin = {top: 20, right: 20, bottom: 30, left: 40};

    private x: any;
    private y: any;
    private svg: any;
    private g: any;
    private statistics: Frequency[] = [];

    constructor(private http: HttpClient) {
        this.loadStatsFromDB();
    }

    ngOnInit() {
        
    }

    private loadStatsFromDB()
    {
        const req = this.http.post('http://localhost:3000/stats', {}).subscribe(
            (res : Frequency[]) => {this.statistics = res
            this.initSvg();
            this.initAxis();
            this.drawAxis();
            this.drawBars();
            },
            err => {
            console.log("Error occured");
            }
        );
    }

    private initSvg() {
        this.svg = d3.select('svg');
        this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
        this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
        this.g = this.svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private initAxis() {
        this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
        this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
        console.log(this.statistics.forEach(element => {
            console.log(element)
        }))
        this.x.domain(this.statistics.map((d) => d._id));
        this.y.domain([0, d3Array.max(this.statistics, (d) => d.count)]);
    }

    private drawAxis() {
        this.g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));
        this.g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y).ticks(10, '%'))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Frequency');
    }

    private drawBars() {
        this.g.selectAll('.bar')
            .data(this.statistics)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => this.x(d._id) )
            .attr('y', (d) => this.y(d.count) )
            .attr('width', this.x.bandwidth())
            .attr('height', (d) => this.height - this.y(d.count) );
    }

}
