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
import Notification from 'components/Notification';

interface Props {
  searchData: User[];
  setSearchData: Dispatch<SetStateAction<User[]>>;
}

export default function UsersTable({
  searchData,
  setSearchData
}: Props): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [value, setValue] = useState<string>('');
  const [filtered, setFiltered] = useState<User[]>([]);
  let canceled = false;
  const fetchData = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get('users');
      if (!canceled) {
        setSearchData(data);
        setFiltered(data.filter((e: User) => e.dates[0]));
      }
    } catch (e) {
      Notification.openNotificationWithIcon(Notification.Not.error);
      console.log(e);
    }
  }, [setSearchData]);

  useEffect(() => {
    fetchData();
    return () => {
      canceled = true;
    };
  }, []);

  const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    if (e.currentTarget.value) {
      const normalizeFilter = e.currentTarget.value.toLowerCase();
      const filterValue = searchData.filter(
        ({ first_name, last_name }) =>
          first_name.toLowerCase().includes(normalizeFilter) ||
          last_name.toLowerCase().includes(normalizeFilter)
      );
      setFiltered(filterValue);
    } else {
      setFiltered(searchData.filter((element: User) => element.dates[0]));
    }
  };

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
            onChange={e => onFilter(e)}
            placeholder="Search..."
          />
        );
      },
      render: (_: any, record: User): JSX.Element => {
        return (
          record?.dates[0] && (
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
                    {e.start_day.toString().split(':')[0].slice(0, 10)} -{' '}
                    {e.end_day.toString().split(':')[0].slice(0, 10)}{' '}
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
      rowKey={record => record?.id}
      columns={columns}
      dataSource={filtered}
      pagination={{
        current: page,
        pageSize: 5,
        onChange: e => {
          setPage(e);
        }
      }}
    />
  );
}
