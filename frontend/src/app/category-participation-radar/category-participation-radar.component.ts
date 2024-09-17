// category-participation-radar.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {
  ChartComponent,
  RadarSeriesService,
  CategoryService,
  LegendService,
  TooltipService,
  ChartModule,
  LineSeries,
  RadarSeries,
  ChartAllModule,
  ExportService,
  LineSeriesService,
  AreaSeriesService,
  ColumnSeriesService,
  StackingColumnSeriesService,
  StackingAreaSeriesService,
  RangeColumnSeriesService,
  ScatterSeriesService,
  PolarSeriesService,
  SplineSeriesService,
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-category-participation-radar',
  standalone: true,
  imports: [ChartModule, ChartAllModule],
  providers: [
    RadarSeriesService,
    CategoryService,
    LegendService,
    TooltipService,
    ChartComponent,
    LineSeries,
    RadarSeries,
    AreaSeriesService,
    LineSeriesService,
    ExportService,
    ColumnSeriesService,
    StackingColumnSeriesService,
    StackingAreaSeriesService,
    RangeColumnSeriesService,
    ScatterSeriesService,
    PolarSeriesService,
    SplineSeriesService,
  ],
  templateUrl: './category-participation-radar.component.html',
  styleUrls: ['./category-participation-radar.component.scss'],
})
export class CategoryParticipationRadarComponent implements OnInit {
  public categoryData: Object[] = [];
  public primaryXAxis: Object = {};
  public title: string = 'Category Participation';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllEvents().subscribe(
      (events) => {
        if (events && events.length > 0) {
          this.categoryData = this.processData(events);
          this.primaryXAxis = { valueType: 'Category' };
        }
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  processData(events: any[]): Object[] {
    let data = events.reduce((acc, event) => {
      const attendeeCount = event.attendees.filter((attendee: string) => attendee !== 'None').length;
      acc[event.category] = (acc[event.category] || 0) + attendeeCount;
      return acc;
    }, {});

    return Object.keys(data).map(key => ({
      category: key,
      count: data[key]
    }));
  }
}
