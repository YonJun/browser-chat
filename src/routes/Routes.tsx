import { useRoutes } from "react-router-dom";
import routes from "./config";

export function Routes() {
  let element = useRoutes(routes);

  return element;
}
