import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Paper, Chip, TextField, MenuItem, Button} from '@material-ui/core';
import './TagContainer.css';

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
                return <Chip key={i} label={this.props.tags[tag - 1].name} 
                    className={this.props.tags[tag - 1].name} />
            })
        }

        //map all the tag options for the dropdown menu -- value is tag id
        let tagOptions = this.props.tags.map((tag, i) => {
            return <MenuItem key={i} value={tag.id}>{tag.name}</MenuItem>;
        })

        return (
            <div>
                <Paper className="TagContainer-paper">
                    <h4 className="TagContainer-title">Tags</h4>
                    <div className="TagContainer-form">
                        <TextField
                            id="select-tag"
                            select
                            label="Available Tags"
                            value={this.state.selectedTagId}
                            onChange={this.handleSelectTag}
                            className="TagContainer-select"
                            variant="outlined"
                        >
                            {tagOptions}
                        </TextField>
                        <Button variant="contained" className="TagContainer-button"
                                onClick={this.handleApplyTag}>
                            Apply Tag
                        </Button>
                        {/* <button onClick={this.handleApplyTag}>APPLY TAG</button> */}
                    </div>
                    <div className="TagContainer-chip-list">
                        {eachTag}
                    </div>
                </Paper>
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