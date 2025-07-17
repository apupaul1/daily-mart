import React from 'react';
import Banner from '../Banner/Banner';
import FAQSection from '../FAQSection/FAQSection';
import OurServices from '../OurServices/OurServices';
import ProductSection from '../Product/ProductSection';
import AddHighlights from '../AddHighlights/AddHighlights';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../Shared/Loading/Loading';

const HomePage = () => {
    const {loading} = useAuth()

    if(loading){
        return <Loading></Loading>
        }

    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <ProductSection></ProductSection>
            <OurServices></OurServices>
            <AddHighlights></AddHighlights>
            <FAQSection></FAQSection>
        </div>
    );
};

export default HomePage;