import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';

import { ProductItem, ProductStockItem } from '../data';

type StockAddModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ProductItem> | undefined;
  currentStock: Partial<ProductStockItem> | undefined;
  onDone: () => void;
  onSubmit: (values: ProductStockItem) => void;
};

const StockAddModel: FC<StockAddModelProps> = (props) => {
  const { done, visible, current, currentStock,onDone, onSubmit, children } = props;
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<ProductStockItem>
      visible={visible}
      title="添加库存"
      width={540}
      initialValues={current}
      onFinish={async (values) => {
        onSubmit(values);
      }}
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
        <ProFormDigit name="productId" initialValue={current?.id} hidden />
        <ProFormText name="action" initialValue="addProductStock" hidden />
        <ProFormText name="productStockId" initialValue={currentStock?.id} hidden />
        <ProFormText
          name="number"
          label={intl.formatMessage({
            id: 'pages.product.number',
          })}
          width="md"
          disabled
        />
        <ProFormDigit
          name="_qty"
          label={intl.formatMessage({
            id: 'pages.product.stock.qty',
          })}
          width="sm"
        />
      </>
    </ModalForm>
  );
};
export default StockAddModel;
