import { combineReducers } from "redux";

import userReducer from "./User";
import accountReducer from "./Account";
import shopsReducer from "./Shops";
import SidebarToggle from "./SidebarToggle";
import resolutionReducer from "./Resolution";
import socket from "./socket";

const rootReducer = combineReducers({
  user: userReducer,
  account: accountReducer,
  shops: shopsReducer,
  toggleSidebar: SidebarToggle,
  resolution: resolutionReducer,
  socket,
});

export default rootReducer;
