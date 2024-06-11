import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';


const Launches = () => {
    const [launches, setLaunches] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        axios.get('https://api.spacexdata.com/v4/launches')
            .then(response => setLaunches(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const columns = [
        {
            title: 'Flight Number',
            dataIndex: 'flight_number',
            key: 'flight_number',
            width: 150,
            sorter: (a, b) => a.flight_number - b.flight_number,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width:150,
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Launch Date',
            dataIndex: 'date_utc',
            key: 'date_utc',
            width:150,
            sorter: (a, b) => new Date(a.date_utc) - new Date(b.date_utc),
            render: date => new Date(date).toLocaleDateString(),
        },
        {
            title: 'View Details',
            key: 'action',
            className:'flex items-center justify-center',
            width:150,
            render: (text, record) => (
                <Link to={`/launch/${record.id}`}>
                    <Button shape={'round'} type="text" className='bg-gray-700 rounded-lg text-white font-bold'><EyeOutlined/></Button>
                </Link>
            ),
        },
    ];

    return (
        <div className="flex items-center justify-center w-full bg-gray-700" style={{ height: '100vh' }}>
            <div className='w-full md:w-1/2 bg-white p-2 rounded shadow-lg'>
                <Table dataSource={launches} columns={columns} rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />
            </div>

        </div>
    );
};

export default Launches;
