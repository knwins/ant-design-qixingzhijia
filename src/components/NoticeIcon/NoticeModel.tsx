import { ArticleItem } from '@/pages/Information/data';
import { Modal } from 'antd';
import React from 'react';

export type NoticeFormProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ArticleItem>;
  onCancel: () => void;
  onDone: () => void;
};

const NoticeForm: React.FC<NoticeFormProps> = (props) => {
  const { visible, current, onDone, onCancel } = props;

  if (!visible) {
    return null;
  }

  return (
    <Modal
      footer={false}
      visible={visible}
      title={current.title}
      width={640}
      onCancel={onCancel}
      onOk={onDone}
    >
      <div dangerouslySetInnerHTML={{__html: current.title}} key=""></div>
    </Modal>
  );
};

export default NoticeForm;
