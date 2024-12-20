import React from "react";
import { DIMENSION_MODES } from "./Constants";

export const ResponsiveContext = React.createContext(
  DIMENSION_MODES.IS_MOBILE_MODE
);