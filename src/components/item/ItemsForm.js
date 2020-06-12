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
      item: {},
      redirect: false,
      theme: 'snow',
      submited: false,
      date: new Date()
    }
    this.handleChange = this.handleChange.bind(this);

  }


  loadItem = async () => {
    try {
      const response = await api.get(`/items/${this.props.itemId}`);
      const item = response.data
      console.log(item)
      this.setState({ ...this.state, item })
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (this.props.itemId) {
      this.loadItem()
    }
    // this.loadCategories();
    // this.loadGalleries();
    // this.loadTypes();

  }



  // Captura inputs do form exceto body
  handleChange = event => {
    const value = event.target.value

    switch (event.target.id) {
      case 'name':
        this.setState(prevState => ({
          item: {
            ...prevState.item,
            name: value
          }
        }))
        break;
      case 'price':
        this.setState(prevState => ({
          item: {
            ...prevState.item,
            price: value,
            business_id: this.props.businessId
          }
        }))
        break;
      default:
        break;
    }
  }

  editItem = async (item) => {
    console.log(JSON.stringify(item))

    try {
      await api.patch(`/items/${this.props.itemId}`, { item });

      this.setState({
        redirect: true
      })
    } catch (err) {
      console.log(err);
    }
  }

  createItem = async (item) => {
    try {
      const response = await api.post(`/items`, { item });

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

    const { item } = this.state;

    if (this.props.itemId) {
      this.editItem(item);
      console.log("Edita item")
      console.log(item)
    } else {
      this.createItem(item);
      console.log("Cria item")
      console.log(item)
    }
  }


  render() {
    if (this.state.redirect) { return <Redirect to="/businesses" />; }

    const {
      item
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
                    value={item.name}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="titulo">Price</label>
                  <input type="number"
                    className="form-control"
                    id="price"
                    placeholder="Type here"
                    onChange={this.handleChange}
                    name="price"
                    value={item.price}
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
                      this.props.itemId ? "Update" : "Create"
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
