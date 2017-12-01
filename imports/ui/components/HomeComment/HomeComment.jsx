import React, {Component} from 'react';
import { translate } from 'react-i18next';
import { withCookies } from 'react-cookie';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Menu, Icon, Popup, Label, Button, Grid, List } from 'semantic-ui-react';
import ReactGA from 'react-ga';
import LazyLoad from 'react-lazyload';
import store from '../../../../lib/store';

class HomeComment extends Component {
  render() {
    return (
      <div className="home-comment">
        <div className="top">
          <Grid className="page" textAlign="center">
            <Grid.Column width={5}>
              <img src="./images/win.png" alt="win" />
              <div className="bet-detail">
                <p className="number">2,457</p>
                <p className="people">People became happier today</p>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <img src="./images/money.png" alt="money" />
              <div className="bet-detail">
                <p className="number">2,457</p>
                <p className="people">Money bet in total</p>
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <img src="./images/play.png" alt="play" />
              <div className="bet-detail">
                <p className="number">1,487</p>
                <p className="people">playing right now</p>
              </div>
            </Grid.Column>
          </Grid>
        </div>
        <div className="bottom">
          <Grid>
            <Grid.Column width={8} className="left">
              <img src="./images/hart.png" alt="hart" />
              <div className="bet-detail">
                <p className="number">We want nothing from you!</p>
                <p className="people">
                    Casinoff is a fully non-profit project. Yes, the project is completely charitable and is directed on drawing attention to gambling and the social problems associated with it.
                    The money received, in full, is completely used for supporting charitable funds and platforms to help people with addiction to gambling.
                    You can even claim the money back through National Gambling association, unless you want to help society with resolving one of the major issues.
                </p>
                <Button>learn more about this</Button>
              </div>
            </Grid.Column>
            <Grid.Column width={8} className="right">
              <img src="./images/computer.png" alt="computer" />
              <div className="bet-detail">
                <p className="number">
                  Use Casinoff games on mobile, tablet, Mac or PC.
                </p>
                <ul>
                  <li><Icon name="checkmark" />100% secure payments</li>
                  <li><Icon name="checkmark" />Fast withdrawals without hassle</li>
                  <li><Icon name="checkmark" />Fast multilingual support</li>
                  <li><Icon name="checkmark" />New promotions each week</li>
                </ul>
              </div>
              <div className="card" >
                <img src="./images/card.png" alt="card" />
                <a>All payment methods</a>
              </div>
            </Grid.Column>
          </Grid>
        </div>

      </div>
    );
  }
}

export default translate()(HomeComment);
