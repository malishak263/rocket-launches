import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Descriptions, Card } from 'antd';

const FullDetails = () => {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);

  useEffect(() => {
    axios.get(`https://api.spacexdata.com/v4/launches/${id}`)
      .then(response => setLaunch(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!launch) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <Card>
        <Descriptions title="Launch Details" bordered>
          <Descriptions.Item label="Name">{launch.name}</Descriptions.Item>
          <Descriptions.Item label="Details">{launch.details}</Descriptions.Item>
          <Descriptions.Item label="Launch Date">
            {new Date(launch.date_utc).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Success">
            {launch.success ? 'Yes' : 'No'}
          </Descriptions.Item>
          <Descriptions.Item label="Rocket Name">{launch.rocket}</Descriptions.Item>
          <Descriptions.Item label="Rocket Description">{launch.description}</Descriptions.Item>
          <Descriptions.Item label="Launchpad Coordinates">
            {launch.latitude}, {launch.longitude}
          </Descriptions.Item>
          <Descriptions.Item label="Launchpad Site Name">{launch.site_name}</Descriptions.Item>
          <Descriptions.Item label="Rocket Mass">{launch.mass} grams</Descriptions.Item>
          <Descriptions.Item label="Rocket Picture">
            <img src={launch.flickr_images[0]} alt="Rocket" />
          </Descriptions.Item>
          <Descriptions.Item label="YouTube Video">
            <a href={`https://www.youtube.com/watch?v=${launch.youtube_id}`} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default FullDetails;
