import React, {Component} from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import {  Button } from 'semantic-ui-react'

import Modal from '../Modal/Modal'

class PublicHeader extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toogleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { t } = this.props

    return(
      <div>
        <Button className='ui primary button login-button' onClick={() => this.toogleModal()} >{t('common:form.login')}</Button>
        <Modal show={this.state.isOpen}
          onClose={this.toogleModal}>         
        </Modal>
      </div>
    )
  }
}

export default translate()(PublicHeader)
