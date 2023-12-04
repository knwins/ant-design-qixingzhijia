// AsTree.tsx
import { DownOutlined } from '@ant-design/icons';
import { message, Tree } from 'antd';
// import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';

const AS_DownOutlined: any = DownOutlined;

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

interface IProps {
  baseApi: string;
  token: string;
  clickTree: (value: any) => any;
}

const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }

    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }

    return node;
  });

const App: React.FC<IProps> = (props: IProps) => {
  const [treeData, setTreeData] = useState<DataNode[] | []>([]);

  useEffect(() => {
    fetch(`${props.baseApi}/api/efast/v1/entry-doc-lib`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + props.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          });
        }
      })
      .then((resJson) => {
        const typeArr: any = [];
        const user_doc_lib = [];
        const department_doc_lib = [];
        const custom_doc_lib = [];
        const shared_user_doc_lib = [];
        const knowledge_doc_lib = [];

        for (let i = 0; i < resJson.length; i++) {
          if (typeArr.indexOf(resJson[i].type) < 0) {
            typeArr.push(resJson[i].type);
          }

          if (resJson[i].type === 'user_doc_lib') {
            user_doc_lib.push({
              key: resJson[i]['id'],
              title: resJson[i]['name'],
              isLeaf: false,
            });
          } else if (resJson[i].type === 'department_doc_lib') {
            department_doc_lib.push({
              key: resJson[i]['id'],
              title: resJson[i]['name'],
              isLeaf: false,
            });
          } else if (resJson[i].type === 'custom_doc_lib') {
            custom_doc_lib.push({
              key: resJson[i]['id'],
              title: resJson[i]['name'],
              isLeaf: false,
            });
          } else if (resJson[i].type === 'shared_user_doc_lib') {
            shared_user_doc_lib.push({
              key: resJson[i]['id'],
              title: resJson[i]['name'],
              isLeaf: false,
            });
          } else if (resJson[i].type === 'knowledge_doc_lib') {
            knowledge_doc_lib.push({
              key: resJson[i]['id'],
              title: resJson[i]['name'],
              isLeaf: false,
            });
          }
        }

        for (let i = 0; i < typeArr.length; i++) {
          if (typeArr[i] === 'user_doc_lib') {
            typeArr[i] = {
              key: 0,
              title: '个人文档库',
              isLeaf: false,
              children: user_doc_lib,
            };
          } else if (typeArr[i] === 'department_doc_lib') {
            typeArr[i] = {
              key: 1,
              title: '部门文档库',
              isLeaf: false,
              children: department_doc_lib,
            };
          } else if (typeArr[i] === 'custom_doc_lib') {
            typeArr[i] = {
              key: 2,
              title: '自定义文档库',
              isLeaf: false,
              children: custom_doc_lib,
            };
          } else if (typeArr[i] === 'shared_user_doc_lib') {
            typeArr[i] = {
              key: 3,
              title: '共享个人文档库',
              isLeaf: false,
              children: shared_user_doc_lib,
            };
          } else if (typeArr[i] === 'knowledge_doc_lib') {
            typeArr[i] = {
              key: 4,
              title: '知识库',
              isLeaf: false,
              children: knowledge_doc_lib,
            };
          }
        }

        setTreeData(typeArr);
      })
      .catch((err) => message.error(JSON.stringify(err)));
  }, []);

  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      if (children) {
        resolve();
        return;
      }

      fetch(`${props.baseApi}/api/efast/v1/dir/list`, {
        method: 'POST',
        headers: {
          authorization: 'Bearer ' + props.token,
        },
        body: JSON.stringify({
          docid: key,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject({
              status: response.status,
              statusText: response.statusText,
              url: response.url,
            });
          }
        })
        .then((resJson) => {
          const options: any[] = [];

          for (let i = 0; i < resJson.dirs.length; i++) {
            options.push({
              key: resJson.dirs[i]['docid'],
              title: resJson.dirs[i]['name'],
              isLeaf: false,
            });
          }

          for (let i = 0; i < resJson.files.length; i++) {
            options.push({
              key: resJson.files[i]['docid'],
              title: resJson.files[i]['name'],
              isLeaf: true,
            });
          }

          setTreeData((origin) => updateTreeData(origin, key, options));
          resolve();
        })
        .catch((err) => message.error(JSON.stringify(err)));
    });

  const onCheck: any = (checkedKeys: any, info: any) => {
    console.log('onCheck', checkedKeys, info);
    props.clickTree(info);
  };

  return (
    <Tree
      switcherIcon={<AS_DownOutlined />}
      loadData={onLoadData}
      treeData={treeData}
      checkable={true}
      blockNode
      selectable={false}
      onCheck={onCheck}
    />
  );
};

export default App;
