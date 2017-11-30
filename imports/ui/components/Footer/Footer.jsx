import React from 'react'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import { Grid, List, Icon, Button } from 'semantic-ui-react'

const Footer = ({ t, isMobile }) => (
  <div className={isMobile ? 'ui segment inverted footer mobile-footer' : 'ui segment inverted footer'}>
    <Grid className='page' textAlign='center'>
      <Grid.Row className='pages-links'>
        <Grid.Column width={2}>
          <List link inverted>
            <List.Item><Link to='/'>{t('common:footer.home')}</Link></List.Item>
            <List.Item><Link to='/'>{t('common:footer.aboutUs')}</Link></List.Item>
            <List.Item><Link to='/'>{t('common:footer.play')}</Link></List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={2}>
          <List link inverted>
            <List.Item><Link to='/'>{t('common:footer.faq')}</Link></List.Item>
            <List.Item><a href='mailto:info@ryfma.ru'>{t('common:footer.casinoGame')}</a></List.Item>
            <List.Item><Link to='/adv'>{t('common:footer.blog')}</Link></List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={3}>
          <List link inverted>
            <List.Item><Link to='/'>{t('common:footer.workatCasino')}</Link></List.Item>
            <List.Item><a href='mailto:info@ryfma.ru'>{t('common:footer.affiliates')}</a></List.Item>
            <List.Item><Link to='/adv'>{t('common:footer.privacy')}</Link></List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={3}>
          <List link inverted>
            <List.Item><Link to='/'>{t('common:footer.contact')}</Link></List.Item>
            <List.Item><a href='mailto:info@ryfma.ru'>{t('common:footer.termsConditions')}</a></List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={4} className="flag-section">
          <Button><img src="./images/contact.png" /></Button>
          <img src="./images/russia.png" />
          <img src="./images/japan.png" />
          <img src="./images/france.png" />
          <img src="./images/turkey.png" />
          <img src="./images/uk.png" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row textAlign='center' className="social-section">
        <Grid.Column width={7} className="gambling">
          <img src="./images/gam-image.png"/>
          <img src="./images/begamble.png"/>
          <img src="./images/gambling.png"/>
        </Grid.Column>
        <Grid.Column width={7} textAlign='right' className="btn-social">
          <Link to='/'>
            <img src="./images/social.png"/>
          </Link>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className='menu-copyright'>
        <Grid.Column width={4} className='copyright' textAlign='left'>
          <img src="./images/footer-logo.png"/>
        </Grid.Column>
        <Grid.Column width={12} textAlign='right'>
          <p>
            CASINOFF is a company incorporated under the Laws of United Kingdom and Wales with company registration no. C55663, and having its registered address at ‘The Unicorn Centre, Triq l-Uqija, Swieqi, SWQ 2335, London'. <br/>
            Casinoff is licensed and regulated in the United Kingdom. This website provides facilities for gambling to persons in Great Britain in reliance to Gambling Commission Licence Number 000-039265-R-319417-009. Find out more about the UKGC on www.gamblingcommission.gov.uk <br/>
            Games provided by IGT (Alderney 4) Limited and by Jadestone Networks (Malta) Limited are licensed and regulated by the Alderney Gambling Control Commission (AGCC). You may always contact us on hey@casumo.com.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

export default translate()(Footer)
