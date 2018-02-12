import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Accordion from './common/Accordion'
import {connect} from 'react-redux'
import { commentsSelector } from '../selectors'
import { loadAllComments } from '../AC'
import Comment from './Comment'
import Loader from './common/Loader'
import { NavLink } from 'react-router-dom'

class CommentListPagination extends Accordion {

    componentDidMount() {
        this.props.loadAllComments(this.props.page)
    }


    render() {

        const { comments } = this.props

        const body = comments.length ? (
            <ul>
                {comments.map(({id}) => <li key = {id}><Comment id = {id} /></li>)}
            </ul>
        ) : <h3>No comments yet</h3>
        return (
            <div>
                {body}
                Page {this.props.page}
            </div>

        )
    }
}
/*
    render() {
        const {articles, loading} = this.props

        if (loading) return <Loader />
        if (!articles.length) return <h3>No Articles</h3>
        const articleElements = articles.map((article) => <li key={article.id}>
            <NavLink to = {`/articles/${article.id}`} activeStyle = {{color: 'red'}}>{article.title}</NavLink>
        </li>)
        return (
            <ul>
                {articleElements}
            </ul>
        )
    }
}
*/

export default connect(state => ({
    comments: commentsSelector(state)
}), { loadAllComments })(CommentListPagination)