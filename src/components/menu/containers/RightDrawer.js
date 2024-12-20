import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerChat from '../contents/DrawerChat';
import LeftDrawerScreens from './LeftDrawer';
import { Drawer } from 'react-native-drawer-layout';

const RightDrawer = createDrawerNavigator();
const RightDrawerContext = React.createContext();

export default function RightDrawerScreens(props) {
  const { theme, setUsedTheme, navigation } = props;

  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);

  const value = React.useMemo(
    () => ({
      openRightDrawer: () => setRightDrawerOpen(true),
      closeRightDrawer: () => setRightDrawerOpen(false),
    }),
    []
  );
  return (
    <Drawer
      open={rightDrawerOpen}
      onOpen={() => setRightDrawerOpen(true)}
      onClose={() => setRightDrawerOpen(false)}
      drawerPosition="right"
      drawerStyle={{backgroundColor: theme.colors?.background}}
      renderDrawerContent={(props) => <DrawerChat theme={theme} navigation={navigation} closeDrawer={()=>setRightDrawerOpen(false)} {...props} />}
    >
      <RightDrawerContext.Provider value={value}>
        <LeftDrawerScreens  theme={theme} setUsedTheme={setUsedTheme} context={RightDrawerContext} {...props}/>
      </RightDrawerContext.Provider>
    </Drawer>
  );
}