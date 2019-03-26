import styled from 'styled-components';
import { useState } from 'react';
import produce from 'immer';
import Items from '../components/Items';

if (typeof window !== 'undefined') {
  require('materialize-css');
}

const Centred = styled.div`
  //text-align: center;
  margin: 20px;
`;

export default () => {
  const initialData = [{ key: 1, data: 'asd' }, { key: 2, data: 'asdasd' }];
  const [data, setData] = useState(initialData);
  const [key, setKey] = useState(3);

  const logText = () => {
    console.log(data);
    const input = document.querySelector('#noteText').value;
    const nextState = produce(data, draftState => {
      draftState.push({ key, data: input });
    });

    setData(nextState);
    setKey(key + 1);

    console.log(data);
    document.querySelector('#noteText').value = '';
  };

  const handleChange = e => {
    if (e.key === 'Enter') logText();
  };

  return (
    <Centred>
      <h2>todos</h2>

      <div style={{ display: 'flex' }}>
        <div className="input-field" style={{ flex: 3, paddingRight: '20px' }}>
          <input id="noteText" type="text" onKeyPress={handleChange} />
          <label htmlFor="enter-text">What do you wanna do today ?</label>
        </div>
        <div style={{ paddingTop: '30px' }}>
          <i className="material-icons" onClick={ logText }>send</i>
        </div>
      </div>
      <Items data={data} />
    </Centred>
  )
}