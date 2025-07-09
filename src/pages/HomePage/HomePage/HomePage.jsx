import React from 'react';
import Banner from '../Banner/Banner';
import FAQSection from '../FAQSection/FAQSection';

const HomePage = () => {
    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <FAQSection></FAQSection>
        </div>
    );
};

export default HomePage;