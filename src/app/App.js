import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import { withTranslation } from "react-i18next";
import { Provider } from './shared/context';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modalType: '',
      search: '',
    }
  }
  componentDidMount() {
    this.onRouteChanged();
  }
  
  handleToggleShow = (value, type) => {
    console.log('update', value, type);
    this.setState({ show: value, modalType: type });
  }
  handleSearch = (value) => {
    this.setState({search: value})
  }
  render () {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    const updateContext = {
      show: this.state.show,
      handleToggleShow: this.handleToggleShow,
      modalType: this.state.modalType,
      handleSearch: this.handleSearch,
      search: this.state.search
    };

    return (
      <Provider value={updateContext}>
        <div className="container-scroller">
          {sidebarComponent}
          <div className="container-fluid page-body-wrapper">
            {navbarComponent}
            <div className="main-panel">
              <div className="content-wrapper">
                <AppRoutes />
              </div>
              {footerComponent}
            </div>
          </div>
        </div>
      </Provider>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    const { i18n } = this.props;
    const body = document.querySelector('body');
    if(this.props.location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
      i18n.changeLanguage('ar');
    }
    else {
      body.classList.remove('rtl')
      i18n.changeLanguage('en');
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/user-pages/forgot-password-1','/user-pages/update-password-1','/user-pages/login-1', '/user-pages/login-2', '/user-pages/register-1', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }

}

export default withTranslation()(withRouter(App));
