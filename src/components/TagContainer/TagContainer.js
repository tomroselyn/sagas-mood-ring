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

    handleApplyTag = () => {
        this.props.dispatch({type: 'ADD_TAG', payload: 
            {img_id: (this.props.index + 1), tag_id: this.state.selectedTagId}
        });
    }

    //each time a tag is selected, local state updates
    handleSelectTag = (event) => {
        this.setState({
            selectedTagId: event.target.value
        })
    } //end handleSelectTag

    render() {

        //map applied tags to display on DOM -- match by id
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
                    <button onClick={this.handleApplyTag}>APPLY TAG</button>
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