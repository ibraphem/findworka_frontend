import { Book } from "@material-ui/icons";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Characters from "./components/Characters";
import Books from "./components/book/Books";
import Comments from "./components/Comments";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Books} />
        <Route exact path="/characters/:id" component={Characters} />
        <Route exact path="/comments/:id" component={Comments} />
      </Switch>
    </div>
  );
};

export default App;
