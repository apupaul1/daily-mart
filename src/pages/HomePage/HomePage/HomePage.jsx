import React from 'react';
import Banner from '../Banner/Banner';
import FAQSection from '../FAQSection/FAQSection';
import OurServices from '../OurServices/OurServices';
import ProductSection from '../Product/ProductSection';
import AddHighlights from '../AddHighlights/AddHighlights';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../Shared/Loading/Loading';
import NewsLetter from '../NewsLetter/NewsLetter';
import PopularSales from '../PopularSales/PopularSales';

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
            <PopularSales></PopularSales>
            <NewsLetter></NewsLetter>
            <FAQSection></FAQSection>
        </div>
    );
};

export default HomePage;