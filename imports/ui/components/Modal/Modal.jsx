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

      <div className="custom-modal">
        {
          showForgotPasswordFlag ? <RecoverPassword showLogin={this.hideForgotPassword} onClose={this.onClose} />
          : flag ? <Signup showLogin={this.showSignup} onClose={this.onClose} />
            : <Login showSignup={this.showSignup} showForgotPassword={this.showForgotPassword} onClose={this.onClose} />
        }

        {
          this.props.show ? <div className="opened-modal" />
          : null
        }

      </div>

    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default translate()(Modal);
