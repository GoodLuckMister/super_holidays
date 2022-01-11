import { notification } from 'antd';
enum Not {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning'
}

const openNotificationWithIcon = (type: Not): void => {
  notification[type]({
    message: `${type}`
  });
};

export default { openNotificationWithIcon, Not };
