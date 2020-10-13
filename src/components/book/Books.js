import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import { Grid, CircularProgress } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({
  bookContainer: {
    padding: "10px",
  },
  progress: {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

const Books = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState([]);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    axios
      .get("https://www.anapioficeandfire.com/api/books?page=1&pageSize=15")
      .then((response) => {
        if (mounted) {
          setBookDetails(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // console.log(bookDetails);

  const classes = useStyles();
  return (
    <>
      {!isLoading ? (
        <Grid container spacing={4} className={classes.bookContainer}>
          {bookDetails.map((bookDetail, index) => (
            <Grid item xs={12} sm={4} key={bookDetail.isbn}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {bookDetail.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {bookDetail.authors.map((author, ind) => (
                        <i key={ind}>{author}&nbsp;&nbsp;</i>
                      ))}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link to={`/characters/${index + 1}`}>
                    <Button size="small" color="primary">
                      Character
                    </Button>
                  </Link>
                  <Link to={`/comments/${index + 1}`}>
                    <Button size="small" color="primary">
                      Comment
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <CircularProgress className={classes.progress} />
      )}
    </>
  );
};

export default Books;
