import { useState, Dispatch, SetStateAction } from 'react';
import { axiosApiInstance } from 'api/axios';
import Calendar from 'react-calendar';
import { Select, Modal } from 'antd';
import { InputWrapper, WrapperButton } from './styles';
import { eng } from 'helpers/eng';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { TypeUserDates } from 'redux/reducers/types';
import Notification from 'components/Notification';

interface DataPickerProps {
  dayToDay: Date;
  setDates?: Dispatch<SetStateAction<TypeUserDates[]>>;
  id: number | undefined;
}
interface OnSubmit {
  start_day: Date;
  end_day: Date;
  type: string;
  status: string;
  userId: number | undefined;
}

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export enum VacationType {
  SICK_LEAVE = 'sick leave',
  VACATION = 'vacation',
  OWN_EXPENSE = 'own expense'
}

type Visible = boolean;

export default function DataPicker({
  dayToDay,
  setDates,
  id
}: DataPickerProps): JSX.Element {
  const [line, setLine] = useState<Date[]>([]);
  const [value, setValue] = useState<string>(VacationType.VACATION);
  const [isModalVisible, setIsModalVisible] = useState<Visible>(false);

  function onChangeValue(e: string) {
    setValue(e);
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const createBook = async (event: OnSubmit) => {
    try {
      const { data } = await axiosApiInstance.post(`booking`, event);

      if (setDates) {
        setDates(prev => {
          return [data, ...prev];
        });
      }
      Notification.openNotificationWithIcon(Notification.Not.success);
    } catch (e) {
      console.log(e);
      Notification.openNotificationWithIcon(Notification.Not.error);
    }
  };
  async function onSubmitCalendar() {
    const date = new Date();

    if (line.length < 1) {
      return alert('error');
    }
    if (date >= line[0] || date >= line[1]) {
      return alert('error');
    }

    const event: OnSubmit = {
      start_day: new Date(line[0].setHours(line[0].getHours() + 5)),
      end_day: line[1],
      type: value,
      status: Status.PENDING,
      userId: id
    };
    await createBook(event);
  }

  const handleOk = () => {
    setIsModalVisible(false);
    onSubmitCalendar();
  };

  return (
    <div>
      <WrapperButton type="primary" onClick={showModal}>
        {eng.button__addHoliday}
      </WrapperButton>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <div className="calendar-container">
            {line.length > 0 ? (
              <>
                <InputWrapper
                  defaultValue="start"
                  value={line[0].toDateString()}
                />
                <InputWrapper
                  defaultValue="end"
                  value={line[1].toDateString()}
                />
              </>
            ) : (
              <InputWrapper
                defaultValue="today"
                value={dayToDay.toDateString()}
              />
            )}
            <Calendar
              onChange={setLine}
              selectRange={true}
              className={['c1', 'c2']}
              tileClassName={['c3', 'c4']}
              next2Label={null}
              prev2Label={null}
              locale="en-GB"
              navigationAriaLabel="Go up"
            />
          </div>
          <Select
            value={value}
            onChange={onChangeValue}
            style={{ width: '30%' }}
          >
            <Select.Option value={VacationType.VACATION}>
              {' '}
              {VacationType.VACATION}
            </Select.Option>
            <Select.Option value={VacationType.SICK_LEAVE}>
              {VacationType.SICK_LEAVE}{' '}
            </Select.Option>
            <Select.Option value={VacationType.OWN_EXPENSE}>
              {VacationType.OWN_EXPENSE}{' '}
            </Select.Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
}
