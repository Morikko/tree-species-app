import React, { Component } from 'react';
import logo from './icon-tree.png';
import './TreeSpecies.css';


/**
 * Parse the get parameters from the URL, return the value of name
 * @param {String} name - the value to return
 * @param {String} url - string to analyse, if not given, take the one from the web page
 */
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

class TreeSpecies extends Component {
  constructor(props) {
    super(props);
    this.PAGE_SIZE = 3;
    let page = parseInt(getParameterByName("page"), 10);

    this.state = {
      species: [],
      page:(!isNaN(page)&&page>0)?page:0,
      count:0,
      loading: true,
    }
  }

  render() {
    // Format tree species
    let species = this.state.species.map((sp, index)=>{
      return(
        <li key={"sp"+index}>{sp}</li>
      );
    });

    // Format species index and buttons
    let index, prevEnable, nextEnable;
    if ( this.state.count > 0) {
      let start = 1+this.PAGE_SIZE*this.state.page;
      let end = Math.min(this.PAGE_SIZE+this.PAGE_SIZE*this.state.page, this.state.count)
      index = <div className="species-index">{start}-{end}/{this.state.count}</div>

      prevEnable = start > this.PAGE_SIZE;
      nextEnable = end < this.state.count;
    } else {
      index = <div className="species-index">No tree species...</div>
      prevEnable = false;
      nextEnable = false;
    }

    return (
      <div className="TreeSpecies">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tree Species</h1>
        </header>
        <div className="species">
          <ul className="species-list">
            {species}
          </ul>
          {index}
          <div className="commands">
            <input type="button" value="Previous" id="button-prev"  disabled={!prevEnable}
              onClick={this.previousPage.bind(this)}/>
            <input type="button" value="Next" id="button-next"  disabled={!nextEnable}
              onClick={this.nextPage.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch('/api/species/count')
      .then(res => res.json())
      .then(res => {
        let page = Math.min(this.state.page, Math.floor(res/this.PAGE_SIZE))
        this.setState({count: res,
                        page: page},  this.updatePageTreSpecies);
      })
      .catch ((error) => {
          console.log(error);
      });
  }

  nextPage(event) {
    let end = Math.min(this.PAGE_SIZE+this.PAGE_SIZE*this.state.page, this.state.count)

    if ( end < this.state.count && this.state.page < Math.floor(this.state.count/this.PAGE_SIZE) ) {
      this.setState({page: this.state.page+1 }, this.updatePageTreSpecies);
    }

  }

  previousPage(event) {
    let start = 1+this.PAGE_SIZE*this.state.page;
    if ( start > this.PAGE_SIZE &&  this.state.page > 0 ) {
      this.setState({page: this.state.page-1 }, this.updatePageTreSpecies);
    }
  }

  updatePageTreSpecies() {
    window.history.pushState('page2', 'Title', "/?page=" + this.state.page);
    this.updateTreeSpecies();
  }

  updateTreeSpecies() {
    fetch('/api/species/page/'+this.state.page)
      .then(res => res.json())
      .then(res => {
        this.setState({species: res });
      })
      .catch ((error) => {
          console.log(error);
      });
  }
}

export default TreeSpecies;
