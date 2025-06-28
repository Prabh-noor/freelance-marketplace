import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
        setPrice(res.data.price);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
      <div className="px-16 py-10">
        <h1 className="text-4xl mb-4">Complete Payment of ${price}</h1>
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      )}
  </div>;
};

export default Pay;
