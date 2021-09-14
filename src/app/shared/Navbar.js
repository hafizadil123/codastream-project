import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import ModalContext from "../shared/context";
import { useAuth0 } from '@auth0/auth0-react';

export default function Navbar() {
  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  const saveProfile = (profile) => {

    localStorage.setItem('profile', JSON.stringify(profile));
    // context.handleIsAuthenticated(true);
    return true;
  }
  const removeCache = () => {
    localStorage.removeItem('profile');
    localStorage.removeItem('songs');
    localStorage.removeItem('library');
    return true;
  }
    const { loginWithRedirect, isAuthenticated, user, logout  } = useAuth0();
    return (
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/s"><span style={{color: 'white'}}>Codastreams</span></Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button className="navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav w-100">
            <ModalContext.Consumer>
              {({ handleSearch }) => (
                <li className="nav-item w-100">
              <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                <input type="text" className="form-control" placeholder="Search Music ..." onChange={(e) => handleSearch(e.target.value)} />
              </form>
            </li>
              )}
            
            </ModalContext.Consumer>
           
          </ul>
          <ul className="navbar-nav navbar-nav-right">
         
            {!isAuthenticated && <div onClick={() => loginWithRedirect()}><Link to="" style={{color: 'white'}}>Login</Link></div> }
            {console.log('Login', isAuthenticated, user)}
            {isAuthenticated && saveProfile(user) && <Dropdown alignRight as="li" className="nav-item">
              <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret">
                <div className="navbar-profile">
                  <img className="img-xs rounded-circle" src={user.picture} alt="profile" />
                  <p className="mb-0 d-none d-sm-block navbar-profile-name"><Trans>{user.name}</Trans></p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
          
                <Dropdown.Divider />
      
                 <Dropdown.Item href="!#" onClick={evt =>evt.preventDefault()}  className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content" onClick = {() => removeCache() && logout() }>
                    <p className="preview-subject mb-1"><Trans>Log Out</Trans></p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
              </Dropdown.Menu>
            </Dropdown>
          }
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    );
  }  


