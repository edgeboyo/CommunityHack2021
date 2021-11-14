import PropTypes from "prop-types";

export default function Dashboard(props: any) {
  const { token, user } = props;

  console.log(user);

  return <div>{token}</div>;
}

/*
Dashboard.propTypes = {
  token: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
};
*/
