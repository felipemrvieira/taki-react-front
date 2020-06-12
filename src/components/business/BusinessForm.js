import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';

class ArticleForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      business: {},
      redirect: false,
      theme: 'snow',
      selectedCategories: [],
      selectedGalleries: [],
      selectedTypes: [{ value: 1, label: "Notícia" }],
      submited: false,
      date: new Date()
    }
    this.handleChange = this.handleChange.bind(this);

  }

  loadCategories = async () => {
    try {
      const response = await api.get("/categories");
      const categories = response.data.data;
      this.setState({ ...this.state, categories: categories })
    } catch (err) {
      console.log(err);
    }
  }

  loadGalleries = async () => {
    try {
      const response = await api.get("/galleries");
      const galleries = response.data.data;
      this.setState({ ...this.state, galleries: galleries })
      console.log(galleries)
    } catch (err) {
      console.log(err);
    }
  }

  loadTypes = async () => {
    try {
      const response = await api.get("/types");
      const types = response.data.data;
      this.setState({ ...this.state, types: types })
      console.log(this.state.types)
    } catch (err) {
      console.log(err);
    }
  }

  loadBusiness = async () => {
    try {
      const response = await api.get(`/businesses/${this.props.businessId}`);
      const business = response.data
      console.log(business)
      this.setState({ ...this.state, business })
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (this.props.businessId) {
      this.loadBusiness()
    }
    // this.loadCategories();
    // this.loadGalleries();
    // this.loadTypes();

  }

  handleChangeSelectMultiCategories = selectedCategories => {
    this.setState(
      { selectedCategories },
      () => console.log(`Option selected:`, this.state.selectedCategories)
    );
  };

  handleChangeSelectMultiGalleries = selectedGalleries => {
    this.setState(
      { selectedGalleries },
      () => console.log(`Option selected:`, this.state.selectedGalleries)
    );
  };

  handleChangeType = selectedTypes => {
    this.setState(
      { selectedTypes },
      () => console.log(`Option selected:`, this.state.selectedTypes)
    );
  };


  // Captura inputs do form exceto body
  handleChange = event => {
    const value = event.target.value

    switch (event.target.id) {
      case 'name':
        this.setState(prevState => ({
          business: {
            ...prevState.business,
            name: value
          }
        }))
        break;
      case 'address':
        this.setState(prevState => ({
          business: {
            ...prevState.business,
            address: value
          }
        }))
        break;
      case 'city':
        this.setState(prevState => ({
          business: {
            ...prevState.business,
            city: value
          }
        }))
        break;
      default:
        break;
    }
  }

  editBusiness = async (business) => {
    console.log(JSON.stringify(business))

    try {
      await api.patch(`/businesses/${this.props.businessId}`, { business });

      this.setState({
        redirect: true
      })
    } catch (err) {
      console.log(err);
    }
  }

  createBusiness = async (business) => {
    try {
      const response = await api.post(`/businesses`, { business });

      this.setState({
        redirect: true
      })

    } catch (err) {
      console.log(err);
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ submited: true })

    const { business } = this.state;

    if (this.props.businessId) {
      this.editBusiness(business);
      console.log("Edita business")
      console.log(business)
    } else {
      this.createBusiness(business);
      console.log("Cria business")
      console.log(business)
    }
  }


  render() {
    if (this.state.redirect) { return <Redirect to="/businesses" />; }

    const {
      business
    } = this.state;

    return (
      <div className="row">
        <div className="col-md-12">

          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Informations</h6>
              <div className="dropdown no-arrow">
                <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {/* <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> */}
                </div>
              </div>
            </div>

            {/* <!-- Card Body --> */}
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                  <label htmlFor="titulo">Name</label>
                  <input type="text"
                    className="form-control"
                    maxLength="85"
                    id="name"
                    placeholder="Type here"
                    onChange={this.handleChange}
                    name="name"
                    value={business.name}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="titulo">Address</label>
                  <input type="text"
                    className="form-control"
                    maxLength="85"
                    id="address"
                    placeholder="Type here"
                    onChange={this.handleChange}
                    name="address"
                    value={business.address}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="titulo">City</label>
                  <input type="text"
                    className="form-control"
                    maxLength="85"
                    id="city"
                    placeholder="Type here"
                    onChange={this.handleChange}
                    name="city"
                    value={business.city}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-block"
                  disabled={this.state.submited ? "disabled" : ""}
                >
                  {
                    this.state.submited ?
                      "Wait..." :
                      this.props.businessId ? "Update" : "Create"
                  }
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}


/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
ArticleForm.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
ArticleForm.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default ArticleForm;
