import React from 'react';
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import { Header, Form, Button, Input, Icon, Label } from 'semantic-ui-react'
import Login from '../../pages/Login'

class Modal extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    if(!this.props.show) {
      return null;
    }
    return(
      <div className="custom-modal">
        <div>
          <div className="header">
            <Button onClick={() => this.props.onClose()}>
              <Icon name='remove' />
            </Button>
          </div>
          <Login/>
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