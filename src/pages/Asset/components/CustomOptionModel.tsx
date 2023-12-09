import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import { CustomOptionItem } from '../data';

type CustomOptionModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<CustomOptionItem> | undefined;
  onDone: () => void;
  onSubmit: (values: CustomOptionItem) => void;
};

const CustomOptionModel: FC<CustomOptionModelProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<CustomOptionItem>
      visible={visible}
      title={
        done
          ? null
          : `${
              current?.id
                ? intl.formatMessage({
                    id: 'pages.edit',
                  })
                : intl.formatMessage({
                    id: 'pages.new',
                  })
            }`
      }
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      <>
        <ProFormDigit name="id" hidden />
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.customoption.name',
          })}
          width="lg"
          rules={[
            {
              required: true,
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.customoption.name.placeholder',
          })}
        />

        <ProFormSelect
          name="mark"
          label={intl.formatMessage({
            id: 'pages.customoption.mark',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.customoption.mark.placeholder',
          })}
          options={[
            { label: '电池品牌', value: 'CellBrand' },
            { label: '电池运营商', value: 'CellBusiness' },
            { label: '电池规格', value: 'CellSpec' },
          ]}
        />
      </>
    </ModalForm>
  );
};
export default CustomOptionModel;
