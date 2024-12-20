import * as React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Appbar, Button, HelperText, Text, TextInput, Divider, IconButton, Avatar } from 'react-native-paper';
import { DatePickerInput, DatePickerModal  } from 'react-native-paper-dates';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Grid } from "react-native-easy-grid";
import { Dropdown } from 'react-native-element-dropdown';
import { newStaffMember } from '../../store/actions/Staff';
import { useForm, Controller } from "react-hook-form";

import moment from 'moment';

//dropdown data

const statusData = [
  {label:'Actif', value:'Actif'},
  {label:'Mise à pied', value:'Mise à pied'},
  {label:'Vacance', value:'Vacance'},
  {label:'Formation', value:'Formation'},
]

const subCategoryData  = [
  {label: "Equipier", value:"Equipier"},
  {label:"Responsable", value:"Responsable"},
  {label: "Leader", value:"Leader"},
  {label: "Manager", value:"Manager"}
]

const categoryData = [
  {label:'Comptoir', value:'Comptoir'},
  {label:'Cuisine', value:'Cuisine'},
  {label:'Nettoyage', value:'Nettoyage'},
]

const userLevelData = [
  {label:'Admin', value:'Admin'},
  {label:'Super Admin', value:'super admin'},
  {label:'utilisateur', value:'utilisateur'},
]

const contractTypeData = [
  {label: '5h', value: 5},
  {label: '10h', value: 10},
  {label: '15h', value: 15},
  {label: '24h', value: 24},
  {label: '30h', value: 30},
  {label: '35h', value: 35},
]

