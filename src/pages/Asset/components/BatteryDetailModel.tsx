import ProForm, { ModalForm, ProFormDateTimePicker, ProFormSelect,ProFormText } from '@ant-design/pro-form';
import { type FC } from 'react';
import { BatteryDetailItem } from '../data';
import styles from './style.less';
type BatteryDetailModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<BatteryDetailItem> | undefined;
  onDone: () => void;
};

const BatteryDetailModel: FC<BatteryDetailModelProps> = (props) => {
  const { done, visible, current, onDone, children } = props;

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<BatteryDetailItem>
      visible={visible}
      title="电池详细数据"
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
            <ProFormText name="state" label="电池状态" readonly />
            <ProFormText name="controllerState" label="电池控制状态" readonly />
          </ProForm.Group>

          <ProForm.Group title="基础数据">
            <ProFormSelect name="soc" width="md" label="SOC(%)" readonly />
            <ProFormSelect name="mileage" width="md" label="GPS里程(公里)" readonly />
            <ProFormSelect name="cycleNumbers" width="md" label="循环次数" readonly />
            <ProFormSelect name="runningDays" width="md" label="运行天数" readonly />
          </ProForm.Group>

          <ProForm.Group title="其他数据">
            <ProFormSelect name="totalVoltage" width="md" label="总电压(V)" readonly />
            <ProFormSelect name="totalCurrent" width="md" label="总电流(A)" readonly />
            <ProFormSelect name="balanceCurrent" width="md" label="剩余容量(Ah)" readonly />
            <ProFormSelect name="totalDisCharge" width="md" label="总放电(Ah)" readonly />
            <ProFormSelect name="totalCharge" width="md" label="总充电(Ah)" readonly />
          </ProForm.Group>

          <ProForm.Group title="异常数据">
          <ProFormSelect name="tipMessage" width="md" label="天数超期" readonly />
          </ProForm.Group>

          
          <ProFormSelect name="address" width="md" label="最新位置信息" readonly />
        </div>
      </>
    </ModalForm>
  );
};
export default BatteryDetailModel;
