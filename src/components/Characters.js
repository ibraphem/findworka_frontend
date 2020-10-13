import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { Grid, CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import CharacterProperties from "./CharacterProperties";
import CharProp from "./CharProp";
import BookDetails from "./book/BookDetails";
import LoadMore from "./LoadMore";

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
});

const Characters = () => {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState([]);
  const [characterProperties, setCharacterProperties] = useState([]);
  const [charp, setcharp] = useState([]);
  const [end, setEnd] = useState(9);

  const formatDate = (date) => {
    return moment(date).format("MMMM DD YYYY");
  };

  let res_arr = [];
  let res = [];

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    axios
      .get(`https://www.anapioficeandfire.com/api/books/${id}`)
      .then((response) => {
        if (mounted) {
          for (let i = 0; i < response.data.characters.length; i++) {
            axios
              .get(`${response.data.characters[i]}`)
              .then((response) => {
                res.unshift(response.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }

        const timer = setTimeout(() => {
          setcharp(res);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const showMore = () => {
    let newEnd = end + 9;
    setEnd(newEnd);
  };

  console.log(charp);

  let { id } = useParams();
  const classes = useStyles();

  return (
    <>
      {charp.length > 0 ? (
        <>
          <BookDetails />

          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}>
              <h1 className={classes.characterTitle}>CHARACTERS</h1>
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
          </Grid>

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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
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
        </>
      ) : (
        <CircularProgress className={classes.progress} />
      )}
    </>
  );
};

export default Characters;
