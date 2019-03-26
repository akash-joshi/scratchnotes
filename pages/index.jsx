import styled from 'styled-components';

if (typeof window !== 'undefined') {
  require('materialize-css');
}

const Centred = styled.div`
  //text-align: center;
  margin: 20px;
`;

export default () => {
  return (
    <Centred>
      <h2>todos</h2>

      <div style={{display:'flex'}}>
        <div className="input-field" style={{flex:3,paddingRight:'20px'}}>
              <input type="text" />
              <label>What do you wanna do today ?</label>
          </div>
          <div style={{paddingTop:'30px'}}>
          <i class="material-icons">send</i>
          </div>
      </div>
    </Centred>
  )
}