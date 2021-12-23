/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  useState
} from 'react';
import { axiosApiInstance } from 'api/axios';
import { User } from 'redux/reducers/types';
import { Table, Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ChoseStatus from './choseStatus';

interface Props {
  searchData: User[];
  setSearchData: Dispatch<SetStateAction<User[]>>;
}

export default function UsersTable({
  searchData,
  setSearchData
}: Props): JSX.Element {
  const [value, setValue] = useState<string>('');
  const fetchData = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get('users');
      setSearchData(data);
    } catch (e) {
      console.log(e);
    }
  }, [setSearchData]);

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = !value
    ? searchData
    : searchData.filter(
        ({ first_name, last_name }) =>
          first_name.toLowerCase().includes(value.toLowerCase()) ||
          last_name.toLowerCase().includes(value.toLowerCase())
      );

  const columns = [
    {
      title: 'User',
      dataIndex: 'full name',
      filterIcon: () => {
        return <SearchOutlined />;
      },
      filterDropdown: () => {
        return (
          <Input
            type="text"
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            placeholder="Search..."
          />
        );
      },
      render: (_: any, record: User): JSX.Element => {
        return (
          record.dates[0] && (
            <div>
              <Typography.Title level={5}>
                {record.first_name} {record.last_name}
              </Typography.Title>
            </div>
          )
        );
      }
    },
    {
      title: 'Dates',
      dataIndex: 'dates',
      render: (_: any, record: User): JSX.Element => {
        return (
          <>
            {record?.dates?.map(e => {
              return (
                <div key={e.id}>
                  <Typography.Title level={5}>
                    {e.start_day} - {e.end_day}
                  </Typography.Title>
                </div>
              );
            })}
          </>
        );
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (_: any, record: User): JSX.Element => {
        return (
          <>
            {record?.dates?.map(e => {
              return (
                <div key={e.id}>
                  <Typography.Title level={5}>{e.type}</Typography.Title>
                </div>
              );
            })}
          </>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: User): JSX.Element => {
        return (
          <>
            {record?.dates?.map(e => {
              return (
                <div key={e.id}>
                  <ChoseStatus
                    fetchData={fetchData}
                    id={e.id}
                    type={e.status}
                  />
                </div>
              );
            })}
          </>
        );
      }
    }
  ];

  return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      dataSource={filtered}
    />
  );
}
