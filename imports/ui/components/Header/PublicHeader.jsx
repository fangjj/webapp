import React, {Component} from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import {  Button, Icon } from 'semantic-ui-react'

import Modal from '../Modal/Modal'

class PublicHeader extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      type: ''
    }
  }

  toogleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.setState({type: ''})

  }

  signup = () => {
    this.setState({type: 'signup'})
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { t } = this.props

    return(
      <div className="auth-section">
        <Button className='login-button' onClick={() => this.toogleModal()} ><Icon name="sign in"/>{t('common:form.login')}</Button>
        <Button className='signup-button' onClick={() => this.signup()} ><Icon name="lock" />{t('common:form.signUp')}</Button>
        <Modal
          show={this.state.isOpen}
          onClose={this.toogleModal}
          type={this.state.type}>         
        </Modal>
      </div>
    )
  }
}

export default translate()(PublicHeader)
