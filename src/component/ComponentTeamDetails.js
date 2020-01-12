import React, { useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Tooltip } from "@material-ui/core";

const ToolTip = withStyles(theme => ({
  tooltip: {
    color: "#FFFFFF",

    backgroundColor: "#000000"
  }
}))(Tooltip);

function LoadData() {
  return (
    <Grid
      team
      lg={3}
      xs={12}
      md={4}
      style={{ margin: "0 auto", textAlign: "center" }}
    >
      <Typography
        style={{ margin: "80px 80px 80px 80px", textAlign: "center" }}
        variant="h2"
      >
        Loading...
      </Typography>
    </Grid>
  );
}

function ComponentTeamDetails() {
  const [data, setData] = useState(["Loading"]);
  if (data[0] == "Loading")
    axios
      .get("https://www.balldontlie.io/api/v1/teams")
      .then(res => setData(res.data.data));
  return (
    <Paper>
      <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={50}>
        {data[0] == "Loading" ? (
          <LoadData />
        ) : (
          data.map((team, idx) => {
            return (
              <Grid team md={4} lg={3} xs={12} key={idx}>
                <ToolTip
                  title={
                    <React.Fragment>
                      <p>
                        {team.full_name} ({team.abbreviation})
                      </p>
                      <p>City: {team.city}</p>
                      <p>Conference: {team.conference}</p>
                      <p>Division: {team.division}</p>
                    </React.Fragment>
                  }
                  placement="right-start"
                  type="dark"
                  arrow
                >
                  <Typography variant="title">
                    <h2>
                      <b>{team.name}</b>
                    </h2>
                    <Typography variant="subtitle1">
                      <p>{team.division}</p>
                    </Typography>
                  </Typography>
                </ToolTip>
              </Grid>
            );
          })
        )}
      </Grid>
    </Paper>
  );
}

export default ComponentTeamDetails;
