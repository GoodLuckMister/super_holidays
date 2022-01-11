import { useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosApiInstance } from 'api/axios';
import selector from 'redux/selectors/selectors';
import { Status } from 'redux/reducers/types';
import { Select, Button } from 'antd';
import { accessUser } from 'helpers/constants';
import { WrapperButtons } from 'helpers/globalStyle';
import Notification from 'components/Notification';

const { Option } = Select;

interface Props {
  type: Status;
  id: number;
  fetchData: () => void;
}

export default function ChoseStatus({
  type,
  id,
  fetchData
}: Props): JSX.Element {
  const user = useSelector(selector.getUser);
  const [value, setValue] = useState<Status>(type);

  const onHandlerClick = async (idStatus: number, status: Status) => {
    try {
      await axiosApiInstance.patch(`booking/${idStatus}/status`, {
        status: status
      });
      fetchData();
      Notification.openNotificationWithIcon(Notification.Not.success);
    } catch (e) {
      console.log(e);
      Notification.openNotificationWithIcon(Notification.Not.error);
    }
  };

  const onHandlerDelete = async (idStatus: number) => {
    try {
      await axiosApiInstance.delete(`booking/${idStatus}`);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function handleChange(v: Status) {
    setValue(v);
  }
  return (
    <>
      <WrapperButtons>
        <Select style={{ width: 120 }} onChange={handleChange} value={value}>
          <Option value={Status.PENDING}>{Status.PENDING}</Option>
          <Option value={Status.APPROVED}>{Status.APPROVED}</Option>
          <Option value={Status.REJECTED}>{Status.REJECTED}</Option>
        </Select>
        <Button onClick={() => onHandlerClick(id, value)}>Edit</Button>
        {user?.role === accessUser.superAdmin && (
          <Button onClick={() => onHandlerDelete(id)} danger>
            Remove
          </Button>
        )}
      </WrapperButtons>
    </>
  );
}
