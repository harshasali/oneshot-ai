import React,{Component, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

import PieCharts from './pieChart'
import { Container } from '@mui/material';

import { Row,Col } from 'react-bootstrap';

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

class CollegeTable extends Component{
  
  state = {
    collegeData: [],
    rows:[],
    statePieData:[],
    coursePieData:[]
  };

  fetchColleges = () => {
    let url = 'https://oneshot-ai-harsha.herokuapp.com/colleges';
    axios.get(url).then((response) =>{
      let {rows,collegeData} = {...this.state}
      response.data.forEach(element => {
        rows.push({ id: element.id, 
          name: element.name,
          state: element.state,
          city: element.city});
      });
      this.setState({rows:rows,collegeData:response.data})

    });
  };

  fetchStateColleages = () => {
    let url = 'https://oneshot-ai-harsha.herokuapp.com/colleges/stat/statewise';
    axios.get(url).then((response) =>{
      const statePieData = [...this.state.statePieData]
      response.data.forEach(element => {
        statePieData.push({
          value: element._id,
          percentage: element.count
        });
    });
    this.setState({statePieData:statePieData})
  });
}

fetchCourses = () => {
  let url = 'https://oneshot-ai-harsha.herokuapp.com/courses/';
  axios.get(url).then((response) =>{
    const coursePieData = [...this.state.coursePieData]
    response.data.forEach(element => {
      coursePieData.push({
        value: element.name,
        percentage: element.colleges.length
      });
  });
   this.setState({coursePieData})
});
}

  constructor(props) {
    super(props);
    this.fetchColleges()
    this.fetchStateColleages()
    this.fetchCourses()
  }

  getColleageDetails = (collId) =>{
    window.location.href = '/college/'+collId;
  }

render() {
  return (
    <div>
       <Container>
    <Row>
    <Col>
    <PieCharts
        title = " Statewise Colleges "
        data = {this.state.statePieData}
        path = "state"
      />
    </Col>
    <Col>
    <PieCharts
        title = "Comabined Courses Total"
        data = {this.state.coursePieData}
        path = "courses"
      />
    </Col>
  </Row>
      </Container>
   <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Colleage Name</StyledTableCell>
            <StyledTableCell align="center">City</StyledTableCell>
            <StyledTableCell align="center">State</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map((row) => (
            <StyledTableRow key={row.id} hover onClick={() => this.getColleageDetails(row.id)}  >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.city}</StyledTableCell>
              <StyledTableCell align="center">{row.state}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
}
export default CollegeTable;