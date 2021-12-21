import styled from "styled-components";
import PropTypes from "prop-types";
import { Modal } from "antd";

const StyledModal = styled(Modal)`
  width: fit-content !important;
  top: 40px !important;
  border-radius: 10px !important;
  max-width: 800px !important;
  padding: 0 !important;

  .ant-modal-header {
    border-radius: 8px 8px 0 0 !important;
  }

  .ant-modal-content {
    border-radius: 8px !important;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
    height: calc(100vh - 40px - 40px) !important;
  }

  .ant-modal-body {
    padding: 8px 24px !important;
  }

  @media only screen and (max-width: 1024px) {
    width: 90vw !important;
  }
`;

const Modalr = ({ children, title, visible, closable, onCancel, id }) => {
  // add id to ant-modal-content because of the InfinteScroll component
  const antModalContent =
    document.getElementsByClassName("ant-modal-content")[0];
  if (antModalContent) antModalContent.id = id;

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
  id: PropTypes.string,
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
