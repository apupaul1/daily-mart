import React from "react";
import Marquee from "react-fast-marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faShoppingCart, faWarehouse, faBasketShopping, faShop } from "@fortawesome/free-solid-svg-icons";

const MarketMarquee = () => {
    const markets = [
        { name: "New Market", icon: faStore },
        { name: "Bashundhara Supermarket", icon: faShoppingCart },
        { name: "Kawran Bazar", icon: faWarehouse },
        { name: "Jamuna Future Park", icon: faStore },
        { name: "Banani Market", icon: faBasketShopping },
        { name: "Gulshan Market", icon: faShop },
        { name: "Mouchak Market", icon: faStore },
        { name: "Motijheel Market", icon: faShoppingCart },
        { name: "Farmgate Market", icon: faWarehouse },
        { name: "Dhanmondi Supermarket", icon: faBasketShopping },
    ];

    return (
        <div className=" py-10 mt-8 mb-12  rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
                Popular Markets Near You
            </h2>
            <Marquee speed={60} gradient={false} pauseOnHover={true}>
                {markets.map((market, index) => (
                    <div key={index} className="flex flex-col items-center mx-6 text-gray-800 transition-transform transform hover:scale-105">
                        <FontAwesomeIcon icon={market.icon} className="text-blue-600 text-2xl mb-2" />
                        <span className="text-lg font-semibold hover:text-blue-800">{market.name}</span>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default MarketMarquee;
