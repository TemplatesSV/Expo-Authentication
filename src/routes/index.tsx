import { StackRoutes } from "./stack.routes";
import { BottomTabNavigation } from "./bottomTabs.routes";
import { Fragment, useContext } from "react";
import { AuthContext } from "../shared/contexts/Auth";

export function Routes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Fragment>
      {isAuthenticated === true ? <BottomTabNavigation /> : <StackRoutes />}
    </Fragment>
  );
}
