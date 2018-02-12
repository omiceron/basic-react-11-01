import React, { Component } from 'react'
import CommentListPagination from '../CommentListPagination'
import Comment from '../Comment'
import {Route} from 'react-router-dom'

class CommentPagesList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Comment list:</h2>

                <Route path = {`${this.props.match.path}/:page`} children = {this.getComment}/>
            </div>
        )
    }

    getComment = ({ match }) => {
        if (!match) return <h2>Please, select page</h2>

        if (!/^\d+$/.test(match.params.page)) return <h2>Enter correct number! WTF is "{match.params.page}"?</h2>
        return <CommentListPagination page = {match.params.page}/>
    }

}

export default CommentPagesList