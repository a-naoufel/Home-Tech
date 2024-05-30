import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";
import Message from "../../Components/Message";
import { getUserDetails,updateUser } from "../../../../frontend1vite/src/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../../../frontend1vite/src/constants/userConstants";
import { listMyOrders } from '../../actions/orderActions'
import {useNavigate} from "react-router-dom"

function ProfilePage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
    
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, success])
    console.log(user)

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }


    return (
        <div>
            <h1>Profile Page</h1>
            <h1>{user.username}</h1>
            {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <LoadingIndicator />}
            

        </div>
    )
}

export default ProfilePage;