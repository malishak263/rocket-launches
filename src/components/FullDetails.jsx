import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Descriptions, Card, Image, Avatar, FloatButton, Skeleton } from 'antd';
import moment from 'moment';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
const { Meta } = Card

const FullDetails = () => {
    const { id } = useParams();
    const [launch, setLaunch] = useState(null);
    const [rocket, setRocket] = useState(null);
    const [launchpad, setLaunchpad] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://api.spacexdata.com/v4/launches/${id}`)
            .then(response => {
                setLaunch(response.data);
                console.log(response.data)
                return axios.get(`https://api.spacexdata.com/v4/rockets/${response.data.rocket}`);
            })
            .then(response => setRocket(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    useEffect(() => {
        if (launch?.launchpad) {
            axios.get(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`)
                .then(response => setLaunchpad(response.data))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [launch]);

    if (!launch || !rocket || !launchpad) return <div className='bg-gray-700 w-full flex items-center justify-center' style={{ height: '100vh' }}><Skeleton className='w-1/2' /></div>;

    return (
        <div className="flex items-center justify-center p-4 bg-gray-700" style={{ height: '100vh' }}>
            <Card

                hoverable
                title={launch.name}
                size={'small'}
                style={{ width: '80%', maxWidth: '800px' }}

            >

                <Meta
                    avatar={<Avatar className='w-32 h-32' shape={'round'} size={'large'} src={rocket.flickr_images[0]} />}
                    alt="R"

                    description={
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Details">{launch.details}</Descriptions.Item>
                            <Descriptions.Item label="Launch Date">
                                {moment(launch.date_utc).format('LL')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Success">
                                {launch.success ? 'Yes' : 'No'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Rocket Name">{rocket.name}</Descriptions.Item>
                            <Descriptions.Item label="Rocket Description">{rocket.description}</Descriptions.Item>
                            <Descriptions.Item label="Launchpad Coordinates">
                                {launchpad.latitude}, {launchpad.longitude}
                            </Descriptions.Item>
                            <Descriptions.Item label="Launchpad Site Name">{launchpad.name}</Descriptions.Item>
                            <Descriptions.Item label="Rocket Mass">{rocket.mass?.kg ? rocket.mass.kg * 1000 + ' grams' : 'not set'}</Descriptions.Item>


                        </Descriptions>
                    }

                />
            </Card>
            <div >
                <YouTube videoId={launch.links.webcast} opts={{ width: '100%', playerVars: { autoplay: 1 } }} />
            </div>


            <FloatButton onClick={() => navigate('/')} icon={<HomeOutlined />} />


        </div>
    );
};

export default FullDetails;
