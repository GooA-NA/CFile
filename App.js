import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import NewApp from "./NewApp";



export default function App() {

  return (
    <Provider store={store}>
      <NewApp />
   </Provider>
  );
}
