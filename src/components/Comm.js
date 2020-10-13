import React from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loadmore from "./Loadmore";

const useStyles = makeStyles({
  bookContainer: {
    paddingRight: "30px",
    paddingLeft: "30px",
  },
});

const Comm = ({ post }) => {
  const classes = useStyles();

  const showMore = () => {
    alert("waooh");
  };
  return (
    <Grid container spacing={4} className={classes.bookContainer}>
      <Grid item xs={12} sm={6}>
        <Card>
          {post.map((com) => (
            <CardActionArea key={com.id}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Anonymous
                </Typography>
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
        </Card>
      </Grid>
    </Grid>
  );
};

export default Comm;
