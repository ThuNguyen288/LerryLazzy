import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import SideBarAdmin from '../../components/SideBarAdmin';
import { getUsersCreated } from '../../services/admin/clientService';
import { getOrdersCreated } from '../../services/admin/orderClientService';
import { getHotProduct } from '../../services/productService';
import './Admin.scss';

const Admin = () => {

    const [userStats, setUserStats] = useState({
        todayCount: 0,
        monthlyCount: 0,
        totalCount: 0
    })

    const [orderStats, setOrderStats] = useState({
        todayCount: 0,
        monthlyCount: 0,
        totalCount: 0,
        todayTotal: 0,
        monthlyTotal: 0,
        dailyData: []
    })

    const [earnStats, setEarnStats] = useState({
        todayCount: 0,
        monthlyCount: 0,
        totalCount: 0
    })

    const chartRef = useRef(null)

    const [weeklyTotal, setWeeklyTotal] = useState(0)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await getUsersCreated();
                const orderResponse = await getOrdersCreated();

                setUserStats({
                    todayCount: userResponse.todayCount,
                    monthlyCount: userResponse.monthlyCount,
                    totalCount: userResponse.totalCount.count
                });

                setOrderStats({
                    todayCount: orderResponse.todayCount.count,
                    monthlyCount: orderResponse.monthlyCount.count,
                    totalCount: orderResponse.totalCount.count,
                    todayTotal: orderResponse.todayCount.total,
                    monthlyTotal: orderResponse.monthlyCount.total,
                    dailyData: orderResponse.order
                });

                console.log({
                    orderResponse
                    
                })
                setEarnStats({
                    todayCount: orderResponse.todayCount.total,
                    monthlyCount: orderResponse.monthlyCount.total,
                    totalCount: orderResponse.totalCount.totalPrice
                });
                const weeklyTotalAmount = orderResponse.order.reduce((total, data) => total + data.total, 0);
                setWeeklyTotal(weeklyTotalAmount);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let chartInstance = null;
    
        const renderChart = () => {
            const ctx = chartRef.current?.getContext('2d');
            if (ctx) {
                if (chartInstance) {
                    chartInstance.destroy();
                }
                const dayLabels = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: dayLabels,
                        datasets: [{
                            label: 'Orders per day',
                            data: getDataByDayOfWeek(orderStats.dailyData),
                            borderColor: '#007bff',
                            backgroundColor: 'rgba(0, 123, 255, 0.1)',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function (value) {
                                        return formatCurrency(value)
                                    }
                                }
                            }
                        }
                    }
                });
            }
        };
    
        renderChart();
    
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [orderStats]);

    const getDataByDayOfWeek = (dailyData) => {
        const dayIndexMapping = {
            'Monday': 1,
            'Tuesday': 2,
            'Wednesday': 3,
            'Thursday': 4,
            'Friday': 5,
            'Saturday': 6,
            'Sunday': 0
        };

        const dataByDay = new Array(7).fill(0); // Initialize array for all days with zeros

        dailyData.forEach(data => {
            const dayIndex = dayIndexMapping[data.day]; // Get index for current day
            dataByDay[dayIndex] = data.total; // Assign total to correct day index
        });

        return dataByDay;
    };

    // Function to format currency
    const formatCurrency = (value) => {
        const trillion = 1e12;
        const billion = 1e9;
        const million = 1e6;
        const thousand = 1e3;

        if (value >= trillion) {
            return (value / trillion).toFixed(1) + 'T';
        } else if (value >= billion) {
            return (value / billion).toFixed(1) + 'B';
        } else if (value >= million) {
            return (value / million).toFixed(1) + 'M';
        } else if (value >= thousand) {
            return (value / thousand).toFixed(1) + 'K';
        } else {
            return value.toLocaleString('vi-VN') + 'đ';
        }
    };

    const [hotProducts, setHotProducts] = useState([]);

    useEffect(() => {
        const fetchHotProducts = async () => {
            try {
                const response = await getHotProduct()
                setHotProducts(response);
                console.log(response)
            } catch (error) {
                console.error('Error fetching hot products:', error);
            }
        };

        fetchHotProducts();
    }, []);

    return (
        <div className="container-fluid background-admin">
            <div className="row">
                <div className="col-md-3 col-lg-2 d-md-block bg-blue sidebar">
                    <SideBarAdmin />
                </div>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Overview</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-xxl-3 d-flex card-info">
                            <div className='card border-0 flex-fill w-100'>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h5 className='text-uppercase text-muted fw-semibold mb-2'>Clients</h5>
                                            <h2 className='mb-0'>{userStats.totalCount}</h2>
                                        </div>
                                        <div className='col-auto'>
                                            <FaUsers className='text-primary' style={{maxHeight: '70px', width: 'auto'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <div className='row justify-content-between'>
                                        <div className='col-auto'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Today clients</p>
                                            <p className='fs-5 fw-bold mb-0'>{userStats.todayCount}</p>
                                        </div>
                                        <div className='col text-end text-truncate'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Monthly clients</p>
                                            <p className='fs-5 fw-bold mb-0'>{userStats.monthlyCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xxl-3 d-flex card-info">
                            <div className='card border-0 flex-fill w-100'>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h5 className='text-uppercase text-muted fw-semibold mb-2'>Orders</h5>
                                            <h2 className='mb-0'>{orderStats.totalCount}</h2>
                                        </div>
                                        <div className='col-auto'>
                                            <FaUsers className='text-primary' style={{maxHeight: '70px', width: 'auto'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <div className='row justify-content-between'>
                                        <div className='col-auto'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Today orders</p>
                                            <p className='fs-5 fw-bold mb-0'>{orderStats.todayCount}</p>
                                        </div>
                                        <div className='col text-end text-truncate'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Monthly orders</p>
                                            <p className='fs-5 fw-bold mb-0'>{orderStats.monthlyCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xxl-3 d-flex card-info">
                            <div className='card border-0 flex-fill w-100'>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h5 className='text-uppercase text-muted fw-semibold mb-2'>Earnings</h5>
                                            <h2 className='mb-0'>{(earnStats.totalCount).toLocaleString('vi-VN')} đ</h2>
                                        </div>
                                        <div className='col-auto'>
                                            <FaUsers className='text-primary' style={{height: '30px'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <div className='row justify-content-between'>
                                        <div className='col-auto'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Today earnings</p>
                                            <p className='fs-5 fw-bold mb-0'>{(earnStats.todayCount).toLocaleString('vi-VN')} đ</p>
                                        </div>
                                        <div className='col text-end text-truncate'>
                                            <p className='fs-6 text-muted text-uppercase mb-0'>Monthly earnings</p>
                                            <p className='fs-5 fw-bold mb-0'>{(earnStats.monthlyCount).toLocaleString('vi-VN')} đ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xxl-3 d-flex card-info">
                            <div className='card border-0 flex-fill w-100 card-info'>
                                <div className='card-body'>
                                    <h4 className='text-uppercase fw-semibold mb-2'>
                                        Current Balance
                                    </h4>
                                    <h2 className='mb-0'>{weeklyTotal.toLocaleString('vi-VN')} đ</h2>
                                    <div className='chart-container h-70px'>
                                        <canvas ref={chartRef} id='dailyOrdersChart' style={{display: 'block', boxSizing: 'border-box', height: '70px', width: '230px'}} width={287} height={87}></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-xxl-9 d-flex card-info'>
                            <div className='card border-0 flex-fill w-100' data-list="{&quot;valueNames&quot;: [&quot;name&quot;, &quot;price&quot;, &quot;quantity&quot;, &quot;amount&quot;, {&quot;name&quot;: &quot;sales&quot;, &quot;attr&quot;: &quot;data-sales&quot;}], &quot;page&quot;: 5}" id="topSellingProducts">
                                <div className='card-header border-0 card-header-space-between'>
                                    <h2 className='card-header-title h4 text-uppercase'>
                                        Top Selling Products
                                    </h2>
                                </div>
                                <div className='table-responsive'>
                                    <table className='table align-middle table-edge table-nowrap mb-0'>
                                        <thead className='thead-light'>
                                            <tr>
                                                <th>
                                                    <a className='text-muted list-sort desc' data-sort='name'>Name</a>
                                                </th>
                                                <th className='text-end'>
                                                    <a className='text-muted list-sort desc' data-sort='price'>Price</a>
                                                </th>
                                                <th className='text-end'>
                                                    <a className='text-muted list-sort desc' data-sort='quantity'>Quantity</a>
                                                </th>
                                                <th className='text-end'>
                                                    <a className='text-muted list-sort desc' data-sort='amount'>Amount</a>
                                                </th>
                                                <th className='text-end pe-7 min-w-200px'>
                                                    <a className='text-muted list-sort desc' data-sort='sale'>Sale</a>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='list'>
                                            {hotProducts.map(product => (
                                                <tr key={product.ProductID}>
                                                    <td className='name text-start ps-4 fw-bold'>
                                                        {product.Name}
                                                    </td>
                                                    <td className='price text-end'>{product.Price}</td>
                                                    <td className='quantity text-end'>{product.TotalOrders}</td>
                                                    <td className='amount text-end'>$1,000.00</td>
                                                    <td className='sales text-end' data-sales='20'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='progress w-100'>
                                                                <div className='progress-bar bg-success' role='progressbar' style={{width: '20'}} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='col-xxl-3 d-flex card-info'>
                            <div className='card border-0 flwx-fill w-100'>
                                <div className='card-header border-0 card-header-space-between'>
                                    <h2 className='card-header-title h4 text-uppercase'>
                                        Recent orders
                                    </h2>
                                    <a className='small fw-bold'>
                                        View all
                                    </a>
                                </div>
                                <div className='table-responsive'>
                                    <table className='table table-sm table-borderless align-middle mb-0'>
                                        <thead className='thead-light'>
                                            <tr>
                                                <th>Name</th>
                                                <th className='text-end'>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='d-flex flex-column'>
                                                            <span className='fw-bold d-block'>Lester William</span>
                                                            <small className='text-muted'>23 minutes ago</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-end'>
                                                    <div className='fw-bold'>$99</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-xxl-6 d-flex'>
                            <div className='card border-0 flex-fill w-100 card-info'>
                                <div className='card-header border-0 card-header-space-between'>
                                    <h2 className='card-header-title h4 text-uppercase'>Order Status</h2>
                                </div>
                                <div className='card-body'>
                                    <div className='row justify-content-around'>
                                        <div className='col-lg-6 col-xl-4 mb-7 mb-lg-0'>
                                            <div className='chart-container flex-grow-1'>
                                                <canvas id='orderStatusChart' style={{display: 'block', boxSizing: 'border-box', height: '310px', width: '156px'}} width={195} height={387}/>
                                                <div className='position-absolute top-50 start-50 translate-middle text-center'>
                                                    <p className='fs-5 mb-0 text-muted lh-sm'>Ordered Products</p>
                                                    <h3 className='display-2 fw-bold mb-0'>329</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-xl-5 card-info'>
                                            <div className='row h-100 align-items-center'>
                                                <div className='col'>
                                                    <div className='row justify-content-betwwen'>
                                                        <div className='col-auto col-lg'>
                                                            <p className='fs-4 d-flex align-items-center fw-semibold mb-0'>
                                                                <span className='legend-circle bg-primary'></span>Delivered
                                                            </p>
                                                        </div>
                                                        <div className='col-auto col-lg'>
                                                            <p className='fs-4 text-muted'>
                                                                29%
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='row justify-content-betwwen'>
                                                        <div className='col-auto col-lg'>
                                                            <p className='fs-4 d-flex align-items-center fw-semibold mb-0'>
                                                                <span className='legend-circle bg-primary'></span>Delivered
                                                            </p>
                                                        </div>
                                                        <div className='col-auto col-lg'>
                                                            <p className='fs-4 text-muted'>
                                                                29%
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='row justify-content-betwwen'>
                                                        <div className='col-auto col-lg'>
                                                            <p className='fs-4 d-flex align-items-center fw-semibold mb-0'>
                                                                <span className='legend-circle bg-primary'></span>Delivered
                                                            </p>
                                                        </div>
                                                        <div className='col-auto col-lg'>
                                                            <p className='fs-4 text-muted'>
                                                                29%
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xxl-6 d-flex card-info'>
                            <div className='card border-0 flex-fill w-100'>
                                <div className='card-header border-0'>
                                    <h2 className='card-header-title h4 text-uppercase'>Revenue by location</h2>
                                </div>
                                <div className='card-body'>
                                    <div className='map h-280px jvm-container' id='worldMap' style={{backgroundColor: 'transparent'}}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Admin
