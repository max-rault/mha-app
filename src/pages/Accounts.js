import * as React from 'react';
import { DataTable, MD3Colors, Portal, Dialog, Text, FAB, Button } from 'react-native-paper';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStaffMember } from '../store/actions/Staff';
import NoData from '../components/NoData';

export default function Accounts(props){
  const { theme, navigation } = props;
  const { staffMembers } = useSelector(state => state.staff);
  const [ visible, setVisible ] = React.useState(false)
  const [ staffMember, setStaffMember ] = React.useState(null)
  const [ memberIndex, setMemberIndex ] = React.useState(null)
  const [ noData, setNoData ] = React.useState(true)
  const dispatch = useDispatch()
  React.useEffect(()=>{

    if(staffMembers.length > 0){
      setNoData(false)
    }
  },[staffMembers])
  if(noData === true){
    return(
      <View>
       <NoData/>
       <Button 
        style={{
          marginBottom:75,
          maxWidth:200,
          alignSelf:'center'
          
        }}
        mode='elevated' 
        onPress={()=>{
          navigation.navigate('newAccount')
        }}
       >
          Nouvel(le) employé(e)
       </Button>
      </View>
    )
  } else {
    return (
      <View style={{flex: 1, zIndex: 1}}>
       <FAB 
        style={styles.fab} 
        icon='account-plus' 
        label='nouveau compte'
        onPress={() => {
          navigation.navigate('AccountModal',{title: 'nouveau compte'})
        }}
      />
       <Portal>
         <Dialog visible={visible} onDismiss={()=>setVisible(false)}>
           <Dialog.Title>Alert</Dialog.Title>
           <Dialog.Content>
             <Text variant="bodyMedium">Voulez vous supprimer {staffMember?.name} ?</Text>
             <Text variant="bodyMedium">Son compte sera définitivement suprimmé !!!</Text>
           </Dialog.Content>
           <Dialog.Actions>
             <Button 
               onPress={()=>setVisible(false)}
             >
               non, absolument pas !
             </Button>
             <Button 
               onPress={()=>{
                setVisible(false)
                deleteStaffMember(dispatch, staffMember.id, memberIndex)
              }}
               buttonColor={MD3Colors.error50}
               textColor='#fff'
             >
               oui, absolument !
             </Button>
           </Dialog.Actions>
         </Dialog>
       </Portal>
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nom</DataTable.Title>
              <DataTable.Title>Rôle</DataTable.Title>
              {/* <DataTable.Title>Nom d'utilisateur</DataTable.Title> */}
              <DataTable.Title>type de contrat</DataTable.Title>
              <DataTable.Title>Niveaux utilisateur</DataTable.Title>
              {/* <DataTable.Title>Actions</DataTable.Title> */}
            </DataTable.Header>
      
            {staffMembers.map((member, index) => (
                <DataTable.Row 
                  key={member.id}
                  onPress={()=> navigation.navigate('AccountModal', {
                    title: `compte de ${member.name}`,
                    member: member
                  })}
                >
                  <DataTable.Cell>{member.name}</DataTable.Cell>
                  <DataTable.Cell>{member.subCategory}</DataTable.Cell>
                  <DataTable.Cell>{member.contractType} h</DataTable.Cell>
                  <DataTable.Cell>{member.usagePrivileges}</DataTable.Cell>
                </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 2,
    marginRight: 24
  },
})