import styled from '@emotion/styled';
import { Table } from 'antd';
import { RowSelectionType } from 'antd/lib/table/interface';
import { useEffect, useState } from 'react';

const CTable = ({dataSource, columns, selectionType, selected, service}: CTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [service])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log(newSelectedRowKeys)
    selected(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSelection = () => {
    if (service != "5") {
      return (
        {
          type: selectionType,
          preserveSelectedRowKeys: false,
          ...rowSelection,
        }
      )
    }
  }

  return (
    <STable
      rowSelection={handleSelection()}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default CTable;

export interface CTableProps {
  dataSource: any[];
  columns: any[];
  selectionType: RowSelectionType | undefined;
  selected: any;
  service: any;
}

const STable = styled(Table)`
  margin-bottom: 20px;
  .ant-table-pagination {
    display: none;
  }
	.ant-table-tbody {
		border-left: 0.5px solid #A7A7A7;
	}
	.ant-table-tbody > tr > td:first-of-type {
    border-left: 0.5px solid #A7A7A7;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 0.5px solid #A7A7A7;
		border-right: 0.5px solid #A7A7A7;
    padding: 10px;
		font-size: 16px;
		color: var(--color-primary);
  }
  .ant-table-thead > tr > th {
    background: var(--color-secondary);
    color: var(--color-white);
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    border: none;
  }
  .ant-table-container table > thead > tr:first-of-type {
    th:first-of-type {
      border-top-left-radius: 0;
    }
    th:last-child {
      border-top-right-radius: 0;
    }
  }
`;