import { ModalForm, ProFormMoney, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from '@umijs/max';
import { useRequest } from 'umi';
import type { BillInvestItem, BillInvestParams} from '../../Bill/data';
import { UserItem } from '../data';
import {queryBillTypeList} from '../../Bill/service';
export type PageParams = {
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
};

export type CreateFormProps = {
  visible: boolean;
  current: Partial<UserItem>;
  onCancel: (flag?: boolean, formVals?: BillInvestParams) => void;
  onDone: () => void;
  onSubmit: (values: BillInvestItem) => Promise<void>;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { visible, onDone,current, onSubmit, children } = props;

  //国际化
  const intl = useIntl();


  //读取分类数据
  const { data } = useRequest(() => {
    return queryBillTypeList({
      current: 1,
      pageSize: 100,
    });
  });

  const dataListOptions = {};

  const listData = data || [];
  if (listData) {
    listData.map((item) => {
      dataListOptions[item.id] = {
        text: item.name,
      };
    });
  }
  //end

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<BillInvestItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.new',
      })}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
      }}
    >
      <>
         
      <ProFormText
          name="userId"
          width="md"
          initialValue={current.id}
          hidden={true}
        />

        <ProFormSelect
          name="billTypeId"
          width="lg"
          label={intl.formatMessage({
            id: 'pages.bill.type.name.label',
          })}
          valueEnum={dataListOptions}
        />

        <ProFormMoney
          name="amount"
          label={intl.formatMessage({
            id: 'pages.bill.amount',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.bill.amount.placeholder',
          })}
        />

        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.bill.name.label',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.bill.name.placeholder',
          })}
        />
      </>
    </ModalForm>
  );
};

export default CreateForm;
