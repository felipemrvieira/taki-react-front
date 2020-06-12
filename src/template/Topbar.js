import React, { Component } from 'react';
import api from "../services/api";
import User from './images/user-icon.png'

const divStyle = {
    justifyContent: 'center',
    fontSize: '25px'
};

class Topbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }




    render () {


        return (
            // {/* <!--  Topbar  --> */ }
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow" >

                {/* <!--  Sidebar Toggle (Topbar)  --> */}
                < button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" >
                    <i className="fa fa-bars"></i>
                </button >
                <div className="input-group" style={divStyle}>
                  Desafio - @felipemrvieira
                </div>

                {/* <!--  Topbar Navbar  --> */}
                < ul className="navbar-nav ml-auto" >


                    <div className="topbar-divider d-none d-sm-block"></div>

                    {/* <!--  Nav Item - User Information  --> */}
                    <li className="nav-item dropdown no-arrow">
                        <div className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Taki</span>
                            <img className="img-profile rounded-circle"
                                src={"avatar"} alt="Menu" />
                        </div>
                        {/* <!--  Dropdown - User Information  --> */}
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <div className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Sair
                            </div>
                        </div>
                    </li>

                </ul >

            </nav >
            // {/* <!--  End of Topbar  --> */ }

        );
    }
}

export default Topbar;
