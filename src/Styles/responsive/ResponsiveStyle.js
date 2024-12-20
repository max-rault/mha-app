import { StyleSheet } from "react-native";
import { DIMENSION_MODES } from "./Constants";

const ResponsiveStyle = (
  { landScapeStyle = {}, tabletPortraitStyle = {}, mobileStyle = {} },
  viewMode
) => {
  console.log(viewMode)
  let styles;
  switch (viewMode) {
    case DIMENSION_MODES.IS_LANDSCAPE_MODE:
      styles = { ...mobileStyle, ...landScapeStyle };
      break;
    case DIMENSION_MODES.IS_TABLET_PORTRAIT_MODE:
      styles = { ...mobileStyle, ...tabletPortraitStyle };
      break;
    default:
      styles = mobileStyle;
  }

  return StyleSheet.create(styles);
};

export default ResponsiveStyle;