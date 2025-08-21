import FAQAccordion, { FAQItem } from '@/components/FAQAccordion'

export default function PaymentFAQ() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payment FAQ</h2>
      <FAQAccordion>
        <FAQItem question="What payment methods can I use?">
          <div className="text-gray-700">
            <p>We accept a variety of payment methods including:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Credit/Debit Cards (Visa, Mastercard, American Express)</li>
              <li>E-wallets (Gopay, Dana, ShopeePay)</li>
              <li>QRIS</li>
              <li>Bank Transfer</li>
              <li>Cash (for in-store and COD orders)</li>
            </ul>
          </div>
        </FAQItem>
        
        <FAQItem question="Can the outlet cancel a customer's order at the customer's request for certain reasons, such as long delivery times, etc.?">
          <p className="text-gray-700">
            Yes, we can accommodate cancellation requests in certain circumstances. If you're experiencing unusually long delivery times or have other concerns about your order, please contact the restaurant directly or our customer service. Cancellation and refund eligibility will depend on the current status of your order and how far along it is in the preparation process.
          </p>
        </FAQItem>
        
        <FAQItem question="Why is my payment status not updated?">
          <div className="text-gray-700">
            <p>Payment status updates may be delayed due to:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Network connectivity issues</li>
              <li>Delays in processing from your payment provider</li>
              <li>System synchronization delays</li>
            </ul>
            <p className="mt-2">If your payment status hasn't updated within 15 minutes, try refreshing the app or website. If the issue persists, please contact our customer support with your order number and payment confirmation details.</p>
          </div>
        </FAQItem>
        
        <FAQItem question="How do I pay for orders using the Gopay payment method?">
          <div className="text-gray-700">
            <p>To pay with Gopay:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Select Gopay as your payment method during checkout</li>
              <li>You'll be redirected to the Gopay payment page or app</li>
              <li>Log in to your Gopay account if needed</li>
              <li>Confirm the payment amount</li>
              <li>Authorize the payment using your PIN or biometric verification</li>
              <li>Once payment is complete, you'll be redirected back to our app/website</li>
            </ol>
          </div>
        </FAQItem>
        
        <FAQItem question="How to pay for orders with the Dana payment method?">
          <div className="text-gray-700">
            <p>To pay with Dana:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Select Dana as your payment method during checkout</li>
              <li>You'll be redirected to the Dana payment interface</li>
              <li>Log in to your Dana account if needed</li>
              <li>Verify the payment details</li>
              <li>Confirm the payment using your PIN or biometric verification</li>
              <li>After successful payment, you'll be redirected back to complete your order</li>
            </ol>
          </div>
        </FAQItem>
        
        <FAQItem question="How do I pay for orders using the Qris payment method?">
          <div className="text-gray-700">
            <p>To pay with QRIS:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Select QRIS as your payment method during checkout</li>
              <li>A QR code will be displayed on your screen</li>
              <li>Open your preferred e-wallet or banking app that supports QRIS</li>
              <li>Use the scan QR feature in your app</li>
              <li>Scan the displayed QR code</li>
              <li>Verify the merchant name and amount</li>
              <li>Confirm the payment in your app</li>
              <li>Once payment is complete, the order page will automatically update</li>
            </ol>
          </div>
        </FAQItem>
        
        <FAQItem question="How do I pay for orders using the Credit/Debit Card payment method?">
          <div className="text-gray-700">
            <p>To pay with a Credit/Debit Card:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Select Credit/Debit Card as your payment method during checkout</li>
              <li>Enter your card details (card number, expiration date, CVV)</li>
              <li>Enter the cardholder name as it appears on the card</li>
              <li>For 3D Secure verification, you may be redirected to your bank's verification page</li>
              <li>Complete any additional security verification required by your bank</li>
              <li>Once payment is authorized, you'll be returned to the order confirmation page</li>
            </ol>
          </div>
        </FAQItem>
        
        <FAQItem question="How do I pay for orders using the Bank Transfer payment method?">
          <div className="text-gray-700">
            <p>To pay via Bank Transfer:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Select Bank Transfer as your payment method during checkout</li>
              <li>You'll be provided with our bank account details</li>
              <li>Transfer the exact order amount to the provided account</li>
              <li>Use your Order ID as the payment reference</li>
              <li>Upload a screenshot or photo of your transfer receipt/confirmation</li>
              <li>Our team will verify your payment (usually within 1 hour during business hours)</li>
              <li>Once verified, your order will be processed</li>
            </ol>
          </div>
        </FAQItem>
        
        <FAQItem question="Can I change my payment method when I want to place an order?">
          <p className="text-gray-700">
            Yes, you can change your payment method at any time before finalizing your order. During the checkout process, simply select your preferred payment method from the available options. If you've already submitted your order but the payment hasn't been processed yet, you may cancel the order and place a new one with your preferred payment method.
          </p>
        </FAQItem>
        
        <FAQItem question="What should I do if my payment fails?">
          <div className="text-gray-700">
            <p>If your payment fails:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Check your internet connection</li>
              <li>Verify you have sufficient funds in your account</li>
              <li>Ensure your payment details are entered correctly</li>
              <li>Try a different payment method if available</li>
              <li>If using a card, check if it's enabled for online transactions</li>
              <li>Contact your bank if the issue persists</li>
              <li>If all else fails, contact our customer support for assistance</li>
            </ol>
          </div>
        </FAQItem>
        
        <FAQItem question="Can I cancel an order after payment has been made?">
          <p className="text-gray-700">
            Cancellation after payment depends on the order status. If your order is still in the "Order Received" or early "Preparing" stage, you may request a cancellation. Contact the restaurant directly or our customer service as soon as possible. If food preparation has already begun, cancellation may not be possible. Refund policies for cancelled orders vary based on the cancellation reason and how far along the order is in the preparation process.
          </p>
        </FAQItem>
        
        <FAQItem question="How do I check my payment status?">
          <div className="text-gray-700">
            <p>To check your payment status:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Log in to your account</li>
              <li>Go to "Order History" or "My Orders"</li>
              <li>Find the specific order</li>
              <li>The payment status will be displayed (e.g., "Payment Successful," "Payment Pending," "Payment Failed")</li>
              <li>You can also check the email confirmation sent after placing your order</li>
            </ol>
          </div>
        </FAQItem>
        
        <FAQItem question="Will I receive any status changes on my order?">
          <div className="text-gray-700">
            <p>Yes, you will receive notifications about status changes to your order. These updates will be sent via:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Push notifications (if you have our app installed and notifications enabled)</li>
              <li>Email updates to the address associated with your account</li>
              <li>SMS notifications (if you've provided your phone number)</li>
            </ul>
            <p className="mt-2">You can also check the real-time status of your order by logging into your account and viewing your current orders.</p>
          </div>
        </FAQItem>
      </FAQAccordion>
    </div>
  )
}