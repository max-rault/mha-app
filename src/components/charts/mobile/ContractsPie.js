import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { Card } from 'react-native-paper';
import {LegendComponent} from "echarts/components";
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';

echarts.use([
  SVGRenderer, 
  PieChart, 
  LegendComponent
]);

export default function ContractsPie(props) { // Get the width and height of the container

  const skiaRef = useRef(null);
  const {theme, contractData} = props;
  
  const chartRef = useRef(null);

  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {
    Dimensions.addEventListener("change", handleDimensionsChange);
    // return () => {
    //   Dimensions.("change", handleDimensionsChange);
    // };
  }, []);
  
  useEffect(() => {
    const option = {
      legend:{
        orient: 'vertical',
        left: 'right',
        top: '10%',
        selectedMode:false,
        textStyle:{
          color: theme.colors.onSurface
        },
        icon: 'circle',
        itemWidth: 50,
      },
      series: [
        {
          name: 'Type de contrat',
          type: 'pie',
          selectedMode:false,
          radius: ['30%', '50%'],
          center: ['35%', '35%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold',
              formatter(param) {
                return param.name + ' (' + param.percent + '%)';
              },
              color: theme.colors.onSurface
            }
          },
          labelLine: {
            show: false
          },
          data:contractData
        },
        
      ]
    };
    let chart
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: chartWidth,
        height: chartHeight,
      });
      chart.setOption(option);
      chartRef.current = chart;
    }
    return () => chart?.dispose();
  }, [theme, contractData]);

  // watching for size changes, redraw the chart.
  useEffect(() => {
    chartRef?.current.resize({
      width: chartWidth,
      height: chartHeight,
    });
  }, [chartHeight, chartWidth])

   // Get the width and height of the container
  const handleLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setChartWidth(width);
    setChartHeight(height);
  };

  // Screen orientation change event
  const handleDimensionsChange = (e) => {
    const { width, height } = e.screen;
    setChartWidth(width);
    setChartHeight(height);
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Card>
        <Card.Title title="Répartition des contrats"/>
        <Card.Content>
          <SvgChart ref={skiaRef}/>
        </Card.Content>
      </Card>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: (Dimensions.get('window').height/100)*5
    // paddingBottom:50
  },
});