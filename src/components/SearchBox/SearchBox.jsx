import styled from "styled-components";

import loading from "../../images/loading.gif";
import lens from "../../images/lens.png";

const SearchStyled = styled.div`
  --background: #ffffff;
  --text-color: #414856;
  --primary-color: #111111;
  --width: 90vw;
  --height: 64px;

  background: var(--background);
  width: var(---width);
  height: var(--height);
  max-width: 600px;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 1px 4px 22px -7px rgba(0, 0, 0, 0.3);

  position: absolute;
  transition: all 0.6s ease;
  top: 50%;

  /* show button when input has any text */
  input:not(:placeholder-shown) {
    ~ .submit-button {
      display: block !important;
      background: #111111 !important;
      width: 60px !important;
    }
  }

  input[type="text"] {
    position: relative;
    width: var(--width);
    height: var(--height);
    font-size: 1rem;
    color: var(--text-color);
    border: 0;
    box-sizing: border-box;
    outline: none;
    padding: 0 0 0 50px;
  }

  .lens {
    width: 20px;
    top: 20px;
    left: 20px;

    position: absolute;
    filter: invert(0%) sepia(3%) saturate(6%) hue-rotate(326deg) brightness(95%)
      contrast(87%);
  }

  .submit-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    font-weight: bold;
    background: #ffffff;
    border-radius: 0 10px 10px 0;

    height: 100%;
    border: 0;
    color: #ffffff;
    font-size: 1rem;

    transition: all 0.3s cubic-bezier(0, 0, 0.43, 1.49);
    cursor: pointer;
  }

  .loading {
    width: 24px;
  }
`;

// const StyledButton = styled.button``;

const SearchBox = (props) => {
  return (
    <SearchStyled style={props.user ? { top: "10%" } : { top: "50%" }}>
      <input
        type="text"
        placeholder="buscar usuário..."
        disabled={props.loading}
        onChange={props.onChange}
      />
      <div className="symbol">
        <img src={lens} alt="Search Icon" className="lens" />
      </div>

      <button type="submit" className="submit-button" onClick={props.onClick}>
        {props.loading ? (
          <img src={loading} alt="Loading" className="loading" />
        ) : (
          "Ir"
        )}
      </button>
    </SearchStyled>
  );
};

export default SearchBox;
