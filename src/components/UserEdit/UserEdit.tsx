import ProfileTable from 'components/ProfileTable';
import Calendar from 'components/Calendar';
import { Row } from 'antd';
import { StyledContent, StyledLayout } from 'pages/ProfileView/styles';
import { User } from 'redux/reducers/types';

interface Props {
  user: User | null;
}
const date = new Date();

export default function EditView({ user }: Props): JSX.Element {
  console.log(user);
  return (
    <StyledLayout>
      <StyledContent>
        <Row style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '25px' }}>
            {user?.first_name}
            {user?.last_name}
          </h1>
        </Row>
        <Row style={{ marginBottom: '30px' }}>
          <p style={{ fontSize: '20px', marginRight: '50px' }}>
            {user?.total_sick_leaves} sick leaves
          </p>
          <p style={{ fontSize: '20px' }}>
            {user?.total_vacation} vacation days
          </p>
        </Row>
        <Row justify="end" style={{ marginBottom: '30px' }}>
          <Calendar dayToDay={date} />
        </Row>
        <ProfileTable dates={user?.dates} />
      </StyledContent>
    </StyledLayout>
  );
}
