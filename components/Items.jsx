import styled from 'styled-components';

if (typeof window !== 'undefined') { 
  require('materialize-css');
}

const ItemWrapper = styled.div`
  border: 1px solid #e0d6d6;
  margin-top: 2px;
  padding: 10px;
  border-radius: 10px;
`;

const TextWrapper = styled.div`
  width: 85%;
`;

const Item = props => (
  <ItemWrapper className="valign-wrapper">
    <TextWrapper>{props.data}</TextWrapper>
    <div className="right-align">
      <a onClick={() => props.subfunc(props.id)} className="btn-flat">
        <i className="small material-icons">delete</i>
      </a>
    </div>
  </ItemWrapper>
);

export default props =>
  props.data.length > 0 ? (
    props.data.map(note => (
      <Item key={note.id} id={note.id} data={note.data} subfunc={props.subfunc} />
    ))
  ) : (
    <div>You haven't added any notes. Add them above !</div>
  );
