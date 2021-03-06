import React, {Component} from 'react'
import { translate } from 'react-i18next'
import { withCookies } from 'react-cookie'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Menu, Icon, Popup, Label } from 'semantic-ui-react'
import LazyLoad from 'react-lazyload'
import store from '/lib/store'
import ReactGA from 'react-ga'

import SearchInput from '../Search/SearchInput'
import PublicHeader from './PublicHeader'
import AuthHeader from './AuthHeader'
import { logout } from '../Common/meteor-apollo-accounts'

class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  componentDidMount () {
    const { cookies, authenticated } = this.props
    const cookieAuth = !!cookies.get('meteor_login_token')
    if (!cookieAuth && authenticated) {
      this.logout()
    }
    const homeElem = document.getElementById('home')

    if (this.props.match.path === '/' && homeElem && this.props.isMobile) {
      window.addEventListener('scroll', this.handleScroll)
      const headerElem = document.getElementById('top-header')
      const mobileHeaderElem = document.getElementById('mobile-header')
      headerElem.className = 'ui secondary top-mobile-header clearfix transparent menu'
      mobileHeaderElem.className = 'ui secondary mobile-nav clearfix menu transparent'
    }
  }

  componentWillUnmount () {
    const homeElem = document.getElementById('home')
    if (this.props.match.path === '/' && homeElem && this.props.isMobile) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll = () => {
    if (this.props.match.path === '/') {
      const headerElem = document.getElementById('top-header')
      const mobileHeaderElem = document.getElementById('mobile-header')
      const homeElem = document.getElementById('home')

      const distanceTopHeader = homeElem.clientHeight - window.pageYOffset
      const distanceMobileHeader = mobileHeaderElem.clientHeight - window.pageYOffset

      if (distanceTopHeader <= 0) {
        headerElem.className = 'ui secondary top-mobile-header clearfix menu'
      } else {
        headerElem.className = 'ui secondary top-mobile-header clearfix transparent menu'
      }

      if (distanceMobileHeader <= 0) {
        mobileHeaderElem.className = 'ui secondary mobile-nav clearfix menu'
      } else {
        mobileHeaderElem.className = 'ui secondary mobile-nav clearfix menu transparent'
      }
    }
  }

  async logout () {
    try {
      store.removeItem('Meteor.currUser')
      this.props.cookies.remove('meteor_login_token', { path: '/' })
      await logout(this.props.client)
      ReactGA.event({
        category: 'User',
        action: 'LogOut'
      })
      this.props.history.push('/')
    } catch (error) {
      // Notification.error(error)
    }
  }

  changeLanguage = (lang) => {
    ReactGA.event({
      category: 'User',
      action: 'changeLanguage'
    })
    this.props.i18n.changeLanguage(lang)
  }

  render () {
    const { t, i18n, cookies, authenticated, pathname, currTheme, changeTheme, isMobile, isTablet } = this.props

    const cookieAuth = !!cookies.get('meteor_login_token')
    const authCheck = (authenticated && cookieAuth) || (cookieAuth && this.props.location.search === '?refresh')

    let headerClassName = 'top-header clearfix transparent'
    let menu = isTablet || isMobile ? <ul className='menu-list'>
      <li><Link to='/best'><Icon name='star' />Лучшее</Link></li>
    </ul>
    :
    null

    if (isMobile) {
      headerClassName = 'top-mobile-header clearfix'
    }

    if (isTablet) {
      headerClassName = 'top-header tablet-header clearfix'
    }

    return (
      <Menu id='top-header' className={headerClassName} secondary itemScope itemType='http://www.schema.org/SiteNavigationElement'>
        {(isTablet || isMobile) && <Menu.Item name='menu-item' className='header-block menu-item'>
          <Popup
            className='menu-popup'
            trigger={<div className='menu-toggle'><Icon name='align left' size='large' /></div>}
            content={menu}
            on='click'
            position='bottom center'
            hideOnScroll
          />
        </Menu.Item>
        }        
        {!isTablet && !isMobile && <Menu.Item name='home' itemProp='name'>
          <NavLink className='top-menu-link alignValue' to='/home' itemProp='url'>{t('common:header.home')}</NavLink>
        </Menu.Item>}
        {!isTablet && !isMobile && <Menu.Item name='about' itemProp='name'>
          <NavLink className='top-menu-link' to='/about' itemProp='url'>{t('common:header.aboutUs')}</NavLink>
        </Menu.Item>}
        {!isTablet && !isMobile && <Menu.Item name='bescontactt' itemProp='name'>
          <NavLink className='top-menu-link' to='/contact' itemProp='url'>{t('common:header.contactUs')}</NavLink>
        </Menu.Item>}
        {!isTablet && !isMobile && <Menu.Item name='partner' itemProp='name'>
          <NavLink className='top-menu-link' to='/partner' itemProp='url'>{t('common:header.partners')}</NavLink>
        </Menu.Item>}
        <Menu.Item header className='header-block' itemProp='name'>
          <Link to='/' className='logo' itemProp='url'>
            <img src='./images/logo.png' alt='logo' />
          </Link>
        </Menu.Item>
        <Menu.Menu className='header-block' position='right'>
          {!isMobile && <Menu.Item position='right'>
            { authCheck ? <AuthHeader isTablet={isTablet} cookies={cookies} /> : <PublicHeader t={this.props.t}/>}
          </Menu.Item>}
        </Menu.Menu>
      </Menu>
    )
  }
}

export default translate()(withRouter(withCookies(Header)))
