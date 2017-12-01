import React, {Component} from 'react'
import { translate } from 'react-i18next'
import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { Container, Grid, Header, Button } from 'semantic-ui-react'

import HomeComment from '../components/HomeComment/HomeComment'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'
import Sidebar from '../components/Sidebar/Sidebar'
import PostsList from '../components/Posts/PostsList'
import SEO from '../components/Common/SEO'
import { isMobile } from '../../../lib/utils/deviceDetect'

import Modal from '../components/Modal/Modal'

class Home extends Component {
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
    this.setState({type: 'signup'})
  
  }

  render() {
    const { t, staticContext, cookies } = this.props
    const authenticated = typeof window !== 'undefined' ? !!cookies.get('meteor_login_token') : staticContext.authenticated
    const checkMobile = typeof window !== 'undefined' ? isMobile() : staticContext.isMobile
  
    return (
      <div id='home'>
        <SEO
          schema='WebPage'
          title={t('common:home.seoTitle')}
          description={t('common:home.seoDesc')}
          path='/'
          contentType='website'
        />
        <div className='ui segment masthead'>
          <div className='inner'>
            <LeftSidebar />
            <div className="main-content">
              <div className="start">
                <Button className='signup-button' onClick={() => this.toogleModal()} >
                  <img className="img-start" src="./images/start.png" />
                </Button>
                <p className="start-header">Choose a number and win.<br/> As simple as that!</p>
                <p className="start-description">Here, at Casinoff we believe that the game should be as easy, fair and simple as it could be. This is why we care about your experience and service provided to you throughout your visit. We are human beings, but more importantly enthusiasts, just like you. We believe that's necessary in order to understand and solve your needs as quickly and easily as possible.</p>
              </div>
              <img className="free" src="./images/free.png" />
            </div>
          </div>
          <HomeComment/>
        </div>
        <Modal
          show={this.state.isOpen}
          onClose={this.toogleModal}
          type={this.state.type}>         
        </Modal>
      </div>
    )
  }


}

export default translate()(withCookies(Home))
