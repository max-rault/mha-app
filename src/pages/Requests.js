import * as React from 'react';
import { DataTable, Chip, Text, RadioButton, List } from 'react-native-paper';
import { ScrollView, View, StyleSheet, Pressable, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { fetchRequests } from '../store/actions/Requests';
import FlatRequests from '../components/Tables/FlatRequests';
import { DatePickerModal, fr, registerTranslation } from 'react-native-paper-dates';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
 } from "react-native-popup-menu";
 import moment from 'moment';
// import { Dropdown } from 'react-native-element-dropdown';
// import NoData from '../components/NoData';

registerTranslation('fr', fr)
export default function Requests(props){
  const { theme, navigation } = props;
  const { requests } = useSelector(state => state.requests);
  // const [value, setValue] = React.useState(null);

  const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('being processed');

   const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
      ({ startDate, endDate }) => {
        setOpen(false);
        setRange({ startDate, endDate });
        const data = {
          startPeriod: moment(startDate).format('YYYY-MM-DD'),
          endPeriod: moment(endDate).format('YYYY-MM-DD'),
          status: value
        }
        fetchRequests(dispatch, data)
      },
      [setOpen, setRange]
    );

  const dispatch = useDispatch()
  
  return (
    <View style={{flex: 1}}>
      <DatePickerModal
        locale="fr"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
      />
      <Grid>
        <Row> 
          <DataTable>
            <DataTable.Header>
              <List.Item
                style={[{flex: 1}, Platform.OS === 'web' ?{cursor:'mouse'}:null]}
                title="Demandeur"
              />
              <List.Item
                style={[{flex: 1}, Platform.OS === 'web' ?{cursor:'mouse'}:null]}
                title='Type de demande'
              />
              <List.Item
                style={[{flex: 1}, Platform.OS === 'web' ?{cursor:'mouse'}:null]}
                title='Statut'
                right={(props) =>(
                  <Menu
                    renderer={renderers.Popover}
                    rendererProps={{ anchorStyle: {backgroundColor: theme.colors.surfaceVariant} }}
                  >
                    <MenuTrigger>
                      <List.Icon {...props} icon="dots-vertical"/>
                    </MenuTrigger>
                    <MenuOptions
                    // placement='bottom'
                    customStyles={{
                      optionsContainer: {
                        borderRadius: 10,
                        backgroundColor: theme.colors.surfaceVariant,
                        padding: 5,
                      },
                      optionsWrapper: {
                        backgroundColor: theme.colors.surfaceVariant,
                      },
                      optionWrapper: {
                        backgroundColor: theme.colors.surfaceVariant,
                        margin: 5,
                      },
                    }}
                  >
                    <RadioButton.Group onValueChange={newValue => {
                      setValue(newValue)
                      const data = {
                        startPeriod: moment(range.startDate).format('YYYY-MM-DD'),
                        endPeriod: moment(range.endDate).format('YYYY-MM-DD'),
                        status: newValue
                      }
                      fetchRequests(dispatch, data)
                    }} value={value}>
                      <RadioButton.Item color='#fff60073' label="En cours" value="being processed" />
                      <RadioButton.Item color='#43ff6473' label="Acceptée" value="accepted" />
                      <RadioButton.Item color='#ff000073' label="Refusée" value="refused" />
                    </RadioButton.Group>
                  </MenuOptions>
                  </Menu>
                )}
              />
              <List.Item
                style={[{flex: 1}, Platform.OS === 'web' ?{cursor:'mouse'}:null]}
                title='Periode'
                right={(props) =>(
                  <Pressable onPress={()=>setOpen(true)}>
                    <List.Icon {...props} icon="calendar-multiselect"/>
                  </Pressable>
                )}
              />
            </DataTable.Header>
            {/* <ScrollView> */}
              <FlatRequests {...props}/>
            {/* </ScrollView> */}
          </DataTable>
        </Row>
      </Grid>
    
      
    </View>
  );
}