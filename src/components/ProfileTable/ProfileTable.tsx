import { useState } from 'react';
import { TypeUserDates, Status, VacationType } from 'redux/reducers/types';
import { FIRST_PAGE, PAGE_SIZE } from './const';
import { Table, Typography } from 'antd';

interface Props {
  dates: TypeUserDates[] | undefined;
}

export default function ProfileTable(props: Props): JSX.Element {
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [pageSize] = useState<number>(PAGE_SIZE);

  const columns = [
    {
      key: '1',
      title: 'DATES',
      dataIndex: 'dates',
      render: (_: any, e: TypeUserDates): JSX.Element => {
        return (
          <Typography.Title level={5}>
            {e.start_day.toString().split(':')[0].slice(0, 10)} -{' '}
            {e.end_day.toString().split(':')[0].slice(0, 10)}{' '}
          </Typography.Title>
        );
      }
    },
    {
      key: '3',
      title: 'STATUS',
      dataIndex: 'status',
      render: (status: Status): JSX.Element => {
        return <Typography.Title level={5}>{status}</Typography.Title>;
      }
    },
    {
      key: '4',
      title: 'TYPE',
      dataIndex: 'type',
      render: (type: VacationType): JSX.Element => {
        return <Typography.Title level={5}>{type}</Typography.Title>;
      }
    }
  ];

  return (
    <div className="table">
      <Table
        rowKey={record => record.id}
        columns={columns}
        dataSource={props?.dates?.reverse()}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: e => {
            setPage(e);
          }
        }}
      ></Table>
    </div>
  );
}
