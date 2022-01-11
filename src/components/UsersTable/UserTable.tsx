import React, {
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  useState
} from 'react';
import { axiosApiInstance } from 'api/axios';
import { User } from 'redux/reducers/types';
import { Button, Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Notification from 'components/Notification';

interface Props {
  searchData: User[];
  setSearchData: Dispatch<SetStateAction<User[]>>;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export default function UsersTable({
  searchData,
  setSearchData,
  edit,
  setEdit,
  setUser
}: Props): JSX.Element {
  const [page, setPage] = useState<number>(1);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get('users');
      setSearchData(data);
    } catch (e) {
      Notification.openNotificationWithIcon(Notification.Not.error);
      console.log(e);
    }
  }, [setSearchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onFilterContacts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      const normalizeFilter = e.currentTarget.value.toLowerCase();
      const filterValue = searchData.filter(
        ({ first_name, last_name }) =>
          first_name.toLowerCase().includes(normalizeFilter) ||
          last_name.toLowerCase().includes(normalizeFilter)
      );
      setSearchData(filterValue);
    } else {
      fetchData();
    }
  };

  const onHandlerClick = async (id: number, status: boolean) => {
    try {
      await axiosApiInstance.patch(`users/${id}/block`, { isBlocked: status });
      await fetchData();
      Notification.openNotificationWithIcon(Notification.Not.success);
    } catch (e) {
      console.log(e);
      Notification.openNotificationWithIcon(Notification.Not.error);
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
            onChange={onFilterContacts}
            placeholder="Search..."
          />
        );
      },
      render: (_: any, record: User): JSX.Element => {
        return (
          <div>
            {record.first_name} {record.last_name}
          </div>
        );
      }
    },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Status',
      dataIndex: 'isBlocked',
      render: (_: any, record: User): JSX.Element => {
        return record.isBlocked ? (
          <Button danger onClick={() => onHandlerClick(record.id, false)}>
            Unblock
          </Button>
        ) : (
          <Button onClick={() => onHandlerClick(record.id, true)}>Block</Button>
        );
      }
    },
    {
      title: 'Action',
      dataIndex: 'key',
      key: 'x',
      render: (_: any, record: User): JSX.Element => {
        return (
          <a
            onClick={() => {
              setEdit(!edit);
              setUser(record);
            }}
          >
            edit
          </a>
        );
      }
    }
  ];

  return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      dataSource={searchData.reverse()}
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
