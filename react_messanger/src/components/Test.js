import {Form, FormGroup, Label, Input,Container, Row, Col, Button} from 'reactstrap';


const Test = ()=>{
    return(
        <Container>
            <Row style = {{backgroundColor : "yellow"}}>
                <Col lg = "2"  style = {{backgroundColor : "pink"}}>hi</Col>
                <Col  style = {{backgroundColor : "green"}}>hello</Col>
            </Row>
        </Container>
    )
}

export default Test;
