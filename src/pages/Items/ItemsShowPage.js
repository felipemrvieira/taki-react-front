import React, { Component } from 'react';
import '../pages.scss';
import Sidebar from '../../template/Sidebar';
import Topbar from '../../template/Topbar';
import Footer from '../../template/Footer';
import LogoutModal from '../../template/LogoutModal';
import Item from '../../components/item/Item'

class ItemsShowPage extends Component {

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
                                    <h1 className="h3 mb-4 text-gray-800">Item {this.props.match.params.id} </h1>
                                    <Item idItem={this.props.match.params.id} />

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

export default ItemsShowPage;
