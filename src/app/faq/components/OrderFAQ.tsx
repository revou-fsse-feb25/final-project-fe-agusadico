import FAQAccordion, { FAQItem } from '@/components/FAQAccordion'

export default function OrderFAQ() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order FAQ</h2>
      <FAQAccordion>
        <FAQItem question="What happens if my order is cancelled by the outlet?">
          <p className="text-gray-700">
            If your order is cancelled by the outlet, you will receive an immediate notification. Any payment that has been processed will be automatically refunded to your original payment method. The refund timing depends on your payment method (typically 3-14 business days). You can place a new order immediately if you wish.
          </p>
        </FAQItem>
        
        <FAQItem question="Can an outlet unilaterally cancel a customer's order?">
          <div className="text-gray-700">
            <p>Yes, in certain circumstances, an outlet may need to cancel an order. This might happen if:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>The ordered items are out of stock</li>
              <li>The outlet is experiencing unexpected technical or operational issues</li>
              <li>There are concerns about the delivery address being unreachable</li>
              <li>The outlet is closing earlier than scheduled due to unforeseen circumstances</li>
            </ul>
            <p className="mt-2">In all cases, you will be notified immediately and any payment will be refunded.</p>
          </div>
        </FAQItem>
        
        <FAQItem question="Orders via the application with the balance already deducted, but the information in the application is 'waiting for payment'. Does the order data still reach the branch cashier and then the order can be made by the outlet? And if not, how can I order again without having to be deducted 2x?">
          <div className="text-gray-700">
            <p>If your balance has been deducted but the app shows "waiting for payment," this indicates a synchronization issue. In this case:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>The order has likely not reached the branch cashier yet</li>
              <li>Wait for 15 minutes to see if the status updates automatically</li>
              <li>If it doesn't update, please contact our customer support with your order details and payment confirmation</li>
              <li>Do not place a new order immediately to avoid double charging</li>
              <li>Our team will verify your payment and either confirm your existing order or process a refund so you can place a new order</li>
            </ol>
          </div>
        </FAQItem>
        
        <FAQItem question="Can I cancel an order after it has been confirmed?">
          <div className="text-gray-700">
            <p>Once an order has been confirmed, cancellation options depend on the order status:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>If the order is still in "Preparing" status, you may request a cancellation through the app or by calling the restaurant directly</li>
              <li>If food preparation has already begun, cancellation may not be possible</li>
              <li>For delivery orders, cancellation is generally not possible once the order has been dispatched</li>
            </ul>
            <p className="mt-2">Cancellation policies may vary slightly between locations. Any refund for a cancelled order will be processed back to your original payment method.</p>
          </div>
        </FAQItem>
      </FAQAccordion>
    </div>
  )
}