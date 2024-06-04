import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../Components/FormContainer';
import CheckoutSteps from '../../Components/CheckoutSteps';
import { saveShippingAddress } from '../../actions/cartActions';
import { useNavigate, useLocation } from 'react-router-dom';
function ShippingPage() {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    let navigate = useNavigate();
    let location = useLocation();

    const dispatch = useDispatch();
    const userInfo = localStorage.getItem('userInfo');

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login', { state: { from: location } });
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <FormContainer className="form-container ">
            <CheckoutSteps step1 step2 />
            <h1 className='text-center mb-6 text-gray-800 text-3xl font-bold'>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label className='text-[16px] font-semibold' >Address</Form.Label>
                    <Form.Control className='p-[10px] border-mainColor focus:border-blue-300  rounded-4  '
                        required
                        type='text'
                        placeholder='Enter address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='mt-2'>
                    <Form.Label className='text-[16px] font-semibold'>City</Form.Label>
                    <Form.Control
                        className='p-[10px] border-mainColor focus:border-blue-300  rounded-4  '
                        required
                        type='text'
                        placeholder='Enter city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='mt-2'>
                    <Form.Label className='text-[16px] font-semibold'>Postal Code</Form.Label>
                    <Form.Control
                        className='p-[10px] border-mainColor focus:border-blue-300  rounded-4  '
                        required
                        type='Number'
                        placeholder='Enter postal code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country' className='mt-2'>
                    <Form.Label  className='text-[16px] font-semibold'>Country</Form.Label>
                    <Form.Control
                        className='p-[10px] border-mainColor focus:border-blue-300  rounded-4  '
                        required
                        type='text'
                        placeholder='Enter country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className=' bg-mainColor hover:bg-[#0062ff] mt-3 mb-4 p-[12px] w-[150px] rounded-[50px]'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingPage;
