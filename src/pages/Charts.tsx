import { Grid } from '@mui/material';
import * as Highcharts from 'highcharts';
import { useEffect } from 'react';
import { queryBuch } from '../api/graphql';
import { Buch, BuchQueryField } from '../api/interfaces';

function Charts() {
  useEffect(() => {
    queryBuch([BuchQueryField.art, BuchQueryField.schlagwoerter])
      .then((result: any) => {
        if (result.data.data && !result.data.errors) {
          const seriesPieData = preparePieSeriesData(result.data.data.buecher);
          const seriesBarData = prepareBarSeriesData(result.data.data.buecher);

          Highcharts.chart('pieChart', {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
            },
            title: {
              text: 'Häufigkeit der verfügbaren Bucharten',
              align: 'center',
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            },
            accessibility: {
              point: {
                valueSuffix: '%',
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: false,
                },
                showInLegend: true,
              },
            },
            series: [
              {
                name: 'Art',
                colorByPoint: true,
                data: seriesPieData,
              },
            ],
          });
          Highcharts.chart('barChart', {
            chart: {
              type: 'column',
            },
            title: {
              text: 'Verwendung der Schlagwörter',
            },
            xAxis: {
              categories: seriesBarData[0],
              crosshair: true,
            },
            yAxis: {
              min: 0,
              title: {
                text: 'Anzahl',
              },
            },
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0,
              },
            },
            series: [
              {
                name: 'Schlagwörter',
                data: seriesBarData[1],
              },
            ],
          });
        }
      })
      .catch((err) => {
        //TODO Display ERROR
      });
  }, []);

  return (
    <>
      <h2>Diagramme</h2>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item md={8} lg={6}>
          <div
            id="pieChart"
            style={{ width: '500px', height: '500px', margin: '0 auto' }}
          ></div>
        </Grid>
        <Grid item md={8} lg={6}>
          <div
            id="barChart"
            style={{ width: '500px', height: '500px', margin: '0 auto' }}
          ></div>
        </Grid>
      </Grid>
    </>
  );
}

function preparePieSeriesData(buecher: [Buch]) {
  const result: any = [];

  for (const buch of buecher) {
    const index = result.findIndex((element: any) => element.name === buch.art);
    if (index > -1) {
      result[index].y++;
    } else {
      result.push({ name: buch.art, y: 1 });
    }
  }

  return result;
}
function prepareBarSeriesData(buecher: [Buch]) {
  const result: any = [[], []];

  for (const buch of buecher) {
    if (buch.schlagwoerter && buch.schlagwoerter.length > 0) {
      for (const schlagwort of buch.schlagwoerter) {
        if (schlagwort === 'null') continue;

        const index = result[0].findIndex(
          (element: string) => element === schlagwort,
        );

        if (index > -1) {
          result[1][index]++;
        } else {
          result[0].push(schlagwort);
          result[1][result[0].length - 1] = 1;
        }
      }
    }
  }

  return result;
}

export default Charts;
