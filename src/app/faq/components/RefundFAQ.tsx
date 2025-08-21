import FAQAccordion, { FAQItem } from '@/components/FAQAccordion'

export default function RefundFAQ() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Refund FAQ</h2>
      <FAQAccordion>
        <FAQItem question="QRIS Balance Refund">
          <p className="text-gray-700">
            For QRIS payment refunds, the refund process typically takes 7-14 business days to be processed and reflected in your account. The refund will be returned to the same QRIS-linked account that was used for the original payment. You will receive a notification once the refund has been processed.
          </p>
        </FAQItem>
        
        <FAQItem question="E-wallet Balance Refund (Gopay, Dana, ShopeePay) via QRIS">
          <p className="text-gray-700">
            Refunds for e-wallet payments made via QRIS (including Gopay, Dana, and ShopeePay) will be processed back to the original e-wallet account. The refund process typically takes 3-7 business days. You will receive a notification in your e-wallet app once the refund has been processed. If you haven't received your refund after 7 business days, please contact our customer support with your order details.
          </p>
        </FAQItem>
        
        <FAQItem question="Debit/Credit Card Balance Refund">
          <p className="text-gray-700">
            For debit or credit card refunds, the amount will be credited back to the original card used for the transaction. Please note that while we process refunds immediately, it may take 7-14 business days for the refund to appear on your card statement, depending on your bank's policies. The refund will appear as a credit on your statement. If you haven't received your refund after 14 business days, please contact your bank first and then our customer support if needed.
          </p>
        </FAQItem>
      </FAQAccordion>
    </div>
  )
}