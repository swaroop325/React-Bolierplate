import React, { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { VerificationForm } from '../Components';
import { ReduxState } from '../types/Redux';
import { loginUser } from '../Store/Actions/User';
import { LoginSubmitFunction, VerificationSubmitFunction } from '../types/User';
import { UserErrors } from '../types/Redux/User';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

interface DispatchProps {
  verifyUser: LoginSubmitFunction;
}

interface StateProps {
  errors: UserErrors;
  email: string;
  name: string;
}

type Props = DispatchProps & StateProps;

const Verify: React.FC<Props> = ({
  verifyUser: verifyUserRedux,
  errors,
  email: reduxEmail,
  name,
}: Props) => {
  const classes = useStyles();
  const { replace } = useHistory();

  const idToken = localStorage.getItem('idToken');
  const email = localStorage.getItem('email');

  const verifyUser: VerificationSubmitFunction = (values) => {
    // Calls Login User API with email value from redux
    // If email is not present in Redux, use email from localStorage
    if (reduxEmail)
      return verifyUserRedux({ password: values.password, email: reduxEmail });

    if (email) return verifyUserRedux({ password: values.password, email });
  };

  useEffect(() => {
    // Redirects to login Page if email is not in localStorage
    if (!email) replace('/login');

    // If token is true and name, email is stored in Redux Store
    if (idToken) {
      // Redirect to Products Page
      if (name && email) replace('/products');
    }
  }, [name, email, idToken]);

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      textAlign={'center'}
      mt={'5rem'}
    >
      {name ? (
        <Typography component={'h2'} className={classes.annotation}>
          {`Hello ${name}, Please login to continue`}
        </Typography>
      ) : (
        <Typography component={'h2'} className={classes.annotation}>
          {`Hello, Please login to continue`}
        </Typography>
      )}
      <VerificationForm onSubmit={verifyUser} errors={errors} />
    </Box>
  );
};

function mapStateToProps(state: ReduxState): StateProps {
  return {
    errors: state.user.errors,
    email: state.user.email,
    name: state.user.name,
  };
}

function mapDispatchToProps(
  dispatch: (dispatchFunction: any) => void,
): DispatchProps {
  return {
    verifyUser: (values) => dispatch(loginUser(values)),
  };
}

const useStyles = makeStyles((theme) => ({
  annotation: {
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
}));

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
