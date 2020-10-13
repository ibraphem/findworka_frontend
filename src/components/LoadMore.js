import React from "react";
import Button from "@material-ui/core/Button";

const LoadMore = ({ click }) => {
  return (
    <Button variant="contained" color="primary" fullWidth onClick={click}>
      Load More
    </Button>
  );
};

export default LoadMore;
