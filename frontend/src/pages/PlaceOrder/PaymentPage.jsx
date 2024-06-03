import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../Components/FormContainer'
import CheckoutSteps from '../../Components/CheckoutSteps'
import { savePaymentMethod } from '../../actions/cartActions'
import { useNavigate , useLocation } from 'react-router-dom'


function PaymentPage() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    let navigate = useNavigate();
    let location = useLocation();

    const dispatch = useDispatch()

    const userInfo = localStorage.getItem('userInfo')

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    useEffect(() => {
        if (!userInfo) {
            navigate("/login", { state: { from: location } });
        }
    }
    , [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer >
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler} className='py-3'>
                <Form.Group className=''>
                    <Form.Label as='legend' className='font-semibold'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            className='py-3'
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className=' bg-mainColor hover:bg-[#008cff] mt-3 mb-4 p-[12px] w-[150px] rounded-[50px]'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage
