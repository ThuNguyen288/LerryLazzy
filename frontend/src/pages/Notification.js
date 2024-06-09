import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import './Notification.css'; // Import your CSS file

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    exclusiveOffers: false,
    orderUpdates: true,
    productRecommendations: true,
    restockNotifications: false,
    eventReminders: false,
    accountSecurityAlerts: true,
    customerSupportUpdates: false,
  });

  const [selectAll, setSelectAll] = useState(false);

  const handleToggle = (name) => {
    setNotifications({ ...notifications, [name]: !notifications[name] });
  };

  const handleSelectAllToggle = () => {
    const newSelectAllState = !selectAll;
    setSelectAll(newSelectAllState);
    const updatedNotifications = {};
    for (const key in notifications) {
      updatedNotifications[key] = newSelectAllState;
    }
    setNotifications(updatedNotifications);
  };

  return (
    <div>
      <NavBar />
      <div className='d-flex'>
        <SideBar />
        <div className="notifications-container my-5">
          <h2 className='text-center py-3'>Notifications</h2>
          <div className='float-end'>
            <input
              className="toggle-button"
              id="unselectAll"
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllToggle}
            />
            <label className='fw-bold me-2' htmlFor="unselectAll">Select all</label>
          </div>
          <div className='pt-5'>
            {Object.keys(notifications).map((key) => (
              <div key={key} className='mb-3'>
                <input
                  className="toggle-button"
                  id={key}
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={() => handleToggle(key)}
                />
                <label className='fw-bold me-2' htmlFor={key}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <p>{getNotificationDescription(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const getNotificationDescription = (key) => {
  const descriptions = {
    exclusiveOffers: 'Receive alerts about exclusive discounts, promotions, and special offers tailored just for you.',
    orderUpdates: 'Stay informed about the status of your orders, including confirmations, shipping updates, and delivery notifications.',
    productRecommendations: 'Get personalized recommendations based on your browsing and purchase history to discover new products you\'ll love.',
    restockNotifications: 'Be the first to know when out-of-stock items are back in inventory, ensuring you never miss out on your favorite products.',
    eventReminders: 'Receive reminders about upcoming sales events, flash sales, or product launches to make sure you\'re always in the loop.',
    accountSecurityAlerts: 'Receive notifications about any suspicious account activity or changes to your login credentials for enhanced security.',
    customerSupportUpdates: 'Get updates on any inquiries or support tickets you\'ve submitted, ensuring timely resolution of any issues.',
  };
  return descriptions[key] || '';
};

export default Notifications;
