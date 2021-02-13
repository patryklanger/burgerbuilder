import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";
import Spinner from "./components/UI/Spinner/Spinner";
import ContactData from "./containers/Checkout/ContactData/ContactData";
import Orders from "./containers/Orders/Orders";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path="/orders" exact>
          <Orders />
        </Route>
        <Suspense fallback={<Spinner />}>
          <Route path="/checkout" component={Checkout} />
        </Suspense>

        <Route exact path="/" component={BurgerBuilder} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
