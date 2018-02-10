import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import Comment from './Comment'
import {connect} from 'react-redux'
import {loadArticleComments} from '../AC'
import Loader from './common/Loader'
import toggleOpen from '../decorators/toggleOpen'

class CommentList extends Component {
/*
    static propTypes = {
        article: PropTypes.object.isRequired,
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }
*/

 componentWillReceiveProps({ isOpen, article, loadArticleComments }) {
     if (!this.props.isOpen && isOpen && !article.commentsLoading && !article.commentsLoaded) {
         loadArticleComments(article.id)
     }
 }


    render() {
        const {isOpen, toggleOpen, loading} = this.props
        if (loading) return <Loader />

        const text = isOpen ? 'hide comments' : 'show comments'
        return (
            <div>
                <button onClick={toggleOpen}>{text}</button>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const {article: { comments, id, commentsLoading, commentsLoaded }, isOpen} = this.props
        if (!isOpen) return null

        if (commentsLoading) return <Loader/>
        if (!commentsLoaded) return null

        const body = comments.length ? (
            <ul>
                {comments.map(id => <li key = {id}><Comment id = {id} /></li>)}
            </ul>
        ) : <h3>No comments yet</h3>

        return (
            <div>
                {body}
                <CommentForm articleId = {id} />
            </div>
        )
    }
}

export default connect(null, { loadArticleComments })(toggleOpen(CommentList))
