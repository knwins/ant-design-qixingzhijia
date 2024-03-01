import ProForm, {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { type FC } from 'react';
import { CabinetDetailItem } from '../data';
import styles from './style.less';
type CabinetDetailModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<CabinetDetailItem> | undefined;
  onDone: () => void;
};

const CabinetDetailModel: FC<CabinetDetailModelProps> = (props) => {
  const { done, visible, current, onDone, children } = props;

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<CabinetDetailItem>
      visible={visible}
      title="电柜详细数据"
      width={640}
      initialValues={current}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
      submitter={{ submitButtonProps: { style: { display: 'none' } } }}
    >
      <>
        <div className={styles.order}>
          <ProForm.Group title="时间信息">
            <ProFormDateTimePicker name="readTime" label="读取时间" readonly />
            <ProFormDateTimePicker name="updateTime" label="GPS最后更新时间" readonly />
          </ProForm.Group>

          <ProForm.Group title="柜门数据">

            <ProFormText name="serviceState" label="业务状态" readonly />
            
          </ProForm.Group>

          <ProFormSelect name="address" width="md" label="最新位置信息" readonly />
        </div>
      </>
    </ModalForm>
  );
};
export default CabinetDetailModel;
