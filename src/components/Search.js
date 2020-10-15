import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
      width: "50%",
    },
  },
}));

const Search = ({ keyword }) => {
  const classes = useStyles();
  return (
    <form className={classes.root}>
      <TextField
        id="outlined-basic"
        label="Search..."
        variant="outlined"
        onChange={keyword}
      />
    </form>
  );
};

export default Search;
