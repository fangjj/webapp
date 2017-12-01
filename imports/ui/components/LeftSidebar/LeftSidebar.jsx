import React, {Component} from 'react';
import { translate } from 'react-i18next';
import { withCookies } from 'react-cookie';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Menu, Icon, Popup, Label, Button } from 'semantic-ui-react';
import ReactGA from 'react-ga';
import LazyLoad from 'react-lazyload';
import store from '../../../../lib/store';

class LeftSidebar extends Component {
  render() {
    return (
      <div id="left-sidebar" className="left-sidebar">
        <Link to="/" className="logo" itemProp="url">
          <LazyLoad height={60} once placeholder={<div className="ui avatar image img-placeholder" />}>
            <img src="./images/leftbar-logo.png" alt="logo" />
          </LazyLoad>
        </Link>
        <ul>
          <li>
            <div className="item">
              <p className="item-1">1/2</p>
              <div className="item-description">
                <u>wallsie44</u> just won £8 in a choice of 2 numbers, awesome!
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <p className="item-4">1/4</p>
              <div className="item-description">
                <u>wallsie44</u> just won £8 in a choice of 2 numbers, awesome!
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <p className="item-1">1/2</p>
              <div className="item-description">
                <u>wallsie44</u> just won £8 in a choice of 2 numbers, awesome!
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <p className="item-10">1/10</p>
              <div className="item-description">
                <u>wallsie44</u> just won £8 in a choice of 2 numbers, awesome!
              </div>
            </div>
          </li>
          <li>
            <div className="item">
              <p className="item-10">1/10</p>
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
    );
  }
}

export default translate()(LeftSidebar);
