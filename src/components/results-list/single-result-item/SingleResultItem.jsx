import * as React from 'react';

// SingleResultItem model:
type SingleResultItemProps = {
  title: string,
  overview: string
};

const SingleResultItem = ({ title, overview }: SingleResultItemProps): React.Node => (
  <div>
    <h2>{title} </h2>
    <div>{overview}</div>
  </div>
);

export default SingleResultItem;
