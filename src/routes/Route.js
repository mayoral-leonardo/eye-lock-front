import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const loading = false
  const signed = false

  if (loading) {
    return <h1>Carregando...</h1>
  }

  if (!signed && isPrivate) {
    return <Redirect to='/' />
  }

  if(signed && !isPrivate) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Component {...props} />
      )}
    />
  );
}