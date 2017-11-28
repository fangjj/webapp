import React from 'react'
import { translate } from 'react-i18next'
import { withApollo } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import { Header, Form, Button, Checkbox, Input, Icon, Label, Dropdown } from 'semantic-ui-react'
import {Notification} from '../components/Notification/Notification'
import { createUser, loginWithFacebook, loginWithGoogle, loginWithVK } from '../components/Common/meteor-apollo-accounts'
import FacebookLogin from 'react-facebook-login'
import VKLogin from '../components/Common/react-vk-login'
// import GoogleLogin from 'react-google-login';
import SEO from '../components/Common/SEO'
import store from '/lib/store'
import ReactGA from 'react-ga'

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      cmail: '',
      username: '',
      password: '',
      accepted: true,
      month: ''
    }
    this.register = this.register.bind(this)
  }

  componentWillMount () {
    let month = []
    for (let i = 1; i < 32; i++) {
      const value = {
        value: i,
        text: i
      }
      month.push(value)
    }
    this.setState({month: month})
  }

  componentDidMount () {
    const token = store.getItem('Meteor.loginToken') || null
    if (token) {
      this.props.history.push('/')
    }
  }

  redirectToApp = () => {
    Notification.success(this.props.t('common:notif.accountCreated'))
    this.props.cookies.set('meteor_login_token', store.getItem('Meteor.loginToken'), { path: '/' })
    this.props.history.push('/?refresh')
    this.props.client.resetStore()
  }

  selectBirthDay = (e, data) => {
    console.log(data.value)
  }

  getValues () {
    console.log(1111)
  }

  async register (event) {
    event.preventDefault()

    const refToken = store.getItem('Meteor.referralToken') || null
    const profile = refToken ? { name: refToken } : {} // hack to pass refID
    const username = this.state.username
    const email = this.state.email
    const password = this.state.password

    if (!this.state.accepted) {
      Notification.warning(this.props.t('common:notif.acceptTerms'))
    }

    try {
      const response = await createUser({ username, email, password, profile }, this.props.client)
      if (response) {
        ReactGA.event({
          category: 'User',
          action: 'RegisterByEmail'
        })
        store.removeItem('Meteor.referralToken')
        this.redirectToApp()
      }
    } catch (error) {
      Notification.error(error)
    }
  }

  // Facebook Auth
  async loginFacebook ({ accessToken }) {
    try {
      await loginWithFacebook({ accessToken }, this.props.client)
      ReactGA.event({
        category: 'User',
        action: 'RegisterByFacebook'
      })
      Notification.success(this.props.t('common:notif.logged'))
      this.redirectToApp()
    } catch (error) {
      Notification.error(error)
    }
  }

  async responseFacebook (response) {
    this.loginFacebook(response)
  }

  // VK Auth
  async loginVK (params) {
    try {
      await loginWithVK(params, this.props.client)
      ReactGA.event({
        category: 'User',
        action: 'RegisterByVK'
      })
      Notification.success(this.props.t('common:notif.logged'))
      this.redirectToApp()
    } catch (error) {
      console.log(error)
      Notification.error(error)
    }
  }

  async responseVK (response) {
    this.loginVK(response)
  }

  async loginGoogle ({ accessToken }) {
    try {
      const response = await loginWithGoogle({ accessToken }, this.props.client)
      if (response) {
        ReactGA.event({
          category: 'User',
          action: 'RegisterByGoogle'
        })
        this.redirectToApp()
      }
    } catch (error) {
      Notification.error(error)
    }
  }

  async responseGoogle (response) {
    this.loginGoogle(response)
  }

  render () {
    const { t } = this.props
    console.log(this.state.month)
    return (
      <div className='auth-page'>
        <SEO
          schema='Webpage'
          title={t('seoTitle')}
          description={t('seoDesc')}
          path='/register'
          contentType='product'
        />
        <div className='outer-wrapper'>
          <div className='middle'>
            <div className='inner'>
              <div className='social-login'>
                <FacebookLogin
                  cssClass='facebook-login-button'
                  appId='1127643753917982'
                  fields='name,email,picture'
                  scope='public_profile,email'
                  callback={this.responseFacebook.bind(this)}
                  textButton=''
                  icon={<span><Icon name='facebook f' />Sing up with Facebook</span>}
                />
              </div>

              <div className='text-separator'>
                <span className='label'>{t('common:or')}</span>
              </div>

              <Form onSubmit={this.register}>
                <h3>Sign up with your e-mail address</h3>
                <Form.Field>
                  <Label content="E-mail" className="label"/>
                  <Input
                    icon='mail' iconPosition='left'
                    name='email'
                    placeholder={t('common:form.email')}
                    type='email'
                    required='true'
                    value={this.state.email}
                    onChange={(event) => this.setState({ email: event.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <Label content="Confirm E-mail" className="label"/>
                  <Input
                    icon='mail' iconPosition='left'
                    name='cemail'
                    placeholder={t('common:form.email')}
                    type='email'
                    required='true'
                    value={this.state.cemail}
                    onChange={(event) => this.setState({ cemail: event.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <Label content="password" className="label"/>
                  <Input
                    icon='lock' iconPosition='left'
                    name='password'
                    placeholder={t('common:form.password')}
                    type='password'
                    required='true'
                    value={this.state.password}
                    onChange={(event) => this.setState({ password: event.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <Label content="username" className="label"/>
                  <Input
                    icon='user' iconPosition='left'
                    name='yourName'
                    placeholder={t('common:form.name')}
                    type='text'
                    required='true'
                    value={this.state.username}
                    onChange={(event) => this.setState({ username: event.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <Dropdown 
                    onChange = {this.selectBirthDay}
                    placeholder='State'
                    search selection options={this.state.month}
                    className="birth-day"
                  />
                  <Dropdown 
                    onChange = {this.selectBirthDay}
                    placeholder='State'
                    search selection options={this.state.month}
                    className="birth-day"
                  />
                  <Dropdown 
                    onChange = {this.selectBirthDay}
                    placeholder='State'
                    search selection options={this.state.month}
                    className="birth-day"
                  />
                </Form.Field>
                <br />
                <Form.Field>
                  <Checkbox
                    checked={this.state.accepted}
                    label={<label>{t('haveToRead')} <Link to='/terms'>{t('terms')}</Link></label>}
                    onChange={() => this.setState({ accepted: !this.state.accepted })}
                  />
                </Form.Field>
                <Button disabled={!this.state.accepted} type='submit' color='green' className='fullwidth-button'>{t('common:form.createAccount')}</Button>
                <div className='auth-footer text-center'>
                  <div>{t('alreadyAMember')} <Link to='/login'>{t('common:form.signIn')}</Link></div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default translate('signup')(withApollo(withRouter(Signup)))
