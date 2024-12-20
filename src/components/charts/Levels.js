import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { 
  GridComponent, 
  TooltipComponent, 
  LegendComponent,  
  TitleComponent,
  ToolboxComponent 
} from "echarts/components";
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';

echarts.use([
  SVGRenderer, 
  GridComponent, 
  TooltipComponent, 
  LegendComponent, 
  BarChart,
  TitleComponent,
  ToolboxComponent 
]);

export default function Levels(props) {
  const {theme, levelsData, width, height} = props;
  const skiaRef = useRef(null);
  const chartRef = useRef(null);

  
  useEffect(() => {
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Cuisine', 'Comptoir', 'Nettoyage'],
        textStyle:{
          color:theme.colors.onSurface,
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisLabel:{
            color:theme.colors.onSurface, 
          },
          // prettier-ignore
          data: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel:{
            color:theme.colors.onSurface, 
            formater: '{value} %'
          }
        }
      ],
      series: [
        {
          name: 'Cuisine',
          type: 'bar',
          data: levelsData.kitchen,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' %';
            }
          },
        },
        {
          name: 'Comptoir',
          type: 'bar',
          data: levelsData.counter,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' %';
            }
          },
        },
        {
          name: 'Nettoyage',
          type: 'bar',
          data: levelsData.cleaning,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' %';
            }
          },
        },
      ]
    };
    let chart
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: width,
        height: height,
      });
      chart.setOption(option);
      chartRef.current = chart;
    }
    // return () => chart?.dispose();
  }, [theme, levelsData]);

    // watching for size changes, redraw the chart.
    useEffect(() => {
      chartRef?.current.resize({
        width: width,
        height: height,
      });
    }, []);
  
  return (
    <View style={styles.container}>
      <SvgChart ref={skiaRef}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});