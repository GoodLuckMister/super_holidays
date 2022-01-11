/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import selectors from 'redux/selectors';
import ProfileTable from 'components/ProfileTable';
import Calendar from 'components/Calendar';
import { Row } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import { axiosApiInstance } from 'api/axios';
import { StyledContent, StyledLayout } from './styles';
import { TypeUserDates } from 'redux/reducers/types';

const date: Date = new Date();

export default function ProfileView(): JSX.Element {
  const [dates, setDates] = useState<TypeUserDates[]>([]);
  const user = useSelector(selectors.getUser);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get(`booking/${user?.id}`);
      setDates(data);
    } catch (e) {
      console.log(e);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <StyledLayout>
      <StyledContent>
        <Row style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '25px' }}>
            {user?.first_name}-{user?.last_name}
          </h1>
        </Row>
        <Row style={{ marginBottom: '30px' }}>
          <p style={{ fontSize: '20px', marginRight: '50px' }}>
            {user?.total_sick_leaves} sick leaves
          </p>
          <p style={{ fontSize: '20px' }}>
            {user?.total_vacations} vacation days
          </p>
        </Row>
        <Row justify="end" style={{ marginBottom: '30px' }}>
          <Calendar dayToDay={date} setDates={setDates} id={user?.id} />
        </Row>
        <ProfileTable dates={dates} />
      </StyledContent>
    </StyledLayout>
  );
}
