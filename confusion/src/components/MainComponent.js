import React, {Component} from 'react';
import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import {Switch, Route, Redirect} from 'react-router-dom';
import Contact from './ContactComponent';
import About from "./AboutComponent";


class Main extends Component {

  constructor(props) {
    super(props);
  }
  

  render() {
    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]} 
        leader={this.state.leaders.filter((leader) => leader.featured)[0]} 
        />
      );
    }

    const DishWithId = ({match}) => {
      return (
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          />
        )
    }

    return (
      <div>
        <Header/>
          <Switch>
            <Route path="/home" component = {HomePage} />
            <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders}/>}/>
            <Route exact path="/menu" component = {() => <Menu dishes={this.state.dishes}/>} />  
            <Route exact path="/contactus" component ={Contact} />
            <Route path="/menu/:dishId" component ={DishWithId} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  };
}

export default Main;
