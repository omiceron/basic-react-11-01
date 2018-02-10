import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, START, FAIL, SUCCESS } from '../constants'
import { OrderedMap, Record } from 'immutable'
import { arrToMap } from './utils'

const CommentRecord = Record({
    id: null,
    user: null,
    text: null
})

const ReducerRecord = Record({
    entities: new OrderedMap({})
})

export default (state = new ReducerRecord(), action) => {
    const { type, payload, randomId, response } = action

    switch (type) {

        case ADD_COMMENT:
            return state
                .setIn(['entities', randomId], new CommentRecord(randomId, {...payload.comment, id: randomId}))

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return state
                .mergeIn(['entities'], arrToMap(response, CommentRecord))

    }

    return state
}