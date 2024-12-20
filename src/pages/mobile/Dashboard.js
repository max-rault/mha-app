import * as React from 'react';
import { ScrollView, Dimensions, View } from 'react-native';
import { Text, Card, Icon, Avatar, Surface } from 'react-native-paper';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
// const ContractsPie = React.lazy(()=>import('../../components/charts/mobile/ContractsPie'))
import ContractsPie from '../../components/charts/mobile/ContractsPie';
// import StaffGauge from '../../components/charts/mobile/StaffGauge';
import { useSelector } from 'react-redux';
// import { MaterialCommunityIcons } from '@expo/vector-icons';


//Responsive
import { dashboardStyles } from "../../Styles/components/Dashboard";
import ResponsiveStyle from "../../Styles/responsive/ResponsiveStyle";
import { getDimensionModeOfScreen } from '../../Styles/responsive/Helpers';

export default function MobileDashboard(props){
  const {theme} = props
  const window = Dimensions.get('window')
  const windowHeight = Dimensions.get('window').height
  const screenMode = getDimensionModeOfScreen(window)
  const styles = ResponsiveStyle(dashboardStyles, screenMode);
  const [fill, setFill] = React.useState(100)

  const { contractStats } = useSelector(state => state.stats);
  
  
  return (
    <View style={styles.container}>
      <Grid style={{minHeight: windowHeight}}>
        <Row size={55}>
          <Col>
            <ContractsPie theme={theme} contractData={contractStats}/>
          </Col>
        </Row>
        <Row size={45} style={{alignItems: 'center'}}>
          <Col size={15} style={{marginLeft: 20, marginBottom: 20}}>
            <Surface style={styles.surface}>
              <Icon source='chef-hat' size={32}/>
              <Text>15/60</Text>
            </Surface>
            <Surface style={styles.surface}>
              <Icon color={theme.dark === true ? '#FFF':'#000'}  source={require('../../../assets/icons8-waiter-96.png')} size={32}/>
              <Text>15/60</Text>
            </Surface>
            <Surface style={styles.surface}>
              <Icon color={theme.dark === true ? '#FFF':'#000'}  source={require('../../../assets/icons8-janitor-50.png')} size={32}/>
              <Text>15/60</Text>
            </Surface>
            <Surface style={styles.surface}>
              <Icon source='human-wheelchair' size={32}/>
              <Text>15/60</Text>
            </Surface>
          </Col>
          <Col size={85}>
            <AnimatedCircularProgress
              size={80}
              width={3}
              fill={fill}
              tintColor="#00e0ff"
              backgroundColor="#3d5875">
              {
                (fill)=>(
                  <Surface style={styles.surface}>
                    <Icon source='human-wheelchair' size={32}/>
                    <Text>{fill} %</Text>
                  </Surface>
                )
              }
            </AnimatedCircularProgress>
          </Col>
        </Row>
      </Grid>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   page: {
//     justifyContent: 'center',
//   },
// });