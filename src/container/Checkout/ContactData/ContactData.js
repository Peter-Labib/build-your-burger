import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreate from '../../../store/actions/index'
import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    })
    const [formIsValid, setFormIsValid] = useState(false)


    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const orderInfo = {
            ingredients: props.ings,
            totalPrice: props.totalPrice,
            orderData: formData,
            userId: props.localId
        }
        props.onOrderBurger(orderInfo)
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm)
        setFormIsValid(formIsValid)
    }

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    const formElementsArray = []
    for (const key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    )
    if (props.loading) {
        form = <Spinner />
    }
    return (
        <div className={styles.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        localId: state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actionCreate.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData))
