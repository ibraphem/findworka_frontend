import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { Grid, CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import BookDetails from "./book/BookDetails";
import LoadMore from "./LoadMore";
import Search from "./Search";

const useStyles = makeStyles({
  bookContainer: {
    padding: "30px",
    backgroundColor: "#000",
  },
  paper: {
    padding: "5px",
    margin: "5px",
    textAlign: "center",
  },
  bookTitle: {
    color: "#fff",
  },
  characterTitle: {
    textAlign: "center",
  },
  characterContainer: {
    paddingRight: "30px",
    paddingLeft: "30px",
  },
  progress: {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
  },

  search: {
    paddingLeft: "30px",
    paddingRight: "30px",
  },
});

const Characters = () => {
  const [charp, setcharp] = useState([]);
  const [end, setEnd] = useState(9);
  const [isLoading, setisLoading] = useState(true);
  //const [filtered, setFiltered] = useState([]);

  let params = useParams();

  useEffect(() => {
    let mounted = true;
    let res = [];
    let { id } = params;

    axios
      .get(`https://www.anapioficeandfire.com/api/books/${id}`)
      .then((response) => {
        if (mounted) {
          for (let i = 0; i < response.data.characters.length; i++) {
            axios
              .get(`${response.data.characters[i]}`)
              .then((response) => {
                res.push(response.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }

        setTimeout(() => {
          setcharp(res);
          setisLoading(false);
        }, 1000);
        //  console.log(timer);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      mounted = false;
    };
  }, [params]);

  const showMore = () => {
    let newEnd = end + 9;
    setEnd(newEnd);
  };

  //  console.log(charp);

  const getKeyWord = (event) => {
    //  console.log(event.target.value);
    let keyword = event.target.value.toLowerCase();
    let filter = charp.filter((item) => {
      let name = item.name.toLowerCase();
      return name.indexOf(keyword) > -1;
    });
    setcharp(filter);
  };

  console.log(charp);

  const classes = useStyles();

  return (
    <>
      <BookDetails />
      {!isLoading ? (
        <>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}>
              <h1 className={classes.characterTitle}>CHARACTERS</h1>
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.characterContainer}>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}>
              <Search keyword={getKeyWord} className={classes.search} />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
          </Grid>
          {charp.length > 0 ? (
            <Grid container spacing={4} className={classes.characterContainer}>
              {charp.slice(0, end).map((char, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        {char.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <b>Gender: </b>
                        {char.gender}
                        <br />
                        <b>Father: </b>
                        {char.father}
                        <br />
                        <b>Mother: </b>
                        {char.mother}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={4}>
                <LoadMore click={showMore} />
              </Grid>

              <Grid item xs={12} sm={4}></Grid>
            </Grid>
          ) : (
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={4}>
                <h3 className={classes.characterTitle}>
                  No Character was found for this book
                </h3>
              </Grid>
              <Grid item xs={12} sm={4}></Grid>
            </Grid>
          )}
        </>
      ) : (
        <CircularProgress className={classes.progress} />
      )}
    </>
  );
};

export default Characters;
