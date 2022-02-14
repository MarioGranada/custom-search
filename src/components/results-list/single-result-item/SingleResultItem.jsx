import { type Node } from 'react';

type SingleResultItemProps = {
  title: string,
  overview: string
};

const SingleResultItem = ({ title, overview }: SingleResultItemProps): Node => (
  <div>
    <h2>{title} </h2>
    <div>{overview}</div>
  </div>
);

export default SingleResultItem;
