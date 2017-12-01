import React from 'react';
import { Header, Form, Button, Input, Icon, Label, Checkbox } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { withApollo } from 'react-apollo';
import { withCookies } from 'react-cookie';
import { Link, withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import TwitterLogin from 'react-twitter-auth';
import ReactGA from 'react-ga';
import { loginWithPassword, loginWithFacebook, loginWithGoogle } from '../components/Common/meteor-apollo-accounts';
import {Notification} from '../components/Notification/Notification';
import SEO from '../components/Common/SEO';
import store from '/lib/store';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUsername: '',
      password: '',
      remember: false
    };

    this.login = this.login.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
  }

  componentDidMount() {
    const token = store.getItem('Meteor.loginToken') || null;
    if (token) {
      this.props.history.push('/');
    }
  }

  redirectToApp() {
    Notification.success(this.props.t('common:notif.logged'));
    this.props.cookies.set('meteor_login_token', store.getItem('Meteor.loginToken'), { path: '/' });
    this.props.history.push('/?refresh');
    this.props.client.resetStore();
  }

  // Password Auth
  async login(event) {
    event.preventDefault();

    const email = this.state.emailUsername;
    const username = this.state.emailUsername;
    const {password} = this.state;
    const loginObject = email.indexOf('@') > -1
      ? { email, password }
      : { username, password };

    try {
      await loginWithPassword(loginObject, this.props.client);
      ReactGA.event({
        category: 'User',
        action: 'LoginWithEmail'
      });
      this.redirectToApp();
    } catch (error) {
      Notification.error(error);
    }
  }

  // Facebook Auth
  async loginFacebook({ accessToken }) {
    try {
      await loginWithFacebook({ accessToken }, this.props.client);
      ReactGA.event({
        category: 'User',
        action: 'LoginWithFacebook'
      });
      this.redirectToApp();
    } catch (error) {
      Notification.error(error);
    }
  }

  responseFacebook(response) {
    if (!response.accessToken) return;
    this.loginFacebook(response);
  }

  render() {
    const { t, showSignup, showForgotPassword, onClose } = this.props;
    return (
      <div className="auth-page">
        <SEO
          schema="Webpage"
          title={t('seoTitle')}
          description={t('seoDesc')}
          path="/login"
          contentType="product"
        />
        <div className="inner">
          <div className="social-login">
            <FacebookLogin
              cssClass="facebook-login-button"
              appId="1127643753917982"
              fields="name,email,picture"
              scope="public_profile,email"
              callback={() => this.responseFacebook()}
              textButton=""
              icon={<span><Icon name="facebook f" />Login with Facebook</span>}
            />
          </div>

          <div className="text-separator">
            <span className="label">{t('common:or')}</span>
          </div>

          <Form onSubmit={this.login}>
            <h3>Log in using e-mail</h3>
            <Form.Field>
              <Label content="E-mail" className="label" />
              <Input
                icon="mail"
                iconPosition="left"
                name="emailUsername"
                placeholder={t('common:form.emailPlaceholder')}
                type="text"
                required="true"
                value={this.state.emailUsername}
                onChange={(event) => this.setState({ emailUsername: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <Label content="Password" className="label" />
              <Input
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder={t('common:form.password')}
                type="password"
                required="true"
                value={this.state.password}
                onChange={(event) => this.setState({ password: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                value="remember"
                label="Remember me"
                onChange={() => this.setState({ remember: !this.state.remember })}
              />
            </Form.Field>
            <Form.Field className="auth-footer-section">
              <div className="auth-footer">
                <u onClick={showForgotPassword} >{t('common:form.forgotPassword')}</u>
                {t('common:form.noAccount')} &nbsp; <u onClick={showSignup}>{t('common:form.signUp')}</u>
              </div>
              <Button type="button" className="btn-cancel" onClick={onClose}>{t('common:form.cancel')}</Button>
              <Button type="submit" color="green">{t('common:form.signIn_min')}</Button>
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  }
}

export default translate('login')(withCookies(withApollo(withRouter(Login))));
