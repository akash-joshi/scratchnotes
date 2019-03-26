export default props =>
props.data.length > 0 ? (
  props.data.map(note => <div key={note.key}>{note.data}</div>)
  ) : (
    <div>Nothing to see</div>
  );
