import React, { Component } from 'react';
import ScrollDialog  from '../shared/Modal';
import ModalContext from '../shared/context';
import { COOKIE_TITLE_MODAL, COOKIE_TEXT_MODAL, PRIVACY_TITLE_MODAL, PRIVACY_TEXT_MODAL } from '../../constant';
import { getContentfulData } from '../../utils/index';
export class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    this.entryId = 'mainPage';
    this.state = {
      data: null,
    }
  }
  async componentDidMount() {
    const data = await getContentfulData(this.entryId);
    this.setState({data: data[0].fields.category || []});
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
    const { data } = this.state;
    let songsArray = [];
    const filterSongs = data?.map(item => {
     return  item.fields?.songs?.filter(item => songsArray.push(item.fields));
    });
    return (
      <div>
        <ModalContext.Consumer>
          {
            ({ show, modalType, handleToggleShow }) => {
              if(modalType === "cookie") {
                return <ScrollDialog show={show} title={COOKIE_TITLE_MODAL} text={COOKIE_TEXT_MODAL} type="text" onCloseHandle={(value) => handleToggleShow(value, 'cookie')} data={songsArray} history={this.props.history}/>
              } else if(modalType === "privacy") {
                return <ScrollDialog show={show} title={PRIVACY_TITLE_MODAL} text={PRIVACY_TEXT_MODAL} type="text" onCloseHandle={(value) => handleToggleShow(value, 'privacy')} data={songsArray} history={this.props.history} />
              } else if(modalType === "create-playlist") {
                return <ScrollDialog show={show} title={PRIVACY_TITLE_MODAL} text={PRIVACY_TEXT_MODAL} type="play-list" onCloseHandle={(value) =>handleToggleShow(value, 'create-playlist')} data={songsArray} history={this.props.history} />
              }
             return null;
             
            }
          }
        </ModalContext.Consumer>
        <div className="row">
          {data && data.length > 0 && data.map(item => (
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card" key={Math.random()}>
              <div className="card" onClick={() => this.redirectToDetailPage(item?.fields?.slug)}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h3 className="mb-0">{item?.fields?.name}</h3>
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
          ))}
         
        </div>
    
        </div>
    );
  }
}

export default Dashboard;