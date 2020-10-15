import React from "react";
import TextField from "@material-ui/core/TextField";

const Search = ({ keyword }) => {
  return (
    <TextField
      id="outlined-basic"
      label="Search character"
      variant="outlined"
      onChange={keyword}
      fullWidth
    />
  );
};

export default Search;
