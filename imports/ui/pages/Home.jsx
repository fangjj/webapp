import React from 'react'
import { translate } from 'react-i18next'
import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { Container, Grid, Header } from 'semantic-ui-react'

import HomeComment from '../components/HomeComment/HomeComment'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'
import Sidebar from '../components/Sidebar/Sidebar'
import PostsList from '../components/Posts/PostsList'
import SEO from '../components/Common/SEO'
import { isMobile } from '../../../lib/utils/deviceDetect'

const Home = ({ t, staticContext, cookies }) => {
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
        <div className='outer'>
          <div className='middle'>
            <div className='inner'>
              <LeftSidebar />
              <div className="main-content">
                <div className="start">
                  <img className="img-start" src="./images/start.png" />
                  <h2>Choose a number and win.<br/> As simple as that!</h2>
                  <p className="start-description">Here, at Casinoff we believe that the game should be as easy, fair and simple as it could be. This is why we care about your experience and service provided to you throughout your visit. We are human beings, but more importantly enthusiasts, just like you. We believe that's necessary in order to understand and solve your needs as quickly and easily as possible.</p>
                </div>
                <img className="free" src="./images/free.png" />
              </div>
            </div>
            <HomeComment/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default translate()(withCookies(Home))
