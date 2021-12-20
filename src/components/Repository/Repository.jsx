import styled from "styled-components";
import PropTypes from "prop-types";
import { Tag } from "antd";

const StyledRepository = styled.div`
  display: flex;
  padding: 12px 4px;
  border-bottom: 1px solid #eeeeee;

  .left-container {
    width: 65%;
  }

  .right-container {
    width: 35%;
    display: flex;
    align-items: flex-start;
    padding-top: 20px;
  }

  .repo-name {
    font-size: 1.2rem;
    font-weight: 500;

    > .public-tag {
      margin-left: 10px;
      padding: 0 6px !important;
      font-weight: normal !important;
    }
  }

  .repo-last-update,
  .repo-description {
    color: #999999;
    font-size: 0.9rem;

    > i {
      padding-right: 6px;
    }
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    .left-container {
      width: 100%;
    }

    .right-container {
      padding-top: 10px;
    }

    .repo-name {
      font-size: 1rem;
      white-space: nowrap;
    }

    .repo-description,
    .repo-last-update {
      font-size: 0.8rem;
    }
  }
`;

const StyledTag = styled(Tag)`
  border-radius: 8px !important;
  padding: 4px 12px !important;
  width: fit-content !important;

  > i {
    margin-right: 4px;
  }

  @media only screen and (max-width: 768px) {
    padding: 2px 6px !important;
  }
`;

const Repository = ({ key, repository }) => {
  return (
    <StyledRepository key={key}>
      <div className="left-container">
        <div className="repo-name">
          {repository.full_name}
          {!repository.isPrivate && (
            <StyledTag color="geekblue" className="public-tag">
              Public
            </StyledTag>
          )}
        </div>
        <div className="repo-description">
          <i className="fas fa-align-left" />
          {repository.description?.substring(0, 40)}...
        </div>
        <div className="repo-last-update">
          <i className="fas fa-clock" />
          Last update: {repository.updated_at}
        </div>
      </div>
      <div className="right-container">
        <StyledTag color="gold" className="colored-tag">
          <i className="fas fa-star" />
          {repository.stargazers_count}
        </StyledTag>
        <StyledTag color="green" className="colored-tag">
          <i className="fas fa-eye" />
          {repository.watchers_count}
        </StyledTag>
        <StyledTag color="blue" className="colored-tag">
          <i className="fas fa-code-branch" />
          {repository.watchers_count}
        </StyledTag>
      </div>
    </StyledRepository>
  );
};

Repository.propTypes = {
  key: PropTypes.string,
  repository: PropTypes.object.isRequired,
};

export default Repository;
