import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BookDetails from "./book/BookDetails";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import LoadMore from "./LoadMore";
import moment from "moment";

const useStyles = makeStyles({
  characterTitle: {
    textAlign: "center",
  },
  bookContainer: {
    paddingRight: "30px",
    paddingLeft: "30px",
  },
  textArea: {
    width: "420px",
  },
  commenter: {
    float: "left",
    fontWeight: "bolder",
  },
  date: {
    float: "right",
  },
  progress: {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

const Comments = () => {
  let { id } = useParams();
  const classes = useStyles();

  const [comm, setComm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [end, setEnd] = useState(5);
  const [write, setWrite] = useState("");

  let params = useParams();

  useEffect(() => {
    let mounted = true;
    let { id } = params;
    setIsLoading(true);
    axios
      .get(`http://test.plantlife.com.ng/api/comment/${id}`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => {
        if (mounted) {
          setComm(response.data);
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

  const handleWriterChange = (e) => {
    setWrite(e.target.value);
    //  console.log(e.target.value);
  };

  const showMore = () => {
    let newEnd = end + 5;
    setEnd(newEnd);
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = JSON.stringify({
      id: id,
      write: write,
    });

    console.log(formData);

    let mounted = true;

    if (formData.write === undefined || formData.write.length < 1) {
      alert("Please write your comment before submit.  ");
    } else {
      setIsLoading(true);
      axios
        .post("http://test.plantlife.com.ng/api/store/comment", formData)
        .then((response) => {
          if (mounted) {
            console.log(response.data);
            setComm(response.data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      mounted = false;
    };
  };

  //console.log(comm);
  return (
    <>
      {!isLoading ? (
        <>
          <BookDetails />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}>
              <h1 className={classes.characterTitle}>COMMENTS</h1>
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
          </Grid>

          <Grid container spacing={4} className={classes.bookContainer}>
            <Grid item xs={12} sm={6}>
              <form onSubmit={submit}>
                <TextareaAutosize
                  rowsMin={10}
                  placeholder="What do you think about this book?"
                  className={classes.textArea}
                  onChange={handleWriterChange}
                />
                <br />
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                {comm.slice(0, end).map((com) => (
                  <CardActionArea key={com.id}>
                    <CardContent>
                      <span className={classes.commenter}>Anonymous</span>

                      <span className={classes.date}>
                        {moment(com.created_at, "YYYYMMDD").fromNow()}
                      </span>
                      <br />
                      <br />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="h4"
                      >
                        {com.comm}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                ))}
                <LoadMore click={showMore} />
              </Card>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <CircularProgress className={classes.progress} />
      )}
    </>
  );
};

export default Comments;
