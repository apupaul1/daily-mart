import React from 'react';
import Banner from '../Banner/Banner';
import FAQSection from '../FAQSection/FAQSection';
import OurServices from '../OurServices/OurServices';
import ProductSection from '../Product/ProductSection';
import AddHighlights from '../AddHighlights/AddHighlights';

const HomePage = () => {
    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <ProductSection></ProductSection>
            <OurServices></OurServices>
            {/* <AddHighlights></AddHighlights> */}
            <FAQSection></FAQSection>
        </div>
    );
};

export default HomePage;