import { FormEvent, useRef } from 'react';
import Header from '../../components/header/header';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { Helmet } from 'react-helmet-async';
import { getAuthorizationStatus } from '../../store/slices/user-slice/user-selector';
import { AuthorizationStatus } from '../../data/authorization';
import { PathRoutes } from '../../data/routes';

function LoginPage(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthorizationStatus);
  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  return (
    authStatus !== AuthorizationStatus.Auth ?
      <div className="page page--gray page--login">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Header />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form"
                action="#"
                method="post"
                onSubmit={handleSubmitForm}
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    ref={emailRef}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    ref={passwordRef}
                  />
                </div>
                <button className="login__submit form__submit button" type="submit">
                Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to="#">
                  <span>Amsterdam</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
      : <Navigate to={PathRoutes.MAIN} />
  );
}

export default LoginPage;
