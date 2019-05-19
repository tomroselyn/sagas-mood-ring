import React, {Component} from 'react';
import {connect} from 'react-redux';
import TagContainer from '../TagContainer/TagContainer';
import {Paper, IconButton} from '@material-ui/core';
import {ArrowBack, ArrowForward} from '@material-ui/icons';
import './ImageContainer.css';

class ImageContainer extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_TAGS' });
        this.props.dispatch({type: 'FETCH_IMAGES'});
    } //end componentDidMount

    handleNext = () => {
        //declare next index value
        let nextPosition = this.props.index + 1;
        //when reaching the end of the array, set next index to 0
        if (nextPosition === this.props.images.length) {
            nextPosition = 0;
        }
        //dispatch CHANGE_POSITION with next index value
        this.props.dispatch({type: 'CHANGE_POSITION', payload: nextPosition});
    } //end handleNext

    handlePrev = () => {
        //declare prev index value
        let prevPosition = this.props.index - 1;
        //when value gets below 0, set prev index to last possible index value in array
        if (prevPosition < 0) {
            prevPosition = this.props.images.length - 1;
        }
        //dispatch CHANGE_POSITION with prev index value
        this.props.dispatch({ type: 'CHANGE_POSITION', payload: prevPosition });
    } //end handlePrev

    render() {

        if (this.props.images.length <= 0) {
            return (
                <p>Sorry, no images found!</p>
            )
        } else {
            return (
                <div>
                    {/* prev and next buttons */}

                    {/* <button onClick={this.handlePrev}>PREV</button>
                    <button onClick={this.handleNext}>NEXT</button> */}
                    {/* paper container */}
                    <Paper className="ImageContainer-paper">
                        {/* image title and nav arrows */}
                        <IconButton className="ImageContainer-navBtn" onClick={this.handlePrev}>
                            <ArrowBack />
                        </IconButton>
                        <h3 className="ImageContainer-title">{this.props.images[this.props.index].title}</h3>
                        <IconButton className="ImageContainer-navBtn" onClick={this.handleNext}>
                            <ArrowForward />
                        </IconButton>
                        {/* image */}
                        <img className="ImageContainer-image"
                            src={this.props.images[this.props.index].path}
                            alt={this.props.images[this.props.index].title} />
                    </Paper>
                    {/* tags component */}
                    <TagContainer />
                </div>
            )
        }
    } //end render
}

const mapRedux = (redux) => {
    return {
        images: redux.images,
        index: redux.position
    }
}

export default connect(mapRedux)(ImageContainer);