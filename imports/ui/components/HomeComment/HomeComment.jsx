import React, {Component} from 'react'
import { translate } from 'react-i18next'
import { withCookies } from 'react-cookie'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Menu, Icon, Popup, Label, Button, Grid, List } from 'semantic-ui-react'
import LazyLoad from 'react-lazyload'
import store from '/lib/store'
import ReactGA from 'react-ga'

class HomeComment extends Component {
    render() {
        return(
            <div className="home-comment">
                <div className="top">
                    <Grid className='page' textAlign='center'>
                        <Grid.Column width={5}>
                            <img src="win.png"/>
                            2,457
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <img src="money.png"/>
                            212346
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <img src="play.png"/>
                            147
                        </Grid.Column>  
                    </Grid>
                </div>
                <div className="bottom">
                </div>
                
            </div>
        )
    }
}

export default translate()(HomeComment)