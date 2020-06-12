import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

const divStyle = {
  textAlign: 'center',
  margin: '10px',
  paddingBottom: '10px',
  fontWeight: 'bold',
  fontSize: '18px',
};
const divImgStyle = {
  textAlign: 'center',
  height: '280px',
  alignItemsCenter: 'center',
  paddingBottom: '5px',
};


class Business extends Component {
  constructor(props) {
    super(props)
    this.state = {
      business: {
      },
      redirect: false,
      show: false,
      setShow: false
    }

  }

  loadBusiness = async () => {
    try {
      const response = await api.get(`businesses/${this.props.idBusiness}`);
      const business = response.data;
      console.log(business)
      this.setState({ business });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.loadBusiness();
  }

  deleteBusiness = async (business) => {
    try {
      if (window.confirm(`Are you sure?`)) {
        const response = await api.delete(`businesses/${this.props.idBusiness}`);
        this.setState({ ...this.state, business: response.data })
        this.setState({
          redirect: true
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  renderCategories = () => {
    const { categories } = this.state.article || [{ id: 1, title: "titulo" }];
    return categories.map(category => (
      <div key={category.id} className="col-xl-4 col-md-4 mb-4 ">
        <div className="card border-left-primary shadow  h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {category.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  renderTypes = () => {
    const { types } = this.state.article || [{ id: 1, title: "titulo" }];
    return types.map(type => (
      <div key={type.id} className="col-xl-3 col-md-3 mb-3 ">
        <div className="card shadow  h-80 py-1">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {type.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  renderImages = () => {

    const galleries =this.state.article.galleries || []

    galleries.sort((a,b) => b.id - a.id)

    console.log(galleries)
    return galleries.map(gallery => (
      <div key={gallery.id} className="col-xl-4 col-md-4 mb-4 ">
        <div className="card border-left-primary  h-100 py-2">
          <Link className="btn btn-light btn-icon-split" to={`/galleries/${gallery.id}`}>
            <div className="col mr-2">
              <div className="h6 mb-0 font-weight text-gray-800" style={divStyle}>
                {gallery.title}
              </div>
              <div style={divImgStyle}>
                <img
                  key={gallery.id}
                  className="img-fluid mb-4 col-12"
                  // src={gallery.images[0].url || ""}
                  alt={gallery.title}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    ))
  }

  render() {


    if (this.state.redirect) {
      return <Redirect to="/businesses" />;
    }

    const business = this.state.business;

    return (
      <div className="">

        <div className="row">
          <div className="col-md-12">
            {/* Card */}
            <div className="card shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Informations</h6>
                <div className="dropdown no-arrow">
                  <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </div>
                  <div id="dropdown-article-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                    <div className="dropdown-header">Actions:</div>
                    {/* <div className="dropdown-item" href="#">Publicar</div> */}
                    <Link className="dropdown-item" to={`/businesses/edit/${business.id}`}>
                      Edit
                    </Link>
                    {/* <div className="dropdown-item" href="#">Marcar para revisão</div> */}
                    <div className="dropdown-divider"></div>
                    <div
                      className="dropdown-item"
                      href="#"
                      onClick={() => this.deleteBusiness(business)}
                    >Excluir</div>
                  </div>
                </div>
              </div>
              {/* <!-- Card Body --> */}
              <div className="card-body">
                <p><strong>Name: </strong>{business.name}</p>
                <p><strong>Address: </strong>{business.address}</p>
                <p><strong>City:</strong>{business.city}</p>

                <br />
                <p><strong>Published: </strong>
                  <Moment format="DD.MM.YYYY - HH:MM">
                    {business.published_at}
                  </Moment>
                </p>


              </div>
            </div>
            {/* Card */}
          </div>
        </div>

        <div className="row">
          {/* {this.renderCategories()} */}
        </div>


      </div>

    );
  }
}

export default Business;

