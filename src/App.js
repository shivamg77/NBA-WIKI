import React, { useState } from "react";
import ComponentGameTime from "./component/ComponentGameTime";
import ComponentTeamDetails from "./component/ComponentTeamDetails";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Typography,
  Toolbar,
  Grid,
  withStyles,
  Tabs,
  Tab,
  Paper
} from "@material-ui/core";

const style = {
  heading: {
    width: "100%",
    marginTop: "65px",
    fontWeight: "500",
    textAlign: "center",
    color: "#F86E1D"
  },

  tab: {
    color: "#FFFFFF",
    background: "#F86E1D"
  }
};

function MainMethod(props) {
  const { classes } = props;
  const [selectedTab, setselectedTab] = useState(0);

  function changeTabs(e, values) {
    setselectedTab(values);
  }

  return (
    <div className="MainMethod">
      <Toolbar>
        <Grid container justify="center" className={classes.heading}>
          <Typography variant="h4">NBA REPO</Typography>
        </Grid>
      </Toolbar>

      <Grid container justify="center" style={{ marginTop: "85px" }}>
        <Grid item xs={12} lg={9} md={10}>
          <Paper>
            <Tabs value={selectedTab} onChange={changeTabs} variant="fullWidth">
              <Tab
                label="NBA Teams"
                classes={{ selected: classes.tab }}
                style={{
                  fontWeight: "500",
                  border: "1px solid #eee",
                  boxShadow: "0 2px 2px #ccc"
                }}
              />

              <Tab
                label="NBA Games"
                classes={{ selected: classes.tab }}
                style={{
                  boxShadow: "0 2px 2px #ccc",
                  border: "1px solid #eee",
                  fontWeight: "500"
                }}
              />
            </Tabs>
          </Paper>

          <Grid
            container
            justify="center"
            style={{
              marginTop: "25px",
              border: "1px solid #eee",
              boxShadow: "0 2px 2px #ccc"
            }}
          >
            <Grid item xs={12} lg={9} md={10}></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={9} md={10}>
          {selectedTab == 0 ? (
            <ComponentTeamDetails></ComponentTeamDetails>
          ) : (
            <ComponentGameTime></ComponentGameTime>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(style)(MainMethod);
