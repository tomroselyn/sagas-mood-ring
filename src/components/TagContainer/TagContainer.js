import React, {Component} from 'react';
import {connect} from 'react-redux';

class TagContainer extends Component {

    state = {
        selectedTagId: 1
    }

    //get all the tags on mount
    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_TAGS'});
    } //end componentDidMount

    //each time a tag is selected, local state updates
    handleSelectTag = (event) => {
        this.setState({
            selectedTagId: event.target.value
        })
    } //end handleSelectTag

    render() {

        let appliedTags = <li>Hello</li>;

        //map all the tag options for the dropdown menu
        let tagOptions = this.props.tags.map(tag => {
            return <option key={tag.id} value={tag.id}>{tag.name}</option>;
        })

        return (
            <div>
                <div>
                    <h4>Tags</h4>
                    <ul>
                        {appliedTags}
                    </ul>
                </div>
                <div>
                    <select onChange={this.handleSelectTag}>
                        {tagOptions}
                    </select>
                    <button>APPLY TAG</button>
                </div>
            </div>
        )
    }
}

const mapRedux = (redux) => {
    return {
        images: redux.images,
        tags: redux.tags,
        index: redux.position
    }
}

export default connect(mapRedux)(TagContainer);