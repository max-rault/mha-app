export const dashboardStyles = {
  mobileStyle: {
    container:{
      flex: 1
    },
    page:{
      justifyContent: 'center'
    },
    centerContainer: {
      flex: 1,
      marginTop: 30,
    },
    module: {
      flexGrow: 42.5,
      flexShrink: 1,
      flexBasis: '0%',      
      flexDirection: "column",
    },
    card:{
      flex: 1,
      margin: 50
    },
    surface: {
      padding: 4,
      height: 60,
      width: 60,
      borderRadius:120,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10
    },
    col: {
      alignItems:'center'
    },
  },
  landScapeStyle: {
    centerContainer: {
      flex: 1,
      flexDirection: "row",
    },
    moduleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    module: {
      flexGrow: 42.5,
      flexShrink: 1,
      flexBasis: '0%',
      flexDirection: 'row'
    },
    card:{
      flex: 1,
      margin: 50
    },
    surface: {
      padding: 4,
      height: 80,
      width: 80,
      borderRadius:160,
      alignItems: 'center',
      justifyContent: 'center',
    },
    col: {
      alignItems:'center'
    },
    // Styles specific to landscape mode
  },
  tabletPortraitStyle: {
    centerContainer: {
      flex: 1,
      marginTop: 30,
    },
    module: {
      // flexGrow: 30,
      // flexShrink: 1,
      // flexBasis: '0%',
      flexDirection: "row",
    },
    card:{
      flex: 1,
      margin: 50
    },
    surface: {
      padding: 4,
      height: 80,
      width: 80,
      borderRadius:160,
      alignItems: 'center',
      justifyContent: 'center',
    },
    col: {
      alignItems:'center'
    },
  },
};