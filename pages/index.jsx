import styled from 'styled-components';
import { useState, useEffect } from 'react';
import produce from 'immer';
import Items from '../components/Items';

if (typeof window !== 'undefined') {
  require('materialize-css');
}

const Centred = styled.div`
  //text-align: center;
  margin: 20px;
`;

const Loader = props => props.loading ? <div style={{textAlign:'center'}} id="myLoader">
<br />
<br />
<div className="preloader-wrapper big active">
    <div className="spinner-layer spinner-black-only">
        <div className="circle-clipper left">
            <div className="circle"></div>
        </div>
        <div className="gap-patch">
            <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
            <div className="circle"></div>
        </div>
    </div>
</div>
</div> : <Items data={props.data} subfunc={props.removeNote} /> ;

export default () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getData = localStorage.getItem('data');

      if (getData !== '' && getData !== null) {
        setData(JSON.parse(getData));
      }
    }
    setLoading(false);

    /*if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(err => console.error("Service worker registration failed", err))
    } else {
      console.log("Service worker not supported");*/
  //}
  }, 0);

  const addNote = () => {
    const input = document.querySelector('#noteText').value;

    if (input.trim() !== '') {
      const nextState = produce(data, draftState => {
        draftState.push({ id: Date.now(), data: input });
      });

      setData(nextState);

      if (typeof window !== 'undefined') {
        localStorage.setItem('data', JSON.stringify(nextState));
      }

      document.querySelector('#noteText').value = '';
    }
  };

  const removeNote = id => {
    const nextState = data.filter(el => el.id !== id);
    setData(nextState);

    if (typeof window !== 'undefined') {
      localStorage.setItem('data', JSON.stringify(nextState));
    }
  };

  const handleChange = e => {
    if (e.key === 'Enter') addNote();
  };

  return (
    <Centred>
      <h2>notes</h2>

      <div style={{ display: 'flex' }}>
        <div className="input-field" style={{ flex: 3, paddingRight: '20px' }}>
          <input
            placeholder="What do you wanna do today ?"
            id="noteText"
            type="text"
            onKeyPress={handleChange}
          />
        </div>
        <div style={{ paddingTop: '30px' }}>
          <a className="btn-flat">
            <i className="material-icons" onClick={addNote}>
              send
            </i>
          </a>
        </div>
      </div>
      <Loader loading={loading} data={data} removeNote={removeNote} /> 
    </Centred>
  );
};
