import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';

echarts.use([SVGRenderer, GridComponent,  BarChart, TooltipComponent, LegendComponent]);

export default function TurnOver(props) {
  const {theme, turnOverData, width, height} = props;
  const skiaRef = useRef(null);
  const chartRef = useRef(null);
  
  useEffect(() => {
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Entrées', 'Sorties'],
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
          }
        }
      ],
      series: [
        {
          name: 'Entrées',
          type: 'bar',
          data: turnOverData.join,
        },
        {
          name: 'Sorties',
          type: 'bar',
          data: turnOverData.leave,
        }
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
  }, [theme, turnOverData]);

  //  watching for size changes, redraw the chart.
  useEffect(() => {
    chartRef?.current.resize({
      width: width,
      height: height,
    });
  }, [])
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