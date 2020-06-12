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


class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {
        business:{}
      },
      redirect: false,
      show: false,
      setShow: false
    }

  }

  loadItem = async () => {
    try {
      const response = await api.get(`items/${this.props.idItem}`);
      const item = response.data;
      console.log(item)
      this.setState({ item });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.loadItem();
  }

  deleteItem = async (item) => {
    try {
      if (window.confirm(`Are you sure?`)) {
        const response = await api.delete(`items/${this.props.idItem}`);
        this.setState({
          redirect: true
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/businesses" />;
    }

    const item = this.state.item;

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
                    <Link className="dropdown-item" to={`/items/edit/${item.id}`}>
                      Edit
                    </Link>
                    <div className="dropdown-divider"></div>
                    <div
                      className="dropdown-item"
                      href="#"
                      onClick={() => this.deleteItem(item)}
                    >Excluir</div>
                  </div>
                </div>
              </div>
              {/* <!-- Card Body --> */}
              <div className="card-body">
                <p><strong>Name: </strong>{item.name}</p>
                <p><strong>Price: </strong>{item.price}</p>
                <p><strong>Business: </strong>{item.business.name}</p>
                <p><strong>Published: </strong>
                  <Moment format="DD.MM.YYYY - HH:MM">
                    {item.published_at}
                  </Moment>
                </p>


              </div>
            </div>
            {/* Card */}
          </div>
        </div>




      </div>

    );
  }
}

export default Item;

