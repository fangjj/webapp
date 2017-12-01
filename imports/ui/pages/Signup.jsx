import React from 'react';
import { translate } from 'react-i18next';
import { withApollo } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import { Header, Form, Button, Checkbox, Input, Icon, Label, Dropdown } from 'semantic-ui-react';
import FacebookLogin from 'react-facebook-login';
import ReactGA from 'react-ga';
import {Notification} from '../components/Notification/Notification';
import { createUser, loginWithFacebook, loginWithGoogle, loginWithVK } from '../components/Common/meteor-apollo-accounts';
import SEO from '../components/Common/SEO';
import store from '../../../lib/store';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      accepted: true,
      month: '',
      day: '',
      year: '',
      gender: 'male'
    };
    this.register = this.register.bind(this);
  }

  componentWillMount() {
    const day = [];
    const month = [];
    const year = [];
    for (let i = 1; i < 32; i++) {
      const value = {
        value: i,
        text: i
      };
      if (i < 13) {
        month.push(value);
      }
      day.push(value);
    }
    this.setState({day});
    this.setState({month});

    for (let j = 1960; j < 2018; j++) {
      const value = {
        value: j,
        text: j
      };
      year.push(value);
    }
    this.setState({year});
  }

  componentDidMount() {
    const token = store.getItem('Meteor.loginToken') || null;
    if (token) {
      this.props.history.push('/');
    }
  }

  redirectToApp() {
    Notification.success(this.props.t('common:notif.accountCreated'));
    this.props.cookies.set('meteor_login_token', store.getItem('Meteor.loginToken'), { path: '/' });
    this.props.history.push('/?refresh');
    this.props.client.resetStore();
  }

  setBirthDay(e, data) {
    console.log(data.value);
  }

  setBirthMonth(e, data) {
    console.log(data.value);
  }

  setBirthYear(e, data) {
    console.log(data.value);
  }

  getValues() {
    console.log(1111);
  }

  async register(event) {
    event.preventDefault();

    const refToken = store.getItem('Meteor.referralToken') || null;
    const profile = refToken ? { name: refToken } : {}; // hack to pass refID
    const {username, email, password} = this.state;

    if (!this.state.accepted) {
      Notification.warning(this.props.t('common:notif.acceptTerms'));
    }

    try {
      const response = await createUser({ username, email, password, profile }, this.props.client);
      if (response) {
        ReactGA.event({
          category: 'User',
          action: 'RegisterByEmail'
        });
        store.removeItem('Meteor.referralToken');
        this.redirectToApp();
      }
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
        action: 'RegisterByFacebook'
      });
      Notification.success(this.props.t('common:notif.logged'));
      this.redirectToApp();
    } catch (error) {
      Notification.error(error);
    }
  }

  async responseFacebook(response) {
    this.loginFacebook(response);
  }

  // VK Auth
  async loginVK(params) {
    try {
      await loginWithVK(params, this.props.client);
      ReactGA.event({
        category: 'User',
        action: 'RegisterByVK'
      });
      Notification.success(this.props.t('common:notif.logged'));
      this.redirectToApp();
    } catch (error) {
      console.log(error);
      Notification.error(error);
    }
  }

  async responseVK(response) {
    this.loginVK(response);
  }

  async loginGoogle({ accessToken }) {
    try {
      const response = await loginWithGoogle({ accessToken }, this.props.client);
      if (response) {
        ReactGA.event({
          category: 'User',
          action: 'RegisterByGoogle'
        });
        this.redirectToApp();
      }
    } catch (error) {
      Notification.error(error);
    }
  }

  async responseGoogle(response) {
    this.loginGoogle(response);
  }

  render() {
    const { t, showLogin, onClose } = this.props;

    return (
      <div className="auth-page">
        <SEO
          schema="Webpage"
          title={t('seoTitle')}
          description={t('seoDesc')}
          path="/register"
          contentType="product"
        />
        <div className="outer-wrapper">
          <div className="middle">
            <div className="inner">
              <div className="social-login">
                <FacebookLogin
                  cssClass="facebook-login-button"
                  appId="1127643753917982"
                  fields="name,email,picture"
                  scope="public_profile,email"
                  callback={this.responseFacebook.bind(this)}
                  textButton=""
                  icon={<span><Icon name="facebook f" />Sing up with Facebook</span>}
                />
              </div>
              <div className="marginAbove">
                <span className="label">{t('common:or')}</span>
              </div>
              <div className="text-separator" />

              <Form onSubmit={this.register}>
                <h3>
                  Sign up with your e-mail address
                </h3>
                <Form.Field>
                  <Label content="E-mail" className="label" />
                  <Input
                    icon="mail"
                    iconPosition="left"
                    name="email"
                    placeholder={t('common:form.email')}
                    type="email"
                    required="true"
                    value={this.state.email}
                    onChange={(event) => this.setState({ email: event.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <Label content="Confirm E-mail" className="label" />
                  <Input
                    icon="mail"
                    iconPosition="left"
                    name="email"
                    placeholder={t('common:form.email')}
                    type="email"
                    required="true"
                    value={this.state.cemail}
                    onChange={(event) => this.setState({ cemail: event.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <Label content="password" className="label" />
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
                  <Label content="username" className="label" />
                  <Input
                    icon="user"
                    iconPosition="left"
                    name="yourName"
                    placeholder={t('common:form.name')}
                    type="text"
                    required="true"
                    value={this.state.username}
                    onChange={(event) => this.setState({ username: event.target.value })}
                  />
                </Form.Field>
                <Form.Field className="birth-field">
                  <Dropdown
                    onChange={this.setBirthDay}
                    placeholder="Day"
                    search
                    selection
                    options={this.state.day}
                    className="birth-day"
                  />
                  <Dropdown
                    onChange={this.setBirthMonth}
                    placeholder="Month"
                    search
                    selection
                    options={this.state.month}
                    className="birth-day"
                  />
                  <Dropdown
                    onChange={this.setBirthYear}
                    placeholder="Year"
                    search
                    selection
                    options={this.state.year}
                    className="birth-day"
                  />
                </Form.Field>
                <br />
                <Form.Field className="gender">
                  <Checkbox
                    radio
                    value="male"
                    label="male"
                    checked={this.state.gender === 'male'}
                    onChange={() => this.setState({ gender: 'male' })}
                    />
                  <Checkbox
                    radio
                    value="female"
                    label="female"
                    checked={this.state.gender === 'female'}
                    onChange={() => this.setState({ gender: 'female' })}
                    />
                  <Checkbox
                    radio
                    value="non"
                    label="non-binary"
                    checked={this.state.gender === 'non'}
                    onChange={() => this.setState({ gender: 'non' })}
                    />
                </Form.Field>
                <Form.Field className="auth-footer-section">
                  <p className="conditions">
                    By clicking on Sign up, you agree to Casinoff's terms & conditions and privacy policy
                  </p>
                  <Button type="button" className="btn-cancel" onClick={onClose}>{t('common:form.cancel')}</Button>
                  <Button disabled={!this.state.accepted} type="submit" color="green">{t('common:form.signUp_min')}</Button>
                </Form.Field>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate('signup')(withApollo(withRouter(Signup)));
