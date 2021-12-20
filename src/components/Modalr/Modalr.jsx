import styled from "styled-components";
import PropTypes from "prop-types";
import { Modal } from "antd";

const StyledModal = styled(Modal)`
  width: fit-content !important;
  top: 40px !important;
  border-radius: 20px !important;
  max-width: 800px !important;

  .ant-modal-content {
    border-radius: 8px !important;
  }

  .ant-modal-header {
    border-radius: 8px 8px 0 0 !important;
  }

  @media only screen and (max-width: 1024px) {
    width: 90vw !important;
  }
`;

const Modalr = ({ children, title, visible, closable, onCancel }) => {
  return (
    <StyledModal
      title={title}
      visible={visible}
      closable={closable}
      onCancel={onCancel}
      footer={null}
    >
      {children}
    </StyledModal>
  );
};

Modalr.propTypes = {
  title: PropTypes.any,
  visible: PropTypes.bool,
  closable: PropTypes.bool,
  onCancel: PropTypes.func,
};

Modalr.defaultProps = {
  visible: false,
  closable: true,
};

export default Modalr;
