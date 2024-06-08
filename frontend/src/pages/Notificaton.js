import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

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
        <NavBar/>
        <div className='d-flex'>
            <SideBar/>
            <div className="notifications-container my-5">
                <h2 className='text-center py-3'>Notifications</h2>
                <div className='float-end'>
                    <label className='fw-bold' htmlFor="unselectAll">Select all</label>
                    <input type="checkbox" id="unselectAll" onChange={handleSelectAllToggle} checked={selectAll}/>
                </div>
                <div className='pt-5'>
                    <label className='fw-bold' htmlFor="exclusiveOffers">
                        <input
                        type="checkbox"
                        id="exclusiveOffers"
                        checked={notifications.exclusiveOffers}
                        onChange={() => handleToggle('exclusiveOffers')}
                        />
                        Exclusive offers
                    </label>
                    <p>Receive alerts about exclusive discounts, promotions, and special offers tailored just for you.</p>
                    <label className='fw-bold' htmlFor="orderUpdates">
                        <input
                        type="checkbox"
                        id="orderUpdates"
                        checked={notifications.orderUpdates}
                        onChange={() => handleToggle('orderUpdates')}
                        />
                        Order updates
                    </label>
                    <p>Stay informed about the status of your orders, including confirmations, shipping updates, and delivery notifications.</p>
                    <label className='fw-bold' htmlFor="productRecommendations">
                        <input
                        type="checkbox"
                        id="productRecommendations"
                        checked={notifications.productRecommendations}
                        onChange={() => handleToggle('productRecommendations')}
                        />
                        Product recommendations
                    </label>
                    <p>Get personalized recommendations based on your browsing and purchase history to discover new products you'll love.</p>
                    <label className='fw-bold' htmlFor="restockNotifications">
                        <input
                        type="checkbox"
                        id="restockNotifications"
                        checked={notifications.restockNotifications}
                        onChange={() => handleToggle('restockNotifications')}
                        />
                        Restock notifications
                    </label>
                    <p>Be the first to know when out-of-stock items are back in inventory, ensuring you never miss out on your favorite products.</p>
                    <label className='fw-bold' htmlFor="eventReminders">
                        <input
                        type="checkbox"
                        id="eventReminders"
                        checked={notifications.eventReminders}
                        onChange={() => handleToggle('eventReminders')}
                        />
                        Event reminders
                    </label>
                    <p>Receive reminders about upcoming sales events, flash sales, or product launches to make sure you're always in the loop.</p>
                    <label className='fw-bold' htmlFor="accountSecurityAlerts">
                        <input
                        type="checkbox"
                        id="accountSecurityAlerts"
                        checked={notifications.accountSecurityAlerts}
                        onChange={() => handleToggle('accountSecurityAlerts')}
                        />
                        Account security alerts
                    </label>
                    <p>Receive notifications about any suspicious account activity or changes to your login credentials for enhanced security.</p>
                    <label className='fw-bold' htmlFor="customerSupportUpdates">
                        <input
                        type="checkbox"
                        id="customerSupportUpdates"
                        checked={notifications.customerSupportUpdates}
                        onChange={() => handleToggle('customerSupportUpdates')}
                        />
                        Customer support updates
                    </label>
                    <p>Get updates on any inquiries or support tickets you've submitted, ensuring timely resolution of any issues.</p>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    
  );
};

export default Notifications;