import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from "react-jvectormap"
import ScrollDialog  from '../shared/Modal';
import ModalContext from '../shared/context';
import { COOKIE_TITLE_MODAL, COOKIE_TEXT_MODAL, PRIVACY_TITLE_MODAL, PRIVACY_TEXT_MODAL } from '../../constant';

const mapData = {
  "BZ": 75.00,
  "US": 56.25,
  "AU": 15.45,
  "GB": 25.00,
  "RO": 10.25,
  "GE": 33.25
}

export class Dashboard extends Component {

  transactionHistoryData =  {
    labels: ["Paypal", "Stripe","Cash"],
    datasets: [{
        data: [55, 25, 20],
        backgroundColor: [
          "#111111","#00d25b","#ffab00"
        ]
      }
    ]
  };

  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
          borderWidth: 0
      }
    },      
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    }
  }

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  toggleProBanner() {
    document.querySelector('.proBanner').classList.toggle("hide");
  }
  handleClose = (value) => {
    return <ModalContext.Consumer>
    { 
     (context) => console.log('handleToggleShow', value, context)
    }
  </ModalContext.Consumer>
  }

  redirectToDetailPage =(type) => {
    const { history } = this.props;
    history.push(`/dashboard/detail-page?type=${type}`)
  } 
  render () {
    return (
      <div>
        <ModalContext.Consumer>
          {
            ({ show, modalType, handleToggleShow }) => {
              if(modalType === "cookie") {
                return <ScrollDialog show={show} title={COOKIE_TITLE_MODAL} text={COOKIE_TEXT_MODAL} type="text" onCloseHandle={(value) => handleToggleShow(value, 'cookie')} />
              } else if(modalType === "privacy") {
                return <ScrollDialog show={show} title={PRIVACY_TITLE_MODAL} text={PRIVACY_TEXT_MODAL} type="text" onCloseHandle={(value) => handleToggleShow(value, 'privacy')} />
              } else if(modalType === "create-playlist") {
                return <ScrollDialog show={show} title={PRIVACY_TITLE_MODAL} text={PRIVACY_TEXT_MODAL} type="play-list" onCloseHandle={(value) =>handleToggleShow(value, 'create-playlist')} />
              }
             return null;
             
            }
          }
        </ModalContext.Consumer>
        <div className="row">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card" onClick={() =>this.redirectToDetailPage('hiphop')}>
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">Hip Hop</h3>
                      <p className="text-success ml-2 mb-0 font-weight-medium">Music</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal"></h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card" onClick={() =>this.redirectToDetailPage('modern')}>
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">Modern</h3>
                      <p className="text-warning ml-2 mb-0 font-weight-medium">Music</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-warning">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal"></h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card" onClick={() =>this.redirectToDetailPage('music')}>
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">Classical</h3>
                      <p className="text-success ml-2 mb-0 font-weight-medium">Music</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal"></h6>
              </div>
            </div>
          </div>
   
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">Latest</h3>
                      <p className="text-success ml-2 mb-0 font-weight-medium">Music</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal"></h6>
              </div>
            </div>
          </div>
        </div>
    
        </div>
    );
  }
}

export default Dashboard;