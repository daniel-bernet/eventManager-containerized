// category-distribution.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {
  ChartComponent,
  CategoryService,
  ColumnSeriesService,
  LegendService,
  TooltipService,
  DataLabelService,
  ChartModule,
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-category-distribution',
  standalone: true,
  imports: [ChartModule],
  providers: [
    ChartComponent,
    CategoryService,
    ColumnSeriesService,
    LegendService,
    TooltipService,
    DataLabelService,
  ],
  templateUrl: './category-distribution.component.html',
  styleUrls: ['./category-distribution.component.scss'],
})
export class CategoryDistributionComponent implements OnInit {
  public categoryData?: Object[];
  public primaryXAxis?: Object;
  public title: string = 'Category Distribution';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllEvents().subscribe((events) => {
      this.categoryData = this.processData(events);
      this.primaryXAxis = { valueType: 'Category' };
    });
  }

  processData(events: any[]): Object[] {
    let data = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(data).map((key) => ({
      category: key,
      count: data[key],
    }));
  }
}
