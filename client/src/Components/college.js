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
import "./pop.css"

import { Container } from '@mui/material';

import { Row,Col } from 'react-bootstrap';
import './pop.css'

import dotenv from 'dotenv';

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
dotenv.config();
class College extends Component{

    state = {
        college: {},
        courses:[],
        students:[],
        studentPopUp:false,
        studentDetails:{},
        suggestion: [],
      };

constructor(props) {

    super(props);
    this.fetchCollege(this.props.match.params.id)
    this.fetchStudents(this.props.match.params.id)
    this.fetchSuggestion(this.props.match.params.id)
  }

  fetchCollege = (id) => {
    let url =  'https://oneshot-ai-harsha.herokuapp.com/colleges/'+id;
    axios.get(url).then((response) =>{
        let courses = [...this.state.courses];
        courses = response.data[0].courses
        const college = response.data[0];
       this.setState({college,courses})
    });
  };

  fetchStudents = (id) => {
    let url = 'https://oneshot-ai-harsha.herokuapp.com/students/college/'+id;
    axios.get(url).then((res) =>{
      this.setState({students: res.data})
    });
  }

  fetchSuggestion = (id) => {
    let url = 'https://oneshot-ai-harsha.herokuapp.com/colleges/suggestions/'+id;
    axios.get(url).then((res) =>{
      this.setState({suggestion: res.data})
    });
  }

  getStudentDetails = (studentId) =>{
    let url = 'https://oneshot-ai-harsha.herokuapp.com/students/'+ studentId;
    axios.get(url).then((resp) =>{
       this.setState({studentPopUp:true,studentDetails:resp.data[0]})
    });
  }

  closeStudentPopUp = () =>{
    this.setState({studentPopUp:false})
  }

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
              <StyledTableCell>Colleage ID</StyledTableCell>
              <StyledTableCell align="center">College Name</StyledTableCell>
              <StyledTableCell align="center">Year Founded</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">State</StyledTableCell>
              <StyledTableCell align="center">Country</StyledTableCell>
              <StyledTableCell align="center">No of students</StyledTableCell>
              <StyledTableCell align="center">Courses</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <StyledTableRow  >
                <StyledTableCell align="center">{this.state.college.id}</StyledTableCell>
                <StyledTableCell align="center">{this.state.college.name}</StyledTableCell>
                <StyledTableCell align="center">{this.state.college.foundedYear}</StyledTableCell>
                <StyledTableCell align="center">{this.state.college.city}</StyledTableCell>
                <StyledTableCell align="center">{this.state.college.state}</StyledTableCell>
                <StyledTableCell align="center">{this.state.college.country}</StyledTableCell>
                <StyledTableCell align="center">{this.state.college.studentNo}</StyledTableCell>
                <StyledTableCell align="center">
                {this.state.courses.map((course) => (
                <a>{course.name}{","}{" "}</a>
                ))}
                </StyledTableCell>
              </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      <Container>
        <Row>
        <Col>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Student Name</StyledTableCell>
              <StyledTableCell align="center">Batch</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
                {this.state.students.map((row) => (
                  <StyledTableRow key={row.id} hover onClick={() => this.getStudentDetails(row.id)}  >
                    <StyledTableCell  align="center" component="th" scope="row">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.batch}</StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>   
        </Table>
      </TableContainer>
        </Col>
        <Col>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">College Suggestions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {this.state.suggestion.map((row) => (
                  <StyledTableRow key={row.id} hover onClick={() => this.getColleageDetails(row.id)}>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
        </Table>
      </TableContainer>   
        </Col>
      </Row>
          </Container>
      </div>
      {this.state.studentPopUp &&(
              <div>
              <div className='popup'>
              <div className='popup_inner'>
              <button hover onClick={this.closeStudentPopUp}>X</button>
              <table className = "table" >
                  <tr >
                  <th>Name: {this.state.studentDetails.name}</th>
                  </tr>
                  <tr>
                  <td>ID: {this.state.studentDetails.id}</td>
                  </tr>
                  <tr>
                  <td>Batch: {this.state.studentDetails.batch}</td>
                  </tr>
                  <tr>
                  <td>College ID:{this.state.studentDetails.collegeId}</td>
                  </tr>
                  <tr>
                  <td>Skills: {this.state.studentDetails.skills}</td>
                  </tr>
              </table>
              </div>
              </div>
            </div>
            )} 
      </div>
    )};
}

export default College;
