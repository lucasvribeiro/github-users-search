import styled from "styled-components";
import PropTypes, { object } from "prop-types";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

import Button from "../Button/Button";

const StyledCard = styled.div`
  background-color: #ffffff;
  display: flex;
  color: #353535;
  width: fit-content;
  position: absolute;
  justify-content: center;
  padding: 80px 0 60px 0;

  box-shadow: 1px 4px 22px -7px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  transition: opacity 0.6s ease-in 0.4s !important;

  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: ${(props) => (props.visible ? "fit-content" : 0)};
  z-index: ${(props) => (props.visible ? 0 : -1)};
  top: ${(props) => (props.top || props.visible ? "24vh" : "-5vh")};

  .back-link {
    position: absolute;
    color: #222222;
    top: -6%;
    left: 2%;
  }

  .profile-page-link {
    position: absolute;
    color: #222222;
    top: -7%;
    right: 2%;
  }

  .card-content {
    width: 100%;
    padding: 0 54px;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
  }

  .card-title {
    border-bottom: 1px solid #eeeeee;
    text-align: center;
    padding-bottom: 12px;

    > h2 {
      margin: 10px 0 0 0;
      line-height: 1.5rem;
    }

    > p {
      margin: 0;
    }
  }

  .card-containers {
    display: flex;
    padding-top: 24px;
    justify-content: space-between;
  }

  .card-extra-content {
    display: flex;
    justify-content: space-around;
  }

  .card-left-container {
    margin-right: 16px;
  }

  .card-left-container > section,
  .card-right-container > section {
    margin-bottom: 16px;
  }

  .card-links {
    margin-top: 24px;
    display: flex;
    justify-content: center;

    > button {
      margin: 0 16px;
    }
  }

  .icon {
    font-size: 1rem;
    color: #bbbbbb;
  }

  .card-orgs {
    border-top: 1px solid #eeeeee;
    padding-top: 10px;

    > img {
      width: 48px;
      height: 48px;
      margin: 0 4px;
      border: 1px solid #dddddd;
      padding: 8px;
      border-radius: 8px;
      box-shadow: 1px 4px 22px -7px rgba(0, 0, 0, 0.25);
    }
  }

  @media only screen and (max-width: 480px) {
    width: 90vw;

    .card-left-container,
    .card-right-container {
      width: 100% !important;
    }

    .card-content {
      padding: 0 24px;
    }

    .card-links > button {
      margin: 0 8px;
    }
  }

  @media only screen and (max-width: 768px) {
    .card-containers {
      flex-direction: column;
    }
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
  width: 128px;
  height: 128px;
  border-radius: 50%;
  position: absolute;
  top: -55px;
  text-align: center;
  box-shadow: 1px 4px 22px -7px rgba(0, 0, 0, 0.3);
`;

const Card = ({
  type,
  user,
  style,
  organizations,
  visible,
  buttons,
  showButtons,
  showBackLink,
  showGoProfilePageLink,
}) => {
  return (
    <StyledCard visible={visible} style={style}>
      {showBackLink && (
        <Link to="/" className="back-link">
          <i className="fas fa-arrow-left" /> &nbsp;Go Back
        </Link>
      )}

      {showGoProfilePageLink && (
        <Link className="profile-page-link" to={`/user/${user?.login}`}>
          Profile Page &nbsp;
          <i className="fas fa-arrow-right" />
        </Link>
      )}

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
              <i className="fas fa-users icon"></i>
              &nbsp;&nbsp;<b>{user?.followers}</b> Followers ·{" "}
              <b> {user?.following}</b> Following
            </section>

            <section>
              <i className="fas fa-building icon"></i>
              &nbsp;&nbsp; {user?.company || "not included"}
            </section>

            {type === "full" && (
              <section>
                <i className="fas fa-calendar icon" />
                &nbsp;&nbsp;Since{" "}
                <b>{new Date(user.created_at).getFullYear()}</b> on GitHub
              </section>
            )}
          </div>

          <div className="card-right-container">
            <section>
              <i className="fas fa-map-marker-alt icon"></i>
              &nbsp;&nbsp; {user?.location || "not included"}
            </section>

            <section>
              <i className="fas fa-globe icon"></i>
              &nbsp;&nbsp; {user?.blog || "not included"}
            </section>

            {type === "full" && (
              <section>
                <i className="fab fa-github icon" />
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  &nbsp;&nbsp;Full profile on GitHub
                </a>
              </section>
            )}
          </div>
        </div>

        {showButtons && (
          <div className="card-links">
            {buttons && buttons.map((button) => button)}
          </div>
        )}

        {type === "full" && organizations && (
          <div className="card-orgs">
            <h4>Organizations:</h4>
            {organizations.map((org) => (
              <Tooltip
                className="tooltip"
                color="#222222"
                title={
                  <a
                    className="tooltip-link"
                    href={`https://github.com/${org.login}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {org.login} &nbsp;
                    <i className="fas fa-external-link-alt" />
                  </a>
                }
                key={org.id}
                mouseEnterDelay={0}
              >
                <img src={org.avatar_url} alt="Organization" />
              </Tooltip>
            ))}
          </div>
        )}
      </div>
    </StyledCard>
  );
};

Card.propTypes = {
  type: PropTypes.string,
  user: PropTypes.object,
  style: PropTypes.object,
  organizations: PropTypes.arrayOf(object),
  visible: PropTypes.bool,
  buttons: PropTypes.arrayOf(Button),
  showButtons: PropTypes.bool,
  showBackLink: PropTypes.bool,
  showGoProfilePageLink: PropTypes.bool,
};

Card.defaultProps = {
  type: "short",
  visible: false,
  showButtons: true,
  showBackLink: false,
  showGoProfilePageLink: false,
};

export default Card;
