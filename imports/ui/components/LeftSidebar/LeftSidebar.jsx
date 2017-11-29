import React, {Component} from 'react'
import { translate } from 'react-i18next'
import { withCookies } from 'react-cookie'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Menu, Icon, Popup, Label, Button } from 'semantic-ui-react'
import LazyLoad from 'react-lazyload'
import store from '/lib/store'
import ReactGA from 'react-ga'

class LeftSidebar extends Component {
    render() {
        return(
            <div id="left-sidebar" className="left-sidebar">
                <Link to='/' className='logo' itemProp='url'>
                    <LazyLoad height={60} once placeholder={<div className='ui avatar image img-placeholder' />}>
                        <img src='./leftbar-logo.png' />
                    </LazyLoad>
                </Link>
                <ul>
                    <li>
                        <div className="item">
                            <p>1/2</p>
                            <div className="item-description">
                                <u>wallsie44</u> just won £8 in a choice of 2 numbers, awesome!
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item">
                            <p>1/2</p>
                            <div className="item-description">
                                <u>wallsie44</u> just won £8 in a choice of 2 numbers, awesome!
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item">
                            <p>1/2</p>
                            <div className="item-description">
                                <u>wallsie44</u> just won £8 in a choice of 2 numbers, awesome!
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item">
                            <p>1/2</p>
                            <div className="item-description">
                                <u>wallsie44</u> just won £8 in a choice of 2 numbers, awesome!
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item">
                            <p>1/2</p>
                            <div className="item-description">
                                <u>wallsie44</u> just won £8 in a choice of 2 numbers, awesome!
                            </div>
                        </div>
                    </li>
                    <li>
                        <Button
                            className="btn btn-more"
                            content="see all for today"
                        />
                    </li>
                </ul>
            </div>
        )
    }
}

export default translate()(LeftSidebar)