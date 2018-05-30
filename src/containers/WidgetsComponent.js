import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'

const BASE_URL = "https://murmuring-dawn-26453.herokuapp.com";

const _HeadingOptions = ({item, dispatch}) => {
  let select
  return(
    <select className="form-control col-md-9" value={item.size}
      onChange={e => (
        dispatch({
          type: 'CHANGE_HEADING_SIZE',
          widgetType: select.value,
          id: item.id,
          size: select.value
        })
      )}
      ref={node => select = node}>
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
    </select>
  )
}

const Heading = ({size, text}) => {
  if (size === "1") {
    return (<h1>{text}</h1>)
  } else if (size === "2") {
    return (<h2>{text}</h2>)
  } else {
    return (<h3>{text}</h3>)
  }
}

const Paragraph = ({text}) => (
  <p>{text}</p>
)
const List = ({text}) => (
  <li>{text}</li>
)

const Image = ({src}) => (
  <img src="" />
)

const Link = ({url, text}) => (
  <a href={url}>{text}</a>
)

const Item = ({item, dispatch}) => {
  let select, widgetTitle, text
  return(
    <div className="card" key={item.id}>
      <div className="card-body">
        <form className="form-inline">
          {item.title} {item.id}
          <select className="form-control col-md-3 mx-2" value={item.widgetType}
                  onChange={e => (
                    dispatch({
                      type: 'SELECT_ITEM_TYPE',
                      widgetType: select.value,
                      id: item.id
                    })
                  )}
                  ref={node => select = node}>
            <option>Heading</option>
            <option>Paragraph</option>
            <option>List</option>
            <option>Image</option>
            <option>Link</option>
          </select>
          <button className="btn btn-danger mx-2" onClick={e => (
            dispatch({type: 'DELETE_ITEM', id: item.id}))}>Delete</button>
          <input type="text" placeholder="Widget Name" className="form-control col-md-9 my-3" 
            ref={node => widgetTitle = node} onChange={e =>
              (dispatch({
                type: 'CHANGE_TITLE',
                id: item.id,
                title: widgetTitle.value
              }))}/>
          {item.widgetType === 'Heading' && <HeadingOptions item={item} />}
          <input type="text" placeholder="Text" className="form-control col-md-9 my-3" 
            ref={node => text = node} onChange={e => 
              (dispatch({
                type: 'CHANGE_TEXT',
                id: item.id,
                text: text.value
            }))}/>
        </form>
        <div>
          <h3>Preview</h3>
          {item.widgetType === 'Heading' && <Heading text={item.text} size={item.size}/>}
          {item.widgetType === 'Paragraph' && <Paragraph text={item.text}/>}
          {item.widgetType === 'List' && <List text={item.text}/>}
          {item.widgetType === 'Image' && <Image />}
          {item.widgetType === 'Link' && <Link text={item.text}/>}
        </div>
      </div>
    </div>
  )
}
const ListItem = connect()(Item)
const HeadingOptions = connect()(_HeadingOptions)

const findAllItems = (dispatch) => {
  fetch(BASE_URL + '/api/lesson/' + '/' + '/widget')
    .then(response => (response.json()))
    .then(items => dispatch({type: 'FIND_ALL_ITEMS', items: items}))
}
const addItem = dispatch => {
  dispatch({type: 'ADD_ITEM', title: 'New Item', widgetType: 'Paragraph'})
}
const save = dispatch => {
  dispatch({type: 'SAVE_ITEMS'})
}

class ListEditor extends React.Component {
  constructor(props) {
    super(props)
    this.props.findAllItems()
  }
  render() {
    return (
      <div className="container">
        <button className="btn btn-primary btn-block m-3 col-md-3" onClick={this.props.save}>Save</button>
        <ul>
          {this.props.items.map(item => (
            <ListItem key={item.id} item={item}/>
          ))}
        </ul>
        <button className="btn btn-secondary" onClick={this.props.addItem}>Add Item
        </button>
      </div>
    )
  }
}

let id = 2
let initialState = {
  items: [
    {title: 'Heading Widget', id: 0, widgetType: 'Heading', size: 1}
  ]
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FIND_ALL_ITEMS':
      return Object.assign({}, state, {
        items: action.items
      })
    case 'SAVE_ITEMS':
      fetch(BASE_URL + '/api/widget/save', {
        method: 'PUT',
        body: JSON.stringify(state.items),
        headers: {
          'content-type': 'application/json'
        }
      })
    case 'SELECT_ITEM_TYPE':
      state.items = state.items.map(item => (
        item.id === action.id ? {
          id: item.id,
          widgetType: action.widgetType,
          title: item.title,
          text: item.text
        } : item
      ))
      return JSON.parse(JSON.stringify(state))
    case 'CHANGE_TITLE':
      state.items = state.items.map(item => (
        item.id === action.id ? {
          id: item.id,
          widgetType: item.widgetType,
          title: action.title,
          text: item.text,
          size: item.size
        } : item
      ))
      return JSON.parse(JSON.stringify(state))
    case 'CHANGE_TEXT':
      state.items = state.items.map(item => (
        item.id === action.id ? {
          id: item.id,
          widgetType: item.widgetType,
          title: item.title,
          text: action.text,
          size: item.size
        } : item
      ))
      return JSON.parse(JSON.stringify(state))
    case 'CHANGE_HEADING_SIZE':
      state.items = state.items.map(item => (
        item.id === action.id ? {
          id: item.id,
          widgetType: item.widgetType,
          title: item.title,
          text: item.text,
          size: action.size
        } : item
      ))
      return JSON.parse(JSON.stringify(state))
    case 'ADD_ITEM':
      return {items:
        [
          ...state.items,
          { title: action.title,
            id: id++,
            itemType: action.itemType
          }
        ]
      }
    case 'DELETE_ITEM':
      return {
        items: state.items.filter(item => (item.id != action.id))
      }
    default:
      return state
  }
}
const stateToPropsMapper = (state) => (
  {
    items: state.items, 
    title: state.title,
  }
)
const dispatcherToPropsMapper = dispatch => ({
  save: () => save(dispatch),
  findAllItems: () => findAllItems(dispatch),
  addItem: () => addItem(dispatch)
})
const App = connect(stateToPropsMapper, dispatcherToPropsMapper)(ListEditor)
const store = createStore(reducer)

export default class WidgetsComponent extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}