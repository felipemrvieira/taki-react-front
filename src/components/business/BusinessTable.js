import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'


import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const translations = {
  pageText:'Página',
  ofText: 'de',
  rowsText: 'Linhas',
  previousText: 'Anterior',
  nextText: 'Próxima',
  loadingText: 'Carregando...'
};

const columns = [

    {
        Header: 'Name',
        accessor: 'name',
    },
    {
      Header: 'Address',
      accessor: 'address',
  },
  {
    Header: 'City',
    accessor: 'city',
  },

    {
        Header: 'Actions',
        accessor: 'id',
        Cell: row => (
            <div>
              <Link className="btn btn-light btn-icon-split" to={`/businesses/${row.value}`}>
                <span className="icon text-gray-600">
                    <i className="fas fa-arrow-right"></i>
                </span>
                <span className="text">Show</span>
              </Link>
            </div>
        )
    },
]

function BusinessTable(props) {
    return (
        <ReactTable className="shadow -striped -highlight mb-4"
            data={props.businesses}
            columns={columns}
            noDataText="There are no registered businesses yet!"
            defaultPageSize={10}
            {...translations}
        />
    );
}

export default BusinessTable;
