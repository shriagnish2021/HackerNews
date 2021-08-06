import React from 'react';
import Loader from 'react-loader-spinner';

const FullPageLoader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
        <Loader type="ThreeDots" color="#1E40AF" height={100} width={100} />
    </div>
);

export default FullPageLoader;