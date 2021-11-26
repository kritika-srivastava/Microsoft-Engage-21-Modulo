import React from "react";
import "./App.css";
import { Sidebar } from "./components/sidebar/Sidebar";
import Messages from "./components/Messages/Messages";
import { Grid } from "semantic-ui-react";

function App() {
  return (
    <div>
      <Grid columns="equal" className="msg_header">
        <Sidebar />

        <Grid.Column className="messagepanel">
          <Messages />
        </Grid.Column>

        <Grid.Column width={2.7}>
          <span></span>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
