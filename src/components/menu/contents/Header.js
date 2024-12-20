import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Col, Grid, Row } from "react-native-easy-grid";
import { Appbar, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../store/actions/Staff';
import Profile from '../subMenu/Profile';
import Nottifications from '../subMenu/Nottifications';
import moment from 'moment';
import frLocale from "moment/locale/fr";

//for test
// moment.locale('fr',[frLocale])
var createdDate = moment(moment([2024, 2, 15])).fromNow()
const data = [
  {
    title:'Nouvelle demande de corin davis',
    subTitle: 'Demande de congés payés',
    avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Cuddles',
    date: createdDate
  },
  {
    title:'Nouvelle demande de ines sire',
    subTitle: 'Demande de congés payés',
    avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Salem',
    date: createdDate
  },
  {
    title:'Nouvelle demande de ines sire',
    subTitle: 'Demande de congés payés',
    avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Salem',
    date: createdDate
  },
  {
    title:'Nouvelle demande de ines sire',
    subTitle: 'Demande de congés payés',
    avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Salem',
    date: createdDate
  }
]

export default function Header(props) {
  const {navigation, options, setUsedTheme, theme, context} = props
  const { openRightDrawer } = React.useContext(context);
  const title = options.drawerLabel
  const { user } = useSelector(state => state.staff);
  const dispatch = useDispatch()


  React.useEffect(()=>{
    AsyncStorage.getItem('user_id')
    .then((value)=>{
      getUser(value, dispatch)
    })
  },[])

  return (
    <Appbar.Header style={{height:48}} elevated>
      <IconButton icon="menu" onPress={() =>navigation.openDrawer()}/>
    <Appbar.Content
      title={title}
    />
    <Grid style={{alignSelf:'stretch', alignItems:'center'}}>
      { Platform.OS === 'web' ?
        <Col size={40}>
          <Row style={{alignSelf:'flex-end'}}>
            <Nottifications  user={user} navigation={navigation} theme={theme} notifs={data}/>
          </Row>
        </Col>:null
      }
      <Col size={40} style={{alignItems:'center'}}>
        <Profile user={user} navigation={navigation} theme={theme} setUsedTheme={setUsedTheme}/>
      </Col>
      <Col size={20}>
        <IconButton 
          icon="wechat"
          style={{marginRight:5}}
          onPress={()=>openRightDrawer()}
        />
      </Col>
    </Grid>
    </Appbar.Header> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    margin: 16,
  },
  button: {
    opacity: 0.6,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  label: {
    flex: 1,
  },
});
