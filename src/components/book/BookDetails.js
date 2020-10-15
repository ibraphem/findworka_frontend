import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import moment from "moment";

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
  link: {
    color: "#fff",
  },
});

const BookDetails = () => {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (date) => {
    return moment(date).format("MMMM DD YYYY");
  };

  let params = useParams();

  useEffect(() => {
    let mounted = true;
    let { id } = params;

    axios
      .get(`https://www.anapioficeandfire.com/api/books/${id}`)
      .then((response) => {
        if (mounted) {
          setBook(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      mounted = false;
    };
  }, [params]);

  const classes = useStyles();

  return (
    <>
      {!isLoading ? (
        <Card>
          <Grid container spacing={4} className={classes.bookContainer}>
            <Grid item xs={12} sm={7}>
              <h1 className={classes.bookTitle}>{book.name}</h1>
              <Link to="/" className={classes.link}>
                Back to Books
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <Typography gutterBottom variant="h6" component="h6">
                  ISBN: <i>{book.isbn}</i>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  padding="5px"
                  component="p"
                >
                  PUBLISHER: <i>{book.publisher}</i>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  padding="5px"
                  component="h6"
                >
                  COUNTRY: <i>{book.country}</i>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  padding="5px"
                  component="h6"
                >
                  RELEASED DATE: <i>{formatDate(book.released)}</i>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

export default BookDetails;
