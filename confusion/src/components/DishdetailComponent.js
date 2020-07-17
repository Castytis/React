import { Card, CardImg, CardImgOverlay, CardText, 
         CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
         Button, ModalBody, ModalHeader, Modal, Row, Label, Col} from 'reactstrap';
import {Link } from 'react-router-dom'
import React, {Component} from 'react';
import { Control, LocalForm, Errors } from "react-redux-form";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      render(){
          return(
              <React.Fragment>
                  <Button outline onClick={this.toggleModal}>
                      <span className = "fa fa-pencil"> Submit Comment </span>
                  </Button>
                  <Modal isOpen={this.state.isModalOpen} toggle ={this.toggleModal}>
                      <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                    <Row className="form-group">
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Col md={10}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    placeholder="1"
                    className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={2}>
                  Your Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                        required, 
                        minLength: minLength(3), 
                        maxLength: maxLength(15)
                    }}
                  />
                  <Errors 
                   className="text-danger"
                   model=".author"
                   show="touched"
                   messages={{
                    required: 'Required',
                    minLength: 'The author field should at least be three characters long',
                    maxLength: 'The author field should be less than or equal to 15 characters'
                   }}
                   />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={2}>
                  Comment
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows={6}
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
                    </LocalForm>
                  </ModalBody>
                  </Modal>
              </React.Fragment>
          )
      }
    }


function RenderComments({comments}) {

        if (comments == null) {
            return (<div></div>)
        }

        const dishComment = comments.map((comment) => {  
            
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} , 
                    {new Intl.DateTimeFormat('en-GB', {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>   
                    {dishComment}
                </ul>
                <CommentForm></CommentForm>
            </div>
        )
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (
            <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        if (props.dish == null) {
            return (<div></div>)
        }
        return (
            <div class="container">
                     <div className="row">
                      <Breadcrumb>
                        <BreadcrumbItem> 
                            <Link to="/menu"> Menu </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active> 
                            {props.dish.name}
                        </BreadcrumbItem>
                        
                      </Breadcrumb>
                      <div className="col-12">
                          <h3> {props.dish.name} </h3>
                          <hr />
                      </div>
                  </div>

            <div className='row'>
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} />
                </div>
                </div>
        )
    }


export default DishDetail 