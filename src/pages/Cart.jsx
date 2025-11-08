import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Cart = () => {
    const { 
        products, 
        currency, 
        cartItems, 
        removeFromCart, 
        getCartCount, 
        updateCartItem, 
        navigate, 
        getCartAmount, 
        addresses 
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [SelectedAddress, setSelectedAddress] = useState(addresses[0] || null);
    const [PaymentOption, setPaymentOption] = useState("COD");

    
    const getCart = () => {
        const tempArray = Object.keys(cartItems).map((key) => {
            const product = products.find(item => String(item._id) === key); // ensure type match
            if (!product) return null;
            return { ...product, quantity: cartItems[key] };
        }).filter(item => item !== null);

        setCartArray(tempArray);
    };

    useEffect(() => {
        if (products.length > 0 && cartItems) getCart();
    }, [products, cartItems]);


    useEffect(() => {
        setSelectedAddress(addresses[0] || null);
    }, [addresses]);

    const placeOrder = async () => {
 
        console.log("Order placed for:", SelectedAddress, cartArray, PaymentOption);
    };

    if (!products.length || !cartItems) return null;

    return (
        <div className="flex flex-col md:flex-row mt-16">
            {/* --------------------- Cart Items Section --------------------- */}
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()}</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div 
                                onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0) }} 
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
                            >
                                <img 
                                    className="max-w-full h-full object-cover" 
                                    src={product.image[0]} 
                                    alt={product.name} 
                                />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select 
                                            onChange={e => updateCartItem(product._id, Number(e.target.value))} 
                                            value={cartItems[product._id]} 
                                            className='outline-none ml-2'
                                        >
                                            {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, idx) => (
                                                <option key={idx} value={idx + 1}>{idx + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="Remove" className="inline-block w-6 h-6" />
                        </button>
                    </div>
                ))}

                <button 
                    onClick={() => { navigate("/products"); scrollTo(0,0) }} 
                    className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
                >
                    <img src={assets.arrow_right_icon_colored} alt="arrow" />Continue Shopping
                </button>
            </div>

            {/* --------------------- Order Summary Section --------------------- */}
            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                {/* Delivery Address */}
                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {SelectedAddress ? `${SelectedAddress.street}, ${SelectedAddress.city}, ${SelectedAddress.state}, ${SelectedAddress.country}` : "No Address Found"}
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>

                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {addresses.map((address, index) => (
                                    <p 
                                        key={index} 
                                        onClick={() => { setSelectedAddress(address); setShowAddress(false); }} 
                                        className="text-gray-500 p-2 hover:bg-gray-100"
                                    >
                                        {address.street}, {address.city}, {address.state}, {address.country}
                                    </p>
                                ))}
                                <p 
                                    onClick={() => navigate("/add-address")} 
                                    className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                                >
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Payment Method */}
                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                    <select 
                        onChange={e => setPaymentOption(e.target.value)} 
                        className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
                    >
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                {/* Order Summary Details */}
                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{getCartAmount() * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{getCartAmount() + getCartAmount() * 2 / 100}</span>
                    </p>
                </div>

                <button 
                    onClick={placeOrder} 
                    className="w-full py-3 mt-6 cursor-pointer bg-primary-dull text-white font-medium hover:bg-primary transition"
                >
                    {PaymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    );
};

export default Cart;
