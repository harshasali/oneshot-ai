import React,{Component} from 'react';
import axios from 'axios';


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

class StateColleges extends Component{

    state = {
        colleges: [],
      };
    constructor(props) {

    super(props);
    this.fetchColleges(this.props.match.params.name)
  }

  fetchColleges = (state) => {
    let url = 'https://oneshot-ai-harsha.herokuapp.com/colleges/states/'+state;
    axios.get(url).then((response) =>{
       this.setState({colleges:response.data})
    });
  };

  getColleageDetails = (collId) =>{
    window.location.href = '/college/'+collId;
  }

  render() {
    return (
        <div>
            <div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">College ID</StyledTableCell>
                  <StyledTableCell align="center">College Name</StyledTableCell>
                  <StyledTableCell align="center">City</StyledTableCell>
                  <StyledTableCell align="center">State</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.colleges.map((row) => (
                  <StyledTableRow key={row.id} hover onClick={() => this.getColleageDetails(row.id)}  >
                    <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.city}</StyledTableCell>
                    <StyledTableCell align="center">{row.state}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            </div>
      </div>
    )};
}
export default StateColleges;
