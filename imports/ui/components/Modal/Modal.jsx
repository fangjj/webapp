import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { Header, Form, Button, Input, Icon, Label } from 'semantic-ui-react';

import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import RecoverPassword from '../../pages/RecoverPassword';

class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSignupFlag: false,
      showForgotPasswordFlag: false
    };
    this.onClose = this.onClose.bind(this);
    this.showSignup = this.showSignup.bind(this);
    this.showForgotPassword = this.showForgotPassword.bind(this);
    this.hideForgotPassword = this.hideForgotPassword.bind(this);
  }

  showSignup() {
    this.setState({ showSignupFlag: !this.state.showSignupFlag});
  }
  showLogin() {
    this.setState({ showSignupFlag: false});
  }

  hideForgotPassword() {
    console.log(1);
    this.setState({ showSignupFlag: false });
    this.setState({ showForgotPasswordFlag: false });
  }

  onClose() {
    this.setState({ showSignupFlag: false });
    this.setState({ showForgotPasswordFlag: false });
    this.props.onClose();
  }

  showForgotPassword() {
    this.setState({ showForgotPasswordFlag: !this.state.showForgotPasswordFlag });
  }

  render() {
    const { showSignupFlag, showForgotPasswordFlag } = this.state;
    const { type } = this.props;

    let flag = '';
    if (type === 'signup' && showSignupFlag === false) {
      flag = true;
    }
    if (type === 'signup' && showSignupFlag) {
      flag = false;
    }
    if (type !== 'signup' && showSignupFlag) {
      flag = true;
    }

    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <div>
          {
            this.props.show ? <div className="opened-modal" onClick={this.onClose} />
            : null
          }
        </div>
        
        <div className="custom-modal">
        <div style={{ position: 'absolute', top: 0, right: -45 }}>
          <img className="img-close" width="25" height="25" src="./images/close_button.png" alt="close" onClick={this.onClose} />
        </div>
          {
            showForgotPasswordFlag ? <RecoverPassword showLogin={this.hideForgotPassword} onClose={this.onClose} />
            : flag ? <Signup showLogin={this.showSignup} onClose={this.onClose} />
              : <Login showSignup={this.showSignup} showForgotPassword={this.showForgotPassword} onClose={this.onClose} />
          }
        </div>

      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default translate()(Modal);
