import React from 'react';
import Banner from '../Banner/Banner';
import FAQSection from '../FAQSection/FAQSection';
import OurServices from '../OurServices/OurServices';

const HomePage = () => {
    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <OurServices></OurServices>
            <FAQSection></FAQSection>
        </div>
    );
};

export default HomePage;