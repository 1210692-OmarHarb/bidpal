import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function Checkout() {
  const location = useLocation();
  const { productTitle, amount, productImage } = location.state || {};
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=YOUR_SANDBOX_CLIENT_ID&currency=USD";
    script.addEventListener("load", () => {
      window.paypal
        .Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  description: productTitle,
                  amount: { value: amount },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              setPaymentStatus(
                `Payment completed! Thank you, ${details.payer.name.given_name}`
              );
            });
          },
          onError: function (err) {
            setPaymentStatus(`Payment failed: ${err}`);
          },
        })
        .render("#paypal-button-container");
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [productTitle, amount]);

  return (
    <>
      <Navigation />
      <main className="checkout-page">
        <h1>Checkout</h1>
        {productTitle && amount ? (
          <div className="checkout-container">
            <div className="product-summary">
              {productImage && <img src={productImage} alt={productTitle} />}
              <h2>{productTitle}</h2>
              <p>
                Price: <strong>${amount.toFixed(2)}</strong>
              </p>
            </div>
            <div className="payment-section">
              <h3>Pay with PayPal</h3>
              <div id="paypal-button-container"></div>
              {paymentStatus && (
                <p className="payment-status">{paymentStatus}</p>
              )}
            </div>
          </div>
        ) : (
          <p>No product selected for checkout.</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Checkout;
