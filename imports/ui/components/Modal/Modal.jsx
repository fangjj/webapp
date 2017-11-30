import React from 'react';
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import { Header, Form, Button, Input, Icon, Label } from 'semantic-ui-react'

import Login from '../../pages/Login'
import Signup from '../../pages/Signup'
import RecoverPassword from '../../pages/RecoverPassword'

class Modal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showSignupFlag: false,
      showForgotPasswordFlag: false
    }
  }

  showSignup = () => {
    this.setState({ showSignupFlag: !this.state.showSignupFlag })
  }

  hideForgotPassword = () => {
    console.log(1)
    this.setState({ showSignupFlag: false })
    this.setState({ showForgotPasswordFlag: false })
  }

  onClose = () => {
    this.setState({ showSignupFlag: false })
    this.props.onClose()
  }

  showForgotPassword = () => {
    this.setState({ showForgotPasswordFlag: !this.state.showForgotPasswordFlag })
  }

  render() {
    const { showSignupFlag, showForgotPasswordFlag } = this.state

    if(!this.props.show) {
      return null;
    }
    return(
      <div className="custom-modal">
        <div>
          <div className="header">
            <Button onClick={() => this.onClose()}>
              <Icon name='remove' />
            </Button>
          </div>
          {
            showForgotPasswordFlag ? <RecoverPassword showLogin={this.hideForgotPassword}/>
            : showSignupFlag ? <Signup showLogin={this.showSignup}/>
              : <Login showSignup={this.showSignup} showForgotPassword={this.showForgotPassword}/>
          }
          
        </div>
        {
          this.props.show ? <div className="opened-modal"></div>
          : null
        }
        
      </div>
      
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default translate()(Modal)