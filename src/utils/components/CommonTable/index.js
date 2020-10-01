import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TablePagination
} from '@material-ui/core';
import _ from 'lodash';

class CommonTable extends React.Component {
  waitText = () => {
    return <div style={{display: 'flex', justifyContent: 'center'}}>
      <CircularProgress size={20} style={{marginRight: '12px'}} /> Buscando usuários...
    </div>;
  }

  setHeaderColumns = (columns) => {
    return columns.map((column, index) => (
      Array.isArray(column) && column[1] ? (
        <TableCell key={index}>{column[1]}</TableCell>
      ) : (
        <TableCell key={index}>{column}</TableCell>
      )
    ));
  }

  setTableRows = (row, columns) => {
    return columns.map((column, index) => (
      <TableCell key={index}>
        {Array.isArray(column) && column[1] ? ( 
          column[2] ? (
            column[2](_.get(row, column[0]))
          ) : (
            _.get(row, column[0])
          )
        ) : (
          _.get(row, column)
        )}
      </TableCell>
    ))
  }

  render() {
    const {
      columns,
      rows,
      loading,
      onClickRow,
      changePage,
      changeRowsPerPage,
      rowsPerPageOptions,
    } = this.props;
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              {
                this.setHeaderColumns(columns)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows && rows.data.length && !loading ? (
                rows.data.slice(
                  (rows.meta.current_page-1)*parseInt(rows.meta.per_page, 10),
                  (rows.meta.current_page-1)*parseInt(rows.meta.per_page, 10) + parseInt(rows.meta.per_page, 10)
                ).map((row, i) => (
                  <TableRow
                    style={onClickRow ? {cursor: 'pointer'} : {}}
                    key={i}
                    onClick={() => onClickRow ? onClickRow(i) : null}
                  >
                    <TableCell align="center">{i+1}</TableCell>
                    {
                      this.setTableRows(row, columns)
                    }
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} style={{textAlign: 'center'}}>
                    { loading ? this.waitText() : 'Nada encontrado' }
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
        {
          rows && rows.meta && 
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions || [10,20,30]}
            component="div"
            count={rows.meta.total}
            rowsPerPage={parseInt(rows.meta.per_page, 10)}
            page={rows.meta.current_page-1}
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={(e, page) => changePage ? changePage(page) : null}
            onChangeRowsPerPage={(e) => changeRowsPerPage ? changeRowsPerPage(e.target.value) : null}
          />
        }
      </div>
    );
  }
}

export default CommonTable;
