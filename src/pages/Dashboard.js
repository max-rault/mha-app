import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet, View  } from 'react-native';
import { Surface, Text, Card } from 'react-native-paper';
import { Row, Col, Grid } from "react-native-easy-grid";
const Levels = React.lazy(()=>import('../components/charts/Levels'))
const DistributionPosition = React.lazy(()=>import('../components/charts/DistributionPosition'))
const TurnOver = React.lazy(()=>import('../components/charts/TurnOver'))
import { useSelector } from 'react-redux';

//Style
// import { ResponsiveContext } from "../Styles/responsive/Context";
import { getDimensionModeOfScreen } from '../Styles/responsive/Helpers';
import ResponsiveStyle from "../Styles/responsive/ResponsiveStyle";
import { dashboardStyles } from "../Styles/components/Dashboard";


export default function DashBoard(props){
  console.log('im in dashboard web !!!!!')
  const {theme} = props
  const window = Dimensions.get('window')
  const { contractStats, turnOverStats, levelStats } = useSelector(state => state.stats);
  
  //Charts size
  const [chartWidth, setWidth] = React.useState(0)
  const [smallHeight, setSmallHeight] = React.useState(0)
  const [smallWidth, setSmallWidth] = React.useState(0)
  const [chartHeight, setHeight] = React.useState(0)

  //Responsive
  // const currentViewMode = React.useContext(screenMode);
  const screenMode = getDimensionModeOfScreen(window)
  const styles = ResponsiveStyle(dashboardStyles, screenMode);

  const handleSmallLayout = React.useCallback((event)=>{
    const {x, y, height, width} = event.nativeEvent.layout;
    setSmallWidth(width)
    setSmallHeight(height)
  }, [])

  const handleLayout = React.useCallback((event)=>{
    const {x, y, height, width} = event.nativeEvent.layout;
    console.log(event.nativeEvent.layout)
    setWidth(width)
    setHeight(height)
  }, [])
  
  return (
   <ScrollView>
    <Grid style={{marginHorizontal:20, minHeight: 1200}}>
      <Row size={15} style={{alignContent:'center', alignItems:'center'}}>
        <Col style={styles.col}>
          <Text variant='titleSmall'>Total employé.es</Text>
          <Surface elevation={4} style={styles.surface}>
              <Text variant='bodyLarge'>
                60
              </Text>
          </Surface>
        </Col>
        <Col  style={styles.col}>
        <Text variant='titleSmall'>Age Moyen</Text>
          <Surface elevation={4} style={styles.surface}>
            <Text variant='bodyLarge'>
              27
            </Text>
          </Surface>
        </Col>
        <Col  style={styles.col}>
        <Text variant='titleSmall'>Score Enps</Text>
        <Surface elevation={3} style={styles.surface}>
          <Text variant='bodyLarge'>
            62.5
          </Text>
        </Surface>
        </Col>
      </Row>
      <Row  style={styles.module}>
        <View style={{flex: 1}}>
          <Card onLayout={handleSmallLayout} style={{margin:(window.height/100)*5, minHeight:(window.height/100)*42.5}}>
            <Card.Title title="Niveaux moyen des équipiers en 2023"/>
            <Card.Content>
              <React.Suspense fallback={<Text>Loading</Text>}>
                <Levels theme={theme} levelsData={levelStats} height={smallHeight} width={smallWidth}/>
              </React.Suspense>
            </Card.Content>
          </Card>
        </View>
        <View style={{flex: 1}}>
          <Card onLayout={handleSmallLayout} style={{margin: (window.height/100)*5, minHeight:(window.height/100)*42.5}}>
            <Card.Title title='Répartition des Contrats'/>
            <Card.Content>
              <React.Suspense fallback={<Text>Loading</Text>}>
                <DistributionPosition theme={theme} contractData={contractStats} height={smallHeight} width={smallWidth}/>
              </React.Suspense>
              
            </Card.Content>
          </Card>
        </View>
      </Row>
      
      <Row size={42.5} >
       <Col>
        <Card onLayout={handleLayout} style={{margin: (window.height/100)*5, minHeight:(window.height/100)*42.5}}>
          <Card.Title title="Turn over de l'année 2023"/>
          <Card.Content>
            <React.Suspense fallback={<Text>Loading</Text>}>
              <TurnOver theme={theme} turnOverData={turnOverStats} height={chartHeight} width={chartWidth}/>
            </React.Suspense>
                      
          </Card.Content>
        </Card>
       </Col>
      </Row>
    </Grid>
   </ScrollView>
  );
}