import React, { useState } from "react";
import { Paper, Grid, Typography, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import ComponentGameInfo from "./ComponentGameInfo";

function Load() {
  return (
    <Grid
      team
      lg={3}
      md={4}
      xs={12}
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

function TimeFormat(string) {
  return new Date(string).toLocaleTimeString([]);
}
function DateFormat(string) {
  var choice = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], choice);
}
function ComponentGameTime() {
  const [data, setData] = useState(["Loading"]);

  let [modalOpen, setModalOpen] = useState(() => {
    let temp = {};
    for (let i = 0; i < 20; i++) temp = { ...temp, [i]: false };
    return temp;
  });

  function openModals(e, idx) {
    e.stopPropagation();
    const temp = { ...modalOpen, [idx]: true };
    setModalOpen(temp);
  }

  function closeModals(idx) {
    const temp = { ...modalOpen, [idx]: false };
    setModalOpen(temp);
  }

  if (data[0] == "Loading")
    axios
      .get("https://www.balldontlie.io/api/v1/games?per_page=20")
      .then(res => setData(res.data.data));
  return (
    <Paper>
      <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={800}>
        {data[0] == "Loading" ? (
          <Load />
        ) : (
          data.map((game, idx) => {
            return (
              <Grid
                team
                md={4}
                lg={3}
                xs={12}
                key={idx}
                onClick={e => {
                  return openModals(e, idx);
                }}
              >
                <Typography variant="title">
                  <h2>
                    <b>{DateFormat(game.date)}</b>
                  </h2>
                  <Typography variant="subtitle1">
                    <p>{TimeFormat(game.date)} ET</p>
                  </Typography>
                </Typography>
                <ComponentGameInfo
                  data={game}
                  open={modalOpen[idx]}
                  close={() => {
                    return closeModals(idx);
                  }}
                />
              </Grid>
            );
          })
        )}
      </Grid>
    </Paper>
  );
}

export default ComponentGameTime;
