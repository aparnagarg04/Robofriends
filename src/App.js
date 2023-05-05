import React,{Component} from 'react';
import CardList from './CardList';
import {robots} from './robots';
import SearchBox from './SearchBox';
import './App.css'
import ErrorBoundary from './ErrorBoundary'
import Scroll from './Scroll';


class App extends Component{
	constructor(){
		super()
		this.state={
			robots:[],
			searchfield:''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.cypress.io/users')
		.then(response=> response.json())
		.then(users=>{this.setState({robots:users})});
		
	}

	onSearchChange=(event)=>{
		//setState is an inbuilt parameter
		this.setState({searchfield:event.target.value})
	}


	render(){
		const{robots,searchfield}=this.state;
		const filteredRobots= robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		if(robots.length ===0){
			return <h1>Loading</h1>
		}else{
			return(

			<div className='tc'>
				<h1 className='f1'>ROBOFRIENDS</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<Scroll>
					<ErrorBoundary>
						<CardList robots ={filteredRobots} />
					</ErrorBoundary>
				</Scroll>
			</div>
	  		);
		}
		
	}
	
}
export default App;