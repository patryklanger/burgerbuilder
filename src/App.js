import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

function App() {
  return (
    <BrowserRouter>
      <Layout></Layout>
      <Suspense fallback={<Spinner />}>
        <Route path="/checkout" component={Checkout} />
      </Suspense>
      <Route path="/" exact component={BurgerBuilder} />
    </BrowserRouter>
  );
}

export default App;
