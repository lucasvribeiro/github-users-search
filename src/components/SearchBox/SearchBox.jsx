import styled from "styled-components";
import PropTypes from "prop-types";

import loadingGif from "../../images/loading.gif";
import lens from "../../images/lens.png";

const SearchStyled = styled.div`
  --background: #ffffff;
  --text-color: #414856;
  --primary-color: #111111;
  --width: 90vw;
  --height: 64px;

  border: 1px solid #eeeeee;

  background: var(--background);
  width: var(---width);
  height: var(--height);

  max-width: 600px;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  box-shadow: 1px 4px 22px -7px rgba(0, 0, 0, 0.3);

  input:not(:placeholder-shown) {
    ~ button {
      display: block !important;
      background: var(--primary-color) !important;
      width: 70px !important;
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

  button {
    position: absolute;
    font-weight: 500;
    background: #ffffff;
    border-radius: 0 10px 10px 0;
    font-size: 1.2rem;
    height: 100%;
    color: #ffffff;

    top: 0;
    right: 0;
    width: 0;
    border: 0;

    transition: all 0.3s cubic-bezier(0, 0, 0.43, 1.49);
    cursor: pointer;
  }
`;

const SearchBox = ({ loading, onInputChange, onButtonClick }) => {
  // Trigger Button when pressed 'Enter'
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onButtonClick();
    }
  };

  return (
    <SearchStyled>
      <input
        type="text"
        disabled={loading}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search Github users..."
      />

      <img src={lens} alt="Search Icon" className="lens" />
      <button type="submit" onClick={onButtonClick}>
        {loading ? (
          <img src={loadingGif} alt="Loading" style={{ width: "24px" }} />
        ) : (
          "Go"
        )}
      </button>
    </SearchStyled>
  );
};

SearchBox.propTypes = {
  loading: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  loading: false,
};

export default SearchBox;
