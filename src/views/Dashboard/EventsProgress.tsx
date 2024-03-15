interface DonutChartOptions {
  labels: string[];
  colors: string[];
  chart: {
    width: string;
  };
  states: {
    hover: {
      filter: {
        type: string;
      };
    };
  };
  legend: {
    show: boolean;
    horizontalAlign: string;
    fontSize: string;
    labels: {
      colors: string[];
    };
    formatter: (seriesName: string, opts: LegendFormatterOptions) => any[];
    itemMargin: {
      horizontal: number;
      vertical: number;
    };
  };
  dataLabels: {
    enabled: boolean;
  };
  hover: { mode: string | null };
  plotOptions: {
    pie: {
      expandOnClick: boolean;
      donut: {
        labels: {
          show: boolean;
          name: {
            show: boolean;
            color: string;
            offsetY: number;
          };
          value: {
            show: boolean;
            color: string;
            offsetY: number;
          };
          total: {
            show: boolean;
            color: string;
            label: string;
            formatter: (w: LegendFormatterContext) => number;
          };
        };
      };
    };
  };
  fill: {
    colors: string[];
  };
  tooltip: {
    enabled: boolean;
    theme: string;
  };
}

interface LegendFormatterOptions {
  w: LegendFormatterContext;
  seriesIndex: number;
}

interface LegendFormatterContext {
  globals: {
    series: any[];
    seriesTotals: number[];
  };
}
// i don't know why this is whining about interface, please fix ...
export const donutChartOptionsCharts1: DonutChartOptions = {
  colors: [],
  labels: [],
  chart: {
    width: '100%',
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  legend: {
    show: true,
    fontFamily: 'Outfit',
    horizontalAlign: 'center',
    fontSize: '14px',
    labels: {
      colors: ['light-grey'],
    },
    formatter: (seriesName: string, opts: LegendFormatterOptions) => [
      seriesName,
      ' - ',
      opts.w.globals.series[opts.seriesIndex],
    ],
    itemMargin: {
      horizontal: 4,
      vertical: 2,
    },
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        labels: {
          show: true,
          name: {
            show: false,
            color: '#999',
            offsetY: 5,
          },
          value: {
            show: true,
            color: '#999',
            offsetY: 5,
          },
          total: {
            show: true,
            color: '#999',
            label: 'Total',
            formatter: w => w.globals.seriesTotals.reduce((a, b) => a + b, 0),
          },
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    colors: ['#63B3ED', '#4299E1', '#3182CE', '#2B6CB0', '#2C5282', '#2A4365'],
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
  },
};

export const donutChartDataCharts1 = [50, 15, 10, 20, 5];
