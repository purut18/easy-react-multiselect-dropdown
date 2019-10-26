import React, { Component } from 'react';

import './multi-select-dropdown.css';

class MultiSelectDropdown extends Component {

    state = {
        options: this.props.options,
        searchRes: [],
        selected: []
    }

    searchHandle = (event) => {
        const searchQry = event.target.value;
        let searchArr = [];
        if(searchQry !== "") {
            this.state.options.map((value,key) => {
                if(value.name.startsWith(searchQry)) {
                    searchArr.push({
                        id: value.id,
                        name: value.name
                    });
                }
                return searchArr;
            });
        }
        this.setState({
            searchRes: searchArr
        })
    }

    blurHandle = () => {
        console.log('something');
        this.setState({
            searchRes: []
        });
    }

    removeByAttr = function(arr, value){
        var i = arr.length;
        while(i--){
            if(arr[i] && arr[i]['name'] === value) { 
                arr.splice(i,1);
                break;
            }
        }
        return arr;
    }

    selectHandle = (id, name) => {
        
        this.setState((prevState, props) => {
            return {
                searchRes: [],
                selected: [
                    ...prevState.selected,
                    {
                        id: id,
                        name: name
                    }
                ],
                options: this.removeByAttr(prevState.options, name)
            }
        },() => this.props.getSelected(this.state.selected));
    }

    removeHandle = (id, name) => {
        this.setState((prevState, props) => {
            return {
                selected: this.removeByAttr(prevState.selected, name),
                options: [
                    ...prevState.options,
                    {
                        id: id,
                        name: name
                    }
                ]
            }
        },() => this.props.getSelected(this.state.selected));
    }

    render() {
        return(
            <div className="select-div">
                <form onBlur={this.blurHandle}>
                    <div className="selected">
                        {this.state.selected.map((value, key) => (
                            <p key={key}>{value.name} <span onClick={() => this.removeHandle(value.id, value.name)}>&#215;</span></p>
                        ))}
                    </div>
                    <input type="text" placeholder="Search" onChange={this.searchHandle} />
                    <div className="options">
                        {this.state.searchRes.map((value,key) => (
                            <li onMouseDown={() => this.selectHandle(value.id, value.name)} value={value.id} key={key}>{value.name}</li>
                        ))}
                    </div>
                    {/* <select name="multi-select">
                        {this.state.searchRes.map((value,key) => (
                            <option value={value.id} key={key}>{value.name}</option>
                        ))}
                    </select> */}
                </form>
            </div>
        );
    }
}

export default MultiSelectDropdown;