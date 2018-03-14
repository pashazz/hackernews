import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

class Button extends Component {
    render() {
        const {
            onClick,
            className = '',
            children,
        } = this.props;
        return (
            <button
                onClick={onClick}
                className={className}
                type="button"
            >
                {children}
            </button>
        );
    }
}

class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            list, // shorthand for list: list,
            searchTerm: '',
        };
        this.onDismiss =  this.onDismiss.bind(this); //Make onDismiss a class method
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    render() {
        //const hello_world = "Привет, мир!!";
        const {searchTerm, list } = this.state;
        return (
            <div className="App">
                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange} >
                    Search
                </Search>
                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss} />



            </div>
        );
    }
    onDismiss(id){
        const isNotId = item => item.objectID !== id;

        const updatedList = this.state.list.filter(isNotId);
        this.setState({list: updatedList});
    }

    onSearchChange(event)
    {
        this.setState({ searchTerm : event.target.value })
    }

}
/** long version
class Search extends Component
{
    render()
    {
        const { value, onChange, children } = this.props;
        return (
            <form>
                {children}
                <input type="text"
                       value={value}
                       onChange={onChange}/>
            </form>
        );
    }
}
*/
const Search = ({value, onChange, children}) =>
            <form>
                {children}
                <input type="text"
                       value={value}
                       onChange={onChange}/>
            </form>




/** long version
class Table extends Component
{
    render()
    {
        const {list,pattern, onDismiss} = this.props;
        return (
            <div>
            {list.filter(isSearched(pattern)).
            map(item =>

                <div key={item.objectID}>
                    <span>
                        <a href={item.url}> {item.title} </a>
                    </span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span> {item.points}</span>
                    <span>
                                <Button
                                    onClick={ () => onDismiss(item.objectID)}
                                    >
                                    Dismiss
                                </Button>
                            </span>
                </div>

            )}
            </div>
        );
    }
}
 */


export default App;
/*
class ExplainBindingsComponent extends Component {
    constructor(){
        super();
        this.onClickMe = this.onClickMe.bind(this); //Class method
    }
    onClickMe() {
        console.log(this);
    }
    render() {
        return (
            <button
                onClick={this.onClickMe}
                type="button"
            >
                Click Me
            </button>
        );
    }
}
export default ExplainBindingsComponent;
*/