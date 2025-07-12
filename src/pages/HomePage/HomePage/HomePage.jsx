import React from 'react';
import Banner from '../Banner/Banner';
import FAQSection from '../FAQSection/FAQSection';
import OurServices from '../OurServices/OurServices';
import ProductSection from '../Product/ProductSection';

const HomePage = () => {
    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <ProductSection></ProductSection>
            <OurServices></OurServices>
            <FAQSection></FAQSection>
        </div>
    );
};

export default HomePage;