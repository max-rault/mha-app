import * as React from 'react';
import { Appbar, Avatar, Button, Surface, Text } from 'react-native-paper';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';


export default function RequestModal(props){
  const { theme, navigation } = props;
  const { params } = props.route
  const { member, request } = params

  return(
    <View style={{flex:1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={()=> navigation.goBack()}
        />
        <Appbar.Content title={params.title}/>
      </Appbar.Header>

      <Grid style={{marginHorizontal: 30}}>
       
        <Row style={{alignItems: 'center'}}>
          <Col style={styles.headerCol}>
            <Text variant='titleSmall'>Type de contrat</Text>
            <Surface elevation={4} style={styles.surface}>
              <Text variant='bodyLarge'>{member.contractType} h</Text>
            </Surface>
          </Col>
          <Col style={styles.headerCol}>
            <Text variant='titleSmall'>heure sup</Text>
            <Surface elevation={4} style={styles.surface}>
              <Text variant='bodyLarge'>14 h</Text>
            </Surface>
          </Col>
          <Col style={styles.headerCol}>
            <Row style={styles.row}>
              <Avatar.Image source={{uri: member.avatar}} size={125}/>
            </Row>
            <Row style={[styles.row, {marginTop: 15}]}>
              <Button 
                mode='contained' 
                icon='message'
                onPress={()=>navigation.navigate('chat', {title: `chat avec ${member.name}`})}
              >
                Contacter
              </Button>
            </Row>
          </Col>
          <Col style={styles.headerCol}>
            <Text variant='titleSmall'>Repos restant</Text>
            <Surface elevation={4} style={styles.surface}>
              <Text variant='bodyLarge'>15 j</Text>
            </Surface>
          </Col>
          <Col style={styles.headerCol}>
            <Text variant='titleSmall'>jours d'arret</Text>
            <Surface elevation={4} style={styles.surface}>
              <Text variant='bodyLarge'>2 j</Text>
            </Surface>
          </Col>
        </Row>       
        <Row style={{paddingHorizontal: 200, marginTop: 50}}>
          <Text>
            {request.contents}
          </Text>
        </Row>
        <Row>
          <Col style={styles.buttonCol}>
            <Button style={[styles.buttonStyle, {alignSelf:'flex-end'}]} mode='contained' icon='account-remove' buttonColor='#da4f49'>Refuser</Button>
          </Col>
          <Col style={styles.buttonCol}>
            <Button style={[styles.buttonStyle, {alignSelf:'flex-start'}]} mode='contained' icon='account-check' buttonColor='#59ed9c'>Accepter</Button>
          </Col>
        </Row>
      </Grid>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    maxWidth: '30%',
    alignSelf: 'center',
    marginHorizontal: 15
  },
  surface: {
    padding: 4,
    height: 80,
    width: 80,
    borderRadius:160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar:{
    flex:1,
  },
  row:{
    alignItems:'center'
  },
  headerCol:{
    alignItems: 'center'
  },
  buttonCol:{
    alignSelf: 'center'
  }
})