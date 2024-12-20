import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
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
  PieChart,
  TitleComponent,
  ToolboxComponent 
]);

export default function DistributionPosition(props) { // Get the width and height of the container

  const skiaRef = useRef(null);
  const {theme, contractData, width, height} = props;

  const chartRef = useRef(null);
  
  useEffect(() => {
    const option = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Répartion des roles',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '70%'],
          // adjust the start angle
          startAngle: 180,
          endAngle: 360,
          label: {
            show: true,
            color: theme.colors.onSurface,
            formatter(param) {
              return param.name + ' (' + param.percent + '%)';
            }
          },
          data: contractData
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
  }, [theme, contractData]);

  // watching for size changes, redraw the chart.
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
    // paddingBottom:50
  },
});