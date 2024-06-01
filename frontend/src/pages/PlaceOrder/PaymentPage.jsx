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
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
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

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage
