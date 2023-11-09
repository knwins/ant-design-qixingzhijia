import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import React from 'react';
import styles from '../style.less';
import type { ArticleTypeItem } from '../data';

export type ArticleTypeModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ArticleTypeItem>;
  onDone: () => void;
  onSubmit: (values: ArticleTypeItem) => void;
};

const ArticleTypeModel: React.FC<ArticleTypeModelProps> = (props) => {
  const { done, visible, onDone, current, onSubmit, children } = props;

  //国际化
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<ArticleTypeItem>
      visible={visible}
      title={
        done
          ? null
          : `${
              current.id
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
      <ProFormText name="id" hidden={true} initialValue={current.id} />

      <>
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.article.type.name.label',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.article.type.name.placeholder',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.article.type.name.required',
              }),
            },
          ]}
          initialValue={current.name}
        />

        <ProFormText
          name="mark"
          label={intl.formatMessage({
            id: 'pages.article.type.mark.label',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.article.type.mark.placeholder',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.article.type.mark.required',
              }),
            },
          ]}
          initialValue={current.mark}
        />

        <ProFormTextArea
          name="description"
          label={intl.formatMessage({
            id: 'pages.article.type.description.label',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.article.type.description.placeholder',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.article.type.description.required',
              }),
            },
          ]}
          initialValue={current.description}
        />

        <ProFormText
          name="thumbImgWidth"
          label={intl.formatMessage({
            id: 'pages.article.type.thumbImgWidth',
          })}
          width="sm"
          placeholder={intl.formatMessage({
            id: 'pages.article.type.thumbImgWidth.placeholder',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.article.type.thumbImgWidth.required',
              }),
            },
          ]}
          initialValue={current.thumbImgWidth}
        />

        <ProFormText
          name="thumbImgHeight"
          label={intl.formatMessage({
            id: 'pages.article.type.thumbImgHeight',
          })}
          width="sm"
          placeholder={intl.formatMessage({
            id: 'pages.article.type.thumbImgHeight.placeholder',
          })}
          initialValue={current.thumbImgHeight}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.article.type.thumbImgHeight.required',
              }),
            },
          ]}
        />
      </>
    </ModalForm>
  );
};

export default ArticleTypeModel;
