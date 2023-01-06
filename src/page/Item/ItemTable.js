import React, { Fragment, useCallback, useEffect, useState } from 'react'

import { Button, Paper, Skeleton, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import TablePaginationActions from './TablePaginationActions';

import API from '../../api/setting'
import { shallowEqual, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Add, Edit, Refresh } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AddModal from '../../coponent/AddModal';
import ItemAdd from './ItemAdd';
import { useSnackbar } from 'notistack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.divider,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns = [
  { id: 'name'       , label: '이름' , align: 'center',minWidth: 100 },
  { id: 'status'     , label: '상태' , align: 'center', minWidth: 120 },
  { id: 'startDate'  , label: '시작일', align: 'center', minWidth: 120 },
  { id: 'endDate'    , label: '종료일', align: 'center', minWidth: 120 },
  { id: 'writerEmail', label: '관리자', align: 'center', minWidth: 100 },
];

function listSkeleton(count){

  const render = [];

  for (let index = 0; index < count; index++) {
    render.push(
      <StyledTableRow key={index}>
        <StyledTableCell key={`${index}_skeleton`} align='center'>
          <Skeleton variant="rectangular" width='100%'/>
        </StyledTableCell>
        {columns.map((column) => 
          <StyledTableCell key={`${column.id}`} align={column.align} style={{ minWidth: column.minWidth }}>
            <Skeleton variant="rectangular" width='100%'/>
          </StyledTableCell>
        )}
      </StyledTableRow>
    )
  }
  
  return render;

}

export default function ItemTable(props) {

  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const [page, setPage] = useState(0);
  const [addModalOpen, setAddModalOpen]  = useState(false);
  
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  const {currentChannel} = useSelector((state)=>({
    currentChannel: state.user.channel.currentChannel,
  }), shallowEqual);

  const ItemListCallback = useCallback(async () =>{
    if(!currentChannel) {
      enqueueSnackbar("채널을 설정 해주세요.", { variant: 'error' } ); 
      navigate('/settings')
      return
    };

    try {
      const response = await API.item.getItemList({
        id: currentChannel.id
      });
      setData(response.data.data);
  
      enqueueSnackbar('아이템 조회 성공', { variant: 'success' } ); 
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' } ); 
    }

  }, [currentChannel, setData, enqueueSnackbar, navigate]);

  const handleClose = async () => {
    setAddModalOpen(false);
    await ItemListCallback();
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = (event) => {
    ItemListCallback()
  };

  const handleAdd= (event) => {
    setAddModalOpen(true);
  };

  useEffect(() =>{
    ItemListCallback()
  }, [ItemListCallback])

  const handleRowClick = (id) => {
    navigate('/contents/' + id)
  };

  return (
    <Fragment>
      { addModalOpen && <AddModal Body={ItemAdd} open={addModalOpen} handleClose={handleClose}/>}
      <Grid container>
        <Grid item xs={12} sm={12} md ={12} lg={12} xl={12}>
          <Button 
            variant="outlined" size="large" color="primary" 
            startIcon={<Refresh/>} 
            sx={{
              margin: (theme)=> theme.spacing(2,2,2,0)
            }}  
            onClick={handleRefresh}
          >
            갱신
          </Button>

          <Button 
            variant="outlined" size="large" color="primary" 
            startIcon={<Add/>} 
            sx={{
              margin: (theme)=> theme.spacing(2,2,2,0)
            }}  
            onClick={handleAdd}
          >
            추가
          </Button>
        </Grid>
          
      <Grid item xs={12} sm={12} md ={12} lg={12} xl={12}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ height: 'calc(100vh - 220px)' }}>
            <Table stickyHeader sx={{ minWidth: 500 }} aria-label="item table">
              <TableHead>
                <TableRow>
                <StyledTableCell
                    key='func'
                    align='center'
                    style={{ width: '10px' }}
                  >
                    {" "}
                  </StyledTableCell>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length <= 0 ? 
                listSkeleton(10) :
                  (rowsPerPage > 0
                  ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : data
                ).map((row) => (
                  <StyledTableRow 
                    key={row.id}
                    onClick={handleRowClick.bind(handleRowClick, row.id)}
                  >
                    <StyledTableCell key={`${row.id}_edit`} align='center'>
                      <Edit></Edit>
                    </StyledTableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={`${row.id}_${column.id}`} align={column.align} style={{ minWidth: column.minWidth }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                ))}

                {emptyRows > 0 && (
                  <StyledTableRow style={{ height: 53 * emptyRows }}>
                    <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </TableBody>
              
            </Table>
          </TableContainer>
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
        </Paper>
      </Grid>
    </Grid>
    </Fragment>
)}