import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl, useRequest } from '@umijs/max';
import type { FC } from 'react';
import { OptionItem } from '../data';
import { queryOptionMark } from '../service';

type OptionModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<OptionItem> | undefined;
  onDone: () => void;
  onSubmit: (values: OptionItem) => void;
};

const OptionModel: FC<OptionModelProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  //读取属性数据
  const { data: marks } = useRequest(() => {
    return queryOptionMark({
      current: 1,
      pageSize: 100,
      type: 'CELL',
    });
  });

  const markListOptions = {};
  if (marks) {
    marks.map((item) => {
      markListOptions[item.key] = {
        text: item.label,
        value: item.key,
      };
    });
  }

  return (
    <ModalForm<OptionItem>
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
            id: 'pages._option.name',
          })}
          width="lg"
          rules={[
            {
              required: true,
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages._option.name.placeholder',
          })}
        />

        <ProFormSelect
          name="mark"
          label={intl.formatMessage({
            id: 'pages._option.mark',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages._option.mark.placeholder',
          })}
          valueEnum={markListOptions}
        />
      </>
    </ModalForm>
  );
};
export default OptionModel;
