import styled from "styled-components";
import PropTypes from "prop-types";

import loadingGif from "../../images/loading.gif";

const StyledButton = styled.button`
  height: 48px;
  width: 164px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 1px 4px 22px -7px rgba(0, 0, 0, 0.3);
  transition: all 0.4s;

  color: ${({ type, color }) => (type === "primary" ? "#ffffff" : color)};
  background: ${({ type, color }) =>
    type === "primary" ? color : `${color}15`};

  border: ${({ type, color }) =>
    type === "primary" ? "none" : `1px solid ${color}`};

  &:hover {
    background: ${({ type, color }) => type === "primary" && `${color}cc`};
  }

  &:disabled {
    background: ${({ type, color }) => type === "primary" && `${color}77`};
    cursor: not-allowed;
  }

  > i {
    margin-right: 6px;
  }

  > img {
    width: 14px;
    height: 14px;
    margin-right: 6px;
    color: ${({ type, color }) => (type === "primary" ? "#ffffff" : color)};
  }

  @media only screen and (max-width: 768px) {
    height: 42px;
    width: 128px;
    font-size: 0.9rem;
  }
`;

const Button = ({
  children,
  type,
  color,
  loading,
  disabled,
  icon,
  onClick,
}) => {
  return (
    <StyledButton
      type={type}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <img src={loadingGif} alt="Loading" />
      ) : (
        <i className={`fas fa-${icon}`} />
      )}
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: "primary",
  color: "#1179da",
  loading: false,
  disabled: false,
};

export default Button;
