export class BaseEchartsOptions {
  legend: {
    show: boolean;
    left: string;
    orient: string;
  }
  grid: {
    show: boolean;
    left: string | number;
    top: string | number;
    right: string | number;
    bottom: string | number;
    containerLabel: boolean;
  }
}
export class PieChartOptions extends BaseEchartsOptions {

}