import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const StyledCard = styled.div`
  background-color: #ffffff;
  display: flex;
  color: #353535;
  width: 50vw;
  position: absolute;
  justify-content: center;
  padding: 80px 0 60px 0;

  box-shadow: 1px 4px 22px -7px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  transition: opacity 0.6s ease-in 0.4s !important;

  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: ${(props) => (props.visible ? "fit-content" : 0)};
  z-index: ${(props) => (props.visible ? 0 : -1)};
  top: ${(props) => (props.visible ? "28vh" : 0)};

  .card-content {
    width: 100%;
    padding: 0 54px;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    border-bottom: 1px solid #eeeeee;
    text-align: center;

    > h2 {
      margin: 0;
    }

    > p {
      margin: 0 0 12px 0;
    }
  }

  .card-containers {
    display: flex;
    padding-top: 24px;
    justify-content: space-around;
  }

  .card-left-container > section,
  .card-right-container > section {
    margin-bottom: 16px;

    > i {
      font-size: 1rem;
      color: #bbbbbb;
    }
  }

  .card-links {
    margin-top: 24px;
    display: flex;
    justify-content: center;

    > button {
      margin: 0 16px;
    }
  }

  @media only screen and (max-width: 480px) {
    width: 90vw;

    .card-left-container,
    .card-right-container {
      width: 100% !important;
    }

    .card-links {
      justify-content: space-between;

      > button {
        margin: 0;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    width: 90vw !important;

    .card-containers {
      flex-direction: column;
      align-items: center;
    }

    .card-left-container,
    .card-right-container {
      width: 70%;
    }

    .card-content {
      padding: 0 24px;
    }
  }

  @media only screen and (max-width: 1200px) {
    width: 70vw;
  }
`;

const TopBar = styled.div`
  width: 100%;
  height: 8px;
  top: 0;
  position: absolute;
  background: radial-gradient(circle at 50%, #ffffff, #eeeeee, #cccccc);
  border-radius: 10px 10px 0 0;
`;

const Avatar = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  position: absolute;
  top: -75px;
  text-align: center;
  box-shadow: 1px 4px 22px -7px rgba(0, 0, 0, 0.3);
`;

const Card = ({ user, visible, buttons }) => {
  return (
    <StyledCard visible={visible}>
      <TopBar />
      <Avatar src={user?.avatar_url} alt="Avatar" />

      <div className="card-content">
        <div className="card-title">
          <h2>{user?.name}</h2>
          <p>@{user?.login}</p>
        </div>

        <div className="card-containers">
          <div className="card-left-container">
            <section>
              <i className="fas fa-users"></i>
              &nbsp;&nbsp;<b>{user?.followers}</b> Followers ·{" "}
              <b> {user?.following}</b> Following
            </section>

            <section>
              <i className="fas fa-building"></i>
              &nbsp;&nbsp; {user?.company || "not included"}
            </section>
          </div>

          <div className="card-right-container">
            <section>
              <i className="fas fa-map-marker-alt"></i>
              &nbsp;&nbsp; {user?.location || "not included"}
            </section>

            <section>
              <i className="fas fa-globe"></i>
              &nbsp;&nbsp; {user?.blog || "not included"}
            </section>
          </div>
        </div>
        <div className="card-links">{buttons.map((button) => button)}</div>
      </div>
    </StyledCard>
  );
};

Card.propTypes = {
  user: PropTypes.object,
  visible: PropTypes.bool,
  buttons: PropTypes.arrayOf(Button),
};

Card.defaultProps = {
  visible: false,
};

export default Card;
