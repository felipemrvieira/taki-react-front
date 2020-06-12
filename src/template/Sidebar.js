import React from 'react';
import { Link } from 'react-router-dom'

function Sidebar() {
  return (

    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      {/* <!--  Sidebar - Brand  --> */}
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to={"/news"}>
        <div className="sidebar-brand-icon">
        </div>
        <div className="sidebar-brand-full mx-3">
          {/* <img src={Logo} alt="logo completa" /> */}
          <h1>TAKI</h1>
        </div>
      </Link>


      {/* <!--  Divider  --> */}
      <hr className="sidebar-divider" />

      {/* <!--  Heading  --> */}
      <div className="sidebar-heading">
        Businesses
      </div>

      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseNotice" aria-expanded="true" aria-controls="collapseNotice">
          <i className="fas fa-fw fa-cog"></i>
          <span>Businesses</span>
        </div>
        <div id="collapseNotice" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Options:</h6>
            <Link className="collapse-item" to={"/businesses"}>List Businesses</Link>
            <Link className="collapse-item" to={"/businesses/new"}>Create Business</Link>
          </div>
        </div>
      </li>


      <hr className="sidebar-divider d-none d-md-block" />

    </ul>
    //   {/* <!--  End of Sidebar  --> */}


  );
}

export default Sidebar;
