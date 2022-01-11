import { Dispatch, SetStateAction, useState } from 'react';
import { Input, Form, Select } from 'antd';
import { eng } from 'helpers/eng';
import { emailPattern } from 'helpers/patterns';
import { axiosApiInstance } from 'api/axios';
import { User } from 'redux/reducers/types';
import { accessUser } from 'helpers/constants';
import { CustomForm, CustomItem, CustomButton } from './styles';
import { useSelector } from 'react-redux';
import selectors from 'redux/selectors';

interface Props {
  setSearchData: Dispatch<SetStateAction<User[]>>;
}
interface OnCreate {
  first_name: string;
  last_name: string;
  email: string;
  roles: string;
}

export default function UserForm({ setSearchData }: Props): JSX.Element {
  const user = useSelector(selectors.getUser);
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>(accessUser.employee);

  const onFinish = async (values: OnCreate) => {
    console.log({ ...values, roles: value });
    try {
      const { data } = await axiosApiInstance.post<User>(
        `auth/registration`,
        values
      );
      setSearchData(prev => {
        return [data, ...prev];
      });
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CustomForm form={form} onFinish={onFinish} layout="vertical">
      <CustomItem name="first_name" rules={[{ required: true }]}>
        <Input placeholder="First Name" />
      </CustomItem>
      <CustomItem name="last_name" rules={[{ required: true }]}>
        <Input placeholder="Last Name" />
      </CustomItem>
      <CustomItem
        name="email"
        rules={[
          {
            required: true,
            pattern: emailPattern,
            message: 'Please check your email'
          }
        ]}
      >
        <Input placeholder="e-mail" />
      </CustomItem>

      {user?.role === 'super' && (
        <CustomItem name="roles">
          <Select
            defaultValue="user"
            value={value}
            onChange={e => setValue(e)}
            style={{ width: '40%' }}
          >
            <Select.Option value={accessUser.employee}>
              {' '}
              {accessUser.employee}
            </Select.Option>
            <Select.Option value={accessUser.admin}>
              {accessUser.admin}{' '}
            </Select.Option>
            <Select.Option value={accessUser.superAdmin}>
              {accessUser.superAdmin}{' '}
            </Select.Option>
          </Select>
        </CustomItem>
      )}

      <CustomItem>
        <CustomButton htmlType="submit" type="primary">
          {eng.button__addUser}
        </CustomButton>
      </CustomItem>
    </CustomForm>
  );
}
