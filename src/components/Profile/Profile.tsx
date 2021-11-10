import ProfileTable from '../ProfileTable';
import Modal from '../Modal';

import { Layout, Row, Col } from 'antd';
import { StyledContent, StyledLayout } from './styles';
import AddInput from 'components/Input';

export default function ProfileView(): JSX.Element {
  return (
    <StyledLayout>
      <Layout>
        <StyledContent>
          <AddInput />
          <Row style={{ marginBottom: '30px' }}>
            <Col xs={16} sm={14} md={10} lg={8} xl={6} xxl={4}>
              <h1 style={{ fontSize: '25px' }}>Davoria Paori</h1>
            </Col>
          </Row>
          <Row style={{ marginBottom: '30px' }}>
            <Col xs={16} sm={14} md={10} lg={8} xl={6} xxl={4}>
              <p style={{ fontSize: '20px' }}>2 sick leave</p>
            </Col>
            <Col xs={16} sm={14} md={10} lg={8} xl={6} xxl={4}>
              <p style={{ fontSize: '20px' }}>14 vacations days</p>
            </Col>
          </Row>
          <Row justify="end" style={{ marginBottom: '30px' }}>
            <Col sm={8} md={5} lg={4} xl={3}>
              <Modal />
            </Col>
          </Row>
          <ProfileTable />
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
}
