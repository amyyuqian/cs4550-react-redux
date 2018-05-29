import React from 'react';
import Widget from '../components/Widget';

const WidgetList = ({ widgets }) => (
  <ul>
    {widgets.map(widget =>
       <Widget key={widget.id}
                 widget={widget}/>)}
  </ul>)

export default WidgetList;