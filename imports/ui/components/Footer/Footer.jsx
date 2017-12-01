import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Grid, List, Icon, Button } from 'semantic-ui-react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');
const OKIcon = generateShareIcon('ok');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');
const RedditIcon = generateShareIcon('reddit');
const TumblrIcon = generateShareIcon('tumblr');
const EmailIcon = generateShareIcon('email');

const shareUrl = 'http://github.com';
const title = 'GitHub';

const Footer = ({ t, isMobile }) => (
  <div className={isMobile ? 'ui segment inverted footer mobile-footer' : 'ui segment inverted footer'}>
    <Grid className="page" textAlign="center">
      <Grid.Row className="pages-links">
        <Grid.Column width={2}>
          <List link inverted>
            <List.Item><Link to="/">{t('common:footer.home')}</Link></List.Item>
            <List.Item><Link to="/">{t('common:footer.aboutUs')}</Link></List.Item>
            <List.Item><Link to="/">{t('common:footer.play')}</Link></List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={2}>
          <List link inverted>
            <List.Item><Link to="/">{t('common:footer.faq')}</Link></List.Item>
            <List.Item><Link to="/">{t('common:footer.casinoGame')}</Link></List.Item>
            <List.Item><Link to="/">{t('common:footer.blog')}</Link></List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={2}>
          <List link inverted>
            <List.Item><Link to="/">{t('common:footer.workatCasino')}</Link></List.Item>
            <List.Item><Link to="/">{t('common:footer.affiliates')}</Link></List.Item>
            <List.Item><Link to="/">{t('common:footer.privacy')}</Link></List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={2}>
          <List link inverted>
            <List.Item><Link to="/">{t('common:footer.contact')}</Link></List.Item>
            <List.Item><Link to="/">{t('common:footer.termsConditions')}</Link></List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={8} textAlign="right">
          <Button><img src="./images/contact.png" alt="country" /></Button>
          <img src="./images/russia.png" className="image-padding" alt="country" />
          <img src="./images/japan.png" className="image-padding" alt="country" />
          <img src="./images/france.png" className="image-padding" alt="country" />
          <img src="./images/turkey.png" className="image-padding" alt="country" />
          <img src="./images/uk.png" className="image-padding" alt="country" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="social-section">
        <Grid.Column width={8} className="gambling">
          <img src="./images/gam-image.png" alt="country" />
          <img src="./images/begamble.png" alt="country" />
          <img src="./images/gambling.png" alt="country" />
        </Grid.Column>
        <Grid.Column width={8} textAlign="right" className="btn-social">
          <div className="btn-social-groups">
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className="share-button">
              <FacebookIcon
                size={45}
                round />
            </FacebookShareButton>

            <TelegramShareButton
              url={shareUrl}
              title={title}
              className="share-button">
              <TelegramIcon size={45} round />
            </TelegramShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={title}
              className="share-button">
              <TwitterIcon
                size={45}
                round />
            </TwitterShareButton>

            <LinkedinShareButton
              url={shareUrl}
              title={title}
              className="share-button">
              <LinkedinIcon
                size={45}
                round />
            </LinkedinShareButton>

            <VKShareButton
              url={shareUrl}>
              <VKIcon
                size={45}
                round />
            </VKShareButton>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="menu-copyright">
        <Grid.Column width={4} className="copyright" textAlign="center">
          <img src="./images/footer-logo.png" alt="country" />
        </Grid.Column>
        <Grid.Column width={12} textAlign="right">
          <p>
            CASINOFF is a company incorporated under the Laws of United Kingdom and Wales with company registration no. C55663, and having its registered address at ‘The Unicorn Centre, Triq l-Uqija, Swieqi, SWQ 2335, London'. <br /><br />
            Casinoff is licensed and regulated in the United Kingdom. This website provides facilities for gambling to persons in Great Britain in reliance to Gambling Commission Licence Number 000-039265-R-319417-009. Find out more about the UKGC on <a href="http://www.gamblingcommission.gov.uk" target="_blank">www.gamblingcommission.gov.uk</a> <br /><br />
            Games provided by IGT (Alderney 4) Limited and by Jadestone Networks (Malta) Limited are licensed and regulated by the Alderney Gambling Control Commission (AGCC). You may always contact us on <a href="#">hey@casumo.com</a>.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default translate()(Footer);
