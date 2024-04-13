import {
  ModalForm,
  ProFormDigit,
  ProFormTextArea,
  ProFormText,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import styles from '../style.less';
import { ExpressItem } from '../data';
type ExpressModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ExpressItem> | undefined;
  onDone: () => void;
  onSubmit: (values: ExpressItem) => void;
};

const ExpressModel: FC<ExpressModelProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<ExpressItem>
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
      className={styles.standardListForm}
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
        <ProFormText
          name="title"
          label={intl.formatMessage({
            id: 'pages.express.title',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.express.title.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.express.title.placeholder',
          })}
        />

        <ProFormTextArea
          name="content"
          label={intl.formatMessage({
            id: 'pages.express.content',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.express.content.required',
              }),
              min: 5,
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.express.content.placeholder',
          })}
        />
        <ProFormDigit name="id" hidden />
      </>

      <ProFormText
        name="title"
        label={intl.formatMessage({
          id: 'pages.express.title',
        })}
        width="lg"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.express.title.required',
            }),
          },
        ]}
        placeholder={intl.formatMessage({
          id: 'pages.express.title.placeholder',
        })}
      />

      <ProFormDatePicker
        name="showEndtime"
        label={intl.formatMessage({
          id: 'pages.express.showEndtime',
        })}
        width="lg"
        
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.express.showEndtime.required',
            }),
          },
        ]}
        placeholder={intl.formatMessage({
          id: 'pages.express.showEndtime.placeholder',
        })}
      />
    </ModalForm>
  );
};

export default ExpressModel;
