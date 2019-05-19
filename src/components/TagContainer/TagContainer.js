import React, {Component} from 'react';
import {connect} from 'react-redux';

class TagContainer extends Component {

    //hold selected tag id in local state
    state = {
        selectedTagId: 1
    }

    //when button is clicked, dispatch image and selected tag id's in payload
    handleApplyTag = () => {
        this.props.dispatch({type: 'ADD_TAG', payload: 
            {img_id: (this.props.index + 1), tag_id: this.state.selectedTagId}
        });
    } //end handleApplyTag

    //each time a tag is selected, local state updates
    handleSelectTag = (event) => {
        this.setState({
            selectedTagId: event.target.value
        })
    } //end handleSelectTag

    render() {

        //set applied image tags to variable
        let appliedTags = this.props.images[this.props.index].tags;

        //initialize eachTag for rendering
        let eachTag;

        //if there are applied tags, map through and make eachTag list items
        if (appliedTags[0]) {
            eachTag = appliedTags.map((tag, i) => {
                //looking to redux tags reducer for names
                return <li key={i}>{this.props.tags[tag - 1].name}</li>
            })
        }

        //map all the tag options for the dropdown menu -- value is tag id
        let tagOptions = this.props.tags.map((tag, i) => {
            return <option key={i} value={tag.id}>{tag.name}</option>;
        })

        return (
            <div>
                <div>
                    <h4>Tags</h4>
                    <ul>
                        {eachTag}
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
} //end render

const mapRedux = (redux) => {
    return {
        images: redux.images,
        tags: redux.tags,
        index: redux.position
    }
}

export default connect(mapRedux)(TagContainer);