export default function AccountModal(props){

  //props
  const { theme, navigation } = props;
  const { params } = props.route

  //Form state
  const [ visible, setVisible ] = React.useState(false)
  const [ category, setCategory ] = React.useState({label: params.member.category, value: params.member.category})
  const [ status, setStatus ] = React.useState({label: params.member?.UserStatus.status, value: params.member.UserStatus.status})
  const [ subCat, setSubCat ] = React.useState({label: params.member.subCategory, value: params.member.subCategory})
  const [ contract, setContract ] = React.useState({label: `${params.member?.contractType} h`, value: params.member?.contractType})
  const [ userLevel, setUserLevel ] = React.useState({label: params.member?.usagePrivileges, value: params.member?.usagePrivileges})
  const [ inputDate, setInputDate ] = React.useState(new Date(params.member?.birthdate))
  const [range, setRange] = React.useState({ startDate: new Date(params.member?.UserStatus?.period[0].value), endDate: new Date(params.member?.UserStatus?.period[1].value) });
  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );


  //Default form values
  const [ defaultValue, setDefaultValue ] = React.useState({
    name: params.member ? params.member?.name:"",
    birthDate: params.member ? params.member?.birthdate: undefined,
    phone: params.member ? params.member?.phone:"",
    email: params.member ? params.member?.mail:"",
    category: category.value,
    subCategory:subCat.value,
    contractHours: contract.value,
    usagePrivileges: userLevel.value
  })

  const {
    control, 
    handleSubmit,
    reset,
    formState,
    formState: {errors, isValid, isSubmitSuccessful}
  } = useForm({mode: 'onChange', defaultValues: defaultValue})
  
  const dispatch = useDispatch()
  const submit = (data) => {
    dispatch(newStaffMember(dispatch, data))
  }

 
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name:"",
        birthDate:new Date(),
        phone:"",
        email:""
      })
    }
  }, [formState, reset])

  return (
    <ScrollView>
      <DatePickerModal
        locale="fr"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
      />
     <Appbar.Header>
       <Appbar.BackAction onPress={()=>{
          navigation.goBack()
        }}/>
       <Appbar.Content title={params.title}/>
     </Appbar.Header>
     <Grid style={{marginHorizontal:20}}>
        <Row size={30} style={{alignItems:'center'}}>
          <Col>
            <Avatar.Image source={{
              uri: params.member.avatar
            }} size={128}/>
          </Col>
          <Col>
            <View>
              <Controller
                control={control}
                name="Status"
                defaultValue=""
                render={({field: {onChange, value, onBlur}}) => (
                  <>
                    <View style={{marginBottom: 25, marginLeft: 16}}>
                      <Text style={{marginBottom: 16}}>Statut de {params.member?.name} :</Text>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={[styles.placeholderStyle,{color:theme.colors.onSurface}]}
                        selectedTextStyle={[styles.selectedTextStyle, {color:theme.colors.onSurface}]}
                        itemContainerStyle={{backgroundColor: theme.colors.background}}
                        activeColor="#611cd2bd"
                        containerStyle={{borderColor:theme.colors.background}}
                        itemTextStyle={{color:theme.colors.onSurface}}
                        data={statusData}
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder="Séléctionnez un statut"
                        value={status}
                        onChange={item => {
                          setStatus(item)
                          onChange(item.value)
                        }}
                      />
                    </View>
                    <HelperText type="error">{errors.Status?.message}</HelperText>
                  </>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Le statut est requis !"
                  },
                }}
              />
              {
                status.value !== 'Actif' ?
                <Controller
                  control={control}
                  name="Period"
                  defaultValue=""
                  render={({field: {onChange, value, onBlur}}) => (
                    <>
                      <Text style={{marginLeft: 16}}>Periode :</Text>
                      <View style={{flexDirection:'row', alignItems: 'center'}}>
                        <View style={{justifyContent:'space-evenly', marginVertical:10}}>
                          <IconButton
                            style={{alignSelf: 'flex-start'}}
                            icon='calendar-outline'
                            onPress={()=>setOpen(true)}
                          />
                        </View>
                        <View style={{flex:1, flexDirection:'row'}}>
                          <Text>
                            du {moment(range.startDate).format('DD/MM/YYYY')}
                            au {moment(range.endDate).format('DD/MM/YYYY')}
                          </Text>
                        </View>
                      </View>
                      <HelperText type="error">{errors.Status?.message}</HelperText>
                    </>
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "La periode est requise !"
                    },
                  }}
                />:null
              }
            </View>
          </Col>
          <Col>
            <Controller
              control={control}
              defaultValue=""
              name="name"
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <TextInput
                    label="Nom"
                    style={styles.input}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                  />
                  <HelperText type="error">{errors.name?.message}</HelperText>
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Le nom est requis !'
                },
              }}
            />
            <Controller
              control={control}
              defaultValue=""
              name="birthDate"
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <DatePickerInput
                    locale="fr"
                    label="Date de naissance"
                    value={inputDate}
                    onChange={(d) => {
                      setInputDate(d)
                      onChange(d)
                    }}
                    inputMode="start"
                  />
                  <HelperText type="error">{errors.birthDate?.message}</HelperText>
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'La date de naissance est requise !'
                },
              }}
            />
            <Controller
              control={control}
              name="phone"
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    label="Téléphone"
                    style={styles.input}
                    onBlur={onBlur}
                    value={value}
                    textContentType='telephoneNumber'
                    inputMode='tel'
                    onChangeText={(value) => onChange(value)}
                  />
                  <HelperText type="error">{errors.phone?.message}</HelperText>
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Le numéro de téléphone est requis !'
                },
                pattern:{
                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                  message: 'numéro de télephone invalide'
              },
              }}
            />
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <TextInput
                    value={value}
                    label="Email"
                    style={styles.input}
                    onBlur={onBlur}
                    textContentType="emailAddress"
                    inputMode='email'
                    autoCapitalize="none"
                    onChangeText={(value) => onChange(value)}
                  />
                  <HelperText type="error">{errors.email?.message}</HelperText>
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: "L'email est requis !"
                },
                pattern:{
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "l'email est invalide !"
              },
              }}
            />
          </Col>
        </Row>
        <Row size={70}>
          <View>
            <Text>Contrat</Text>
            <Divider style={styles.separator}/>
            <Controller
              control={control}
              name="category"
              defaultValue=""
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text>Categorie:</Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle,{color:theme.colors.onSurface}]}
                    selectedTextStyle={[styles.selectedTextStyle, {color:theme.colors.onSurface}]}
                    itemContainerStyle={{backgroundColor: theme.colors.background}}
                    activeColor="#611cd2bd"
                    containerStyle={{borderColor:theme.colors.background}}
                    itemTextStyle={{color:theme.colors.onSurface}}
                    data={categoryData}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder="Séléctionnez une catégorie"
                    value={category}
                    onChange={item => {
                      setCategory(item)
                      onChange(item.value)
                    }}
                  />
                  <HelperText type="error">{errors.category?.message}</HelperText>
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: "Le type d'employé(e) est requis !"
                },
              }}
            />
            <Controller
              control={control}
              name="subCategory"
              defaultValue=""
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text>Sous categorie</Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle,{color:theme.colors.onSurface}]}
                    selectedTextStyle={[styles.selectedTextStyle, {color:theme.colors.onSurface}]}
                    itemContainerStyle={{backgroundColor: theme.colors.background}}
                    activeColor="#611cd2bd"
                    containerStyle={{borderColor:theme.colors.background}}
                    itemTextStyle={{color:theme.colors.onSurface}}
                    data={subCategoryData}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder="Séléctionnez une sous catégorie"
                    value={subCat}
                    onChange={item => {
                      setSubCat(item)
                      onChange(item.value)
                    }}
                  />
                  <HelperText type="error">{errors.subCategory?.message}</HelperText>
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: "Le type de poste est requis !"
                },
              }}
            />
            <Controller
              control={control}
              name="contractHours"
              defaultValue=""
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text>Type de contrat</Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle,{color:theme.colors.onSurface}]}
                    selectedTextStyle={[styles.selectedTextStyle, {color:theme.colors.onSurface}]}
                    itemContainerStyle={{backgroundColor: theme.colors.background}}
                    activeColor="#611cd2bd"
                    containerStyle={{borderColor:theme.colors.background}}
                    itemTextStyle={{color:theme.colors.onSurface}}
                    data={contractTypeData}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder="Séléctionnez un type de contrat"
                    value={contract}
                    onChange={item => {
                      setContract(item)
                      onChange(item.value)
                    }}
                  />
                  <HelperText type="error">{errors.contractHours?.message}</HelperText>
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: "Le type de contrat est requis !"
                },
              }}
            />
            <Controller
              control={control}
              name="contractHours"
              defaultValue=""
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text>Statut de {params.member?.name}</Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle,{color:theme.colors.onSurface}]}
                    selectedTextStyle={[styles.selectedTextStyle, {color:theme.colors.onSurface}]}
                    itemContainerStyle={{backgroundColor: theme.colors.background}}
                    activeColor="#611cd2bd"
                    containerStyle={{borderColor:theme.colors.background}}
                    itemTextStyle={{color:theme.colors.onSurface}}
                    data={contractTypeData}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder="Séléctionnez un type de contrat"
                    value={contract}
                    onChange={item => {
                      setContract(item)
                      onChange(item.value)
                    }}
                  />
                  <HelperText type="error">{errors.contractHours?.message}</HelperText>
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: "Le type de contrat est requis !"
                },
              }}
            />
            <Text>Application</Text>
            <Divider style={styles.separator}/>
            <Text>Niveau d'utilisation:</Text>
            <Controller
              control={control}
              name="usagePrivileges"
              defaultValue=""
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle,{color:theme.colors.onSurface}]}
                    selectedTextStyle={[styles.selectedTextStyle, {color:theme.colors.onSurface}]}
                    itemContainerStyle={{backgroundColor: theme.colors.background}}
                    activeColor="#611cd2bd"
                    containerStyle={{borderColor:theme.colors.background}}
                    itemTextStyle={{color:theme.colors.onSurface}}
                    data={userLevelData}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder="Séléctionnez un niveau d'utilisation de l'app"
                    value={userLevel}
                    onChange={item => {
                      setUserLevel(item)
                      onChange(item.value)
                    }}
                  />
                  <HelperText type="error">{errors.usagePrivileges?.message}</HelperText>
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: "Le niveau d'utilisation est requis est requis !"
                },
              }}
            />
          </View>
        </Row>
        <Row size={10}>
          <Button
            mode="contained"
            onPress={handleSubmit(submit)}
            disabled={!isValid}
          >
            Enregistrer
          </Button>
        </Row>
     </Grid>
    </ScrollView>
   );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", marginHorizontal: 30 },
  input: { marginVertical: 5 },
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
});