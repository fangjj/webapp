import React from 'react';
import { translate } from 'react-i18next';
import { withApollo } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import { Header, Form, Button, Input } from 'semantic-ui-react';
import ReactGA from 'react-ga';
import {Notification} from '../components/Notification/Notification';
import { resetPassword, forgotPassword } from '../components/Common/meteor-apollo-accounts';
import SEO from '../components/Common/SEO';

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      newPassword: '',
      repeatPassword: ''
    };
    this.reset = this.reset.bind(this);
    this.forgot = this.forgot.bind(this);
  }

  async reset(event) {
    event.preventDefault();

    const { newPassword, repeatPassword } = this.state;
    const { token } = this.props.match.params;

    if (newPassword === repeatPassword) {
      try {
        await resetPassword({ newPassword, token }, this.props.client);
        Notification.success('Password changed!');
        ReactGA.event({
          category: 'User',
          action: 'resetPassword'
        });
        this.props.history.push('/?refresh');
      } catch (error) {
        Notification.error(error);
        // this.props.history.push('/recover-password');
      }
    } else {
      Notification.error('Passwords do not match.');
    }
  }

  async forgot(event) {
    event.preventDefault();

    const { email } = this.state;

    try {
      await forgotPassword({ email }, this.props.client);
      ReactGA.event({
        category: 'User',
        action: 'ForgotPassword'
      });
      Notification.success('Email sent!');
    } catch (error) {
      Notification.error(error);
    }
  }

  render() {
    const { token } = this.props.match.params;
    const { t, showLogin, onClose } = this.props;
    return token
      ? (
        <div className="auth-page">
          <SEO
            schema="Webpage"
            title={t('seoResetTitle')}
            description={t('seoResetDesc')}
            path="/"
            contentType="product"
          />
          <div className="outer-wrapper">
            <div className="middle">
              <div className="inner">
                <Header as="h1">{t('headerReset')}</Header>
                <Header.Subheader>
                  {t('subheaderReset')}
                </Header.Subheader>
                <br />
                <Form onSubmit={this.reset}>
                  <Form.Field>
                    <input
                      name="newPassword"
                      placeholder={t('common:form.newPassword')}
                      type="password"
                      required="true"
                      value={this.state.password}
                      onChange={(event) => this.setState({ newPassword: event.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <input
                      name="repeatPassword"
                      placeholder={t('common:form.confirmPassword')}
                      type="password"
                      required="true"
                      value={this.state.password}
                      onChange={(event) => this.setState({ repeatPassword: event.target.value })}
                    />
                  </Form.Field>
                  <Button type="submit" color="green" className="fullwidth-button">{t('common:form.savePassword')}</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )
      : (
        <div className="auth-page">
          <SEO
            schema="Webpage"
            title={t('seoResetTitle')}
            description={t('seoResetDesc')}
            path="/"
            contentType="product"
          />
          <div className="outer-wrapper">
            <div className="middle">
              <div className="inner">
                <h3>{t('headerRecover')}</h3>
                <p>{t('subheaderRecover')}</p>
                <br />
                <Form onSubmit={this.forgot}>
                  <Form.Field>
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
                  <Form.Field className="auth-footer-section">
                    <div>{t('common:form.rememberPassword')} <u onClick={showLogin}>{t('common:form.signIn')}</u></div>
                    <div>
                      <Button type="submit" className="btn-cancel" onClick={onClose}>{t('common:form.cancel')}</Button>
                      <Button type="submit" color="green">{t('common:form.sendInstructions')}</Button>
                    </div>
                  </Form.Field>
                </Form>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default translate('recover')(withApollo(withRouter(RecoverPassword)));
