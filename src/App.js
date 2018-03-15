import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
//const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP='5'
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE='page=';
const PARAM_HPP='hitsPerPage=';

const url = `${PATH_BASE}${PARAM_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


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
                type="bu
                tton"
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
            results : [],
            lastSearch : '',
            searchTerm: DEFAULT_QUERY,
            error : null,
        };
        this.needsToSearchTopStories =  this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onDismiss =  this.onDismiss.bind(this); //Make onDismiss a class method
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.doSearch = this.doSearch.bind(this);

    }


    /**
     * checks if searchTerm is already in cache
     * @param searchTerm
     */
    needsToSearchTopStories(searchTerm)
    {
        return !this.state.results[searchTerm];
    }
    /**
     * Concatenates current page with all the previous pages
     * @param result
     */
    setSearchTopStories(result)
    {
        const {hits, page } = result;
        const {lastSearch, results} = this.state;


        const oldHits = results && results[lastSearch]
            ? results[lastSearch].hits
            : [];

        const updatedHits = [...oldHits, ...hits];

        //set current result in results array with key: lastSearch
        this.setState({ //this syntax creates new key with name taken from lastSearch variable
            results: { ...results, [lastSearch]: { hits: updatedHits, page } }
        });


    }

    fetchSearchTopStories(searchTerm, page = 0) {
        console.log(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`);
        axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(result => this.setSearchTopStories(result.data))
            .catch(error => this.setState({error}));
    }

    onSearchSubmit(event)
    {
        this.doSearch();
        event.preventDefault();
    }

    doSearch()
    {
        const { searchTerm } = this.state;
        this.setState({lastSearch: searchTerm});
        if (this.needsToSearchTopStories(searchTerm))
            this.fetchSearchTopStories(searchTerm);

    }
    componentDidMount()
    {
        this.doSearch();
    }

    render() {
        //const hello_world = "Привет, мир!!";
        const {searchTerm, results, lastSearch, error } = this.state;
        const page = (results && results[lastSearch] && results[lastSearch].page) || 0;
        const list = (results && results[lastSearch] && results[lastSearch].hits) || [];

        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}>
                        Search
                    </Search>
                </div>
                {error
                    ? <div className="interactions">
                        <p>Something went wrong</p>
                    </div>

                    : <Table
                        list={list}
                        onDismiss={this.onDismiss}/>
                }


                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(lastSearch, page + 1)}>
                        More
                    </Button>
                </div>
            </div>
        );
    }
    onDismiss(id) {
        const {lastSearch, results} = this.state;
        const {hits, page} = results[lastSearch];
        const isNotId = item => item.objectID !== id;

        const updatedHits = hits.filter(isNotId);

        this.setState({
            results: {
                ...results,
                [lastSearch]: {hits: updatedHits, page}
            }

        });
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
const Search = ({value, onChange, onSubmit, children}) =>
            <form onSubmit={onSubmit}>
                {children}
                <input type="text"
                       value={value}
                       onChange={onChange}/>
                <button type="submit">{children}</button>
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
const Table = ({list, onDismiss}) =>
    <div>
            {list.
            map(item =>

                <div key={item.objectID} className="table-row">
                    <span style={{width : '40%'}}>
                        <a href={item.url}> {item.title} </a>
                    </span>
                    <span style={{width : '30%'}}>
                        {item.author}
                    </span>
                    <span style={{width: '10%'}}>
                        {item.num_comments}
                    </span>
                    <span style={{width: '10%'}}>
                        {item.points}
                    </span>
                    <span style={{width: '10%'}}>
                        <Button
                            onClick={ () => onDismiss(item.objectID)}
                            className="button-inline">
                            Dismiss
                        </Button>
                    </span>
                </div>

            )}
    </div>

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