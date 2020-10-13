import React, { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from "axios";
import CharProp from "./CharProp";

const CharacterProperties = (props) => {
  const [charProperties, setcharProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const useStyles = makeStyles({
    characterContainer: {
      paddingRight: "30px",
      paddingLeft: "30px",
    },
  });

  const loopChar = (url) => {
    let start = 0;
    let end = 9;
    let res = [];

    for (let i = 0; i <= end; i++) {
      axios
        .get(`${url[i]}`, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((response) => {
          res.push(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setcharProperties(res);
    setIsLoading(false);
  };

  // const eachURL = (url) => {

  useEffect(() => {
    loopChar(props.charURL);

    setIsLoading(false);
    //  <CharProp char={charProperties} />;
  }, [props.charURL]);

  // console.log(charProperties);

  //console.log(props.charURL[0]);

  const classes = useStyles();

  return (
    <div>
      <CharProp char={charProperties} />;
      {/*   <Grid container spacing={4} className={classes.characterContainer}>
        <Grid item xs={12} sm={4}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default CharacterProperties;
