import {
  ModalForm,
  ProFormDigit,
  ProFormTextArea,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import type { FC } from 'react';
import { useState } from 'react';
import styles from '../style.less';
import { ArticleItem } from '../data';
import { queryArticleTypeList } from '../service';
import { useRequest } from 'umi';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ArticleItem> | undefined;
  onDone: () => void;
  onSubmit: (values: ArticleItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();
  const [value, setValue] = useState('');

  //读取分类数据
  const { data } = useRequest(() => {
    return queryArticleTypeList({
      current: 1,
      pageSize: 100,
    });
  });

  const dataListOptions = {};
  dataListOptions[0] = { text: '请选择分类',value:'0'};
  const listData = data || [];
  if (listData) {
    listData.map((item) => {
      dataListOptions[item.id] = {
        text: item.name,
        value: item.id,
      };
    });
  }
  //end

  if (!visible) {
    return null;
  }

  const description = (value: any) => {
    return <ReactQuill theme="snow" defaultValue={value} onChange={setValue} />;
  };

  return (
    <ModalForm<ArticleItem>
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
        values.body = value;
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
        <ProFormSelect
          name="articleTypeId"
          width="lg"
          label={intl.formatMessage({
            id: 'pages.article.type.name.label',
          })}
          valueEnum={dataListOptions} 
          initialValue={current?current?.articleType?.id+ '':'0'}
        />
        <ProFormText
          name="title"
          label={intl.formatMessage({
            id: 'pages.article.title',
          })}
          width="lg"
          rules={[
            {
              required: true,
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.article.title.placeholder',
          })}
        />

        <ProFormTextArea
          name="inro"
          label="内容描述"
          rules={[
            {
              message: intl.formatMessage({
                id: 'pages.article.inro.required',
              }),
              min: 5,
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.article.inro.placeholder',
          })}
        />

        <p>
          {intl.formatMessage({
            id: 'pages.article.body',
          })}
        </p>

        {description(current?.body)}

        <ProFormText name="contentTxtUrl" hidden />
        <ProFormDigit name="id" hidden />
      </>
    </ModalForm>
  );
};

export default OperationModal;
