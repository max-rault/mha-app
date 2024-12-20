import * as React from 'react';
import { View, Image, StyleSheet, Dimensions  } from 'react-native';
import { Button, HelperText, TextInput, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../../store/actions/Staff';
import { useForm, Controller } from "react-hook-form";
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get('window').height;

export default function NewPassword(props){

  const { theme, navigation } = props;
  const { params } = props.route
  const [hidePwd, setHidePwd] = React.useState(true)
  const [loading, setLoading] = React.useState(false)


  const {
    control, 
    handleSubmit,
    reset,
    formState,
    formState: {errors, isValid, isSubmitSuccessful}
  } = useForm({mode: 'onChange'})
  
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.staff);

  const submit = (values) => {
    setLoading(true)

    user.password = values.password
    console.log(values)
    const data = user

    updateAccount(dispatch, data)
    .then((redirection)=>{

      setLoading(false)
      console.log({redirection})

      if(redirection){
        navigation.replace('Main')
      }
    })
    .catch((err)=>{
      setLoading(false)
      console.log('err: ', err)
    })

  }

 
  React.useEffect(() => {
    if (isSubmitSuccessful === true) {
      reset({
        password:"",
        confirmPwd: ""
      })
    }
  }, [formState, reset])

  return (
    <LinearGradient
      colors={['#6750a4', '#f04623', '#f8bc0c']}
      style={nativeStyles.background}
      start={{x:0, y:0.5}}
      // end={{x:1, y:1}}
    >
      <View style={nativeStyles.container}>
        <Surface style={nativeStyles.surface} elevation={5}>
          <Image
            source={require('../../../assets/MHA_logo.png')}
            style={nativeStyles.image}
          />
          <View style={nativeStyles.childContainer}>
            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <TextInput
                    value={value}
                    label="Nouveau mot de passe"
                    style={nativeStyles.input}
                    onBlur={onBlur}
                    textContentType="password"
                    secureTextEntry={hidePwd}
                    autoCapitalize="none"
                    right={<TextInput.Icon icon={hidePwd ? "eye":"eye-off"} onPress={()=>setHidePwd(!hidePwd)}/>}
                    onChangeText={(value) => onChange(value)}
                  />
                  <HelperText type="error">{errors.password?.message}</HelperText>
                </>
              )}
              rules={{
                required: {
                  value: true,
                  message: "un mot de passe est requis !"
                },
                pattern:{
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
                  message: "le mot de passe doit contenir au moins 10 charactères, une majuscule, une minuscule, un charactère spéciale et un nombre !"
                },
              }}
            />
            <Controller
              control={control}
              name="confirmPwd"
              defaultValue=""
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <TextInput
                    value={value}
                    label="Confirmez le mot de passe"
                    style={nativeStyles.input}
                    onBlur={onBlur}
                    textContentType="password"
                    inputMode='text'
                    autoCapitalize="none"
                    secureTextEntry={hidePwd}
                    right={<TextInput.Icon icon={hidePwd ? "eye":"eye-off"} onPress={()=>setHidePwd(!hidePwd)}/>}
                    onChangeText={(value) => onChange(value)}
                  />
                  <HelperText type="error">{errors.confirmPwd?.message}</HelperText>
                </>
              )}
              rules={{
                validate:(value, formValues)=> formValues.password === value
              }}
            />
            <Button
              mode="contained"
              onPress={handleSubmit(submit)}
              disabled={!isValid}
              loading={loading}
              style={{marginHorizontal:'auto', alignSelf:'center'}}
            >
              Connexion
            </Button>
          </View>
        </Surface>
      </View>
    </LinearGradient>
   );
}

const nativeStyles = StyleSheet.create({
  container:{
    // flexDirection: 'row',
    flex: 1, 
    alignItems:'center'
  },
  childContainer: { 
    flex: 1, 
    marginHorizontal: 30,
    paddingHorizontal: '25%',
  },
  input: { marginVertical: 5 },
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  image: {
    // flex: 1,
    width: windowWidth * 0.3,
    height: windowHeight * 0.4,
    resizeMode: 'contain', 
    marginHorizontal: 'auto'
  },
  surface:{
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50,
    borderRadius: 10,
    backgroundColor:'#fff'
  },
  background:{
   flex: 1
  }
})