import React, { Component } from 'react';
import '../pages.scss';
import api from "../../services/api";
import axios from "axios";

import Sidebar from '../../template/Sidebar';
import Topbar from '../../template/Topbar';
import Footer from '../../template/Footer';
import LogoutModal from '../../template/LogoutModal';

import BusinessTable from '../../components/business/BusinessTable';

class BusinessPage extends Component {
  constructor(props) {
    super(props)
    this.state = { businesses: [] }
    this.loadBusinesses()
  }

  loadBusinesses = async () => {
    try {
      const response = await api.get("/businesses");
      this.setState({ ...this.state, businesses: response.data })
    } catch (err) {
      console.log(err);
    }
  }

  render() {

    return (
      <div className="App">
        <div id="page-top">
          {/* <!-- Page Wrapper  --> */}
          <div id="wrapper">
            <Sidebar />
            {/* <!--  Content Wrapper  --> */}
            <div id="content-wrapper" className="d-flex flex-column">

              {/* <!--  Main Content  --> */}
              <div id="content">
                <Topbar />
                {/* <!--  Begin Page Content  --> */}
                <div className="container-fluid">

                  {/* <!--  Page Heading  --> */}
                  <h1 className="h3 mb-4 text-gray-800">Businesses</h1>
                  <BusinessTable businesses={this.state.businesses} />

                </div>
                {/*  /.container-fluid  */}

              </div>
              {/* End of Main Content */}

              <Footer />

            </div>
            {/* <!--  End of Content Wrapper  --> */}

          </div>
          {/* <!--  End of Page Wrapper  --> */}

          {/* <!--  Scroll to Top Button --> */}
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
          <LogoutModal />
        </div>
      </div>
    );
  }
}

export default BusinessPage;
