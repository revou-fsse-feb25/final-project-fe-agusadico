import FAQAccordion, { FAQItem } from '@/components/FAQAccordion'

export default function AccountFAQ() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account FAQ</h2>
      <FAQAccordion>
        <FAQItem question="How do I order by dine in?">
          <p className="text-gray-700">
            To order by dine in, simply visit any of our restaurant locations. You'll be greeted by our staff who will seat you and provide a menu. You can place your order directly with our waitstaff, who will bring your food to your table when it's ready.
          </p>
        </FAQItem>
        
        <FAQItem question="How do I order by takeaway?">
          <p className="text-gray-700">
            For takeaway orders, you can either visit our restaurant and place your order at the counter, call us directly, or use our mobile app or website to place your order in advance. Once your order is ready, you can pick it up from our designated takeaway counter.
          </p>
        </FAQItem>
        
        <FAQItem question="What if I can't edit my profile?">
          <div className="text-gray-700">
            <p>If you're having trouble editing your profile, please try the following steps:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Log out and log back in to your account</li>
              <li>Clear your browser cache and cookies</li>
              <li>Try using a different browser or device</li>
              <li>If the issue persists, please contact our customer support for assistance</li>
            </ol>
          </div>
        </FAQItem>
        
        <FAQItem question="How do I change my email?">
          <div className="text-gray-700">
            <p>To change your email address:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Log in to your account</li>
              <li>Go to "Account Settings" or "Profile"</li>
              <li>Find the "Email" section and click "Edit" or "Change"</li>
              <li>Enter your new email address and confirm it</li>
              <li>You may need to verify your new email address by clicking a link sent to that address</li>
            </ol>
          </div>
        </FAQItem>
        
        <FAQItem question="How do I verify my email?">
          <p className="text-gray-700">
            After registering or changing your email, we'll send a verification link to your email address. Simply click on the link in the email to verify your account. If you didn't receive the verification email, you can request a new one from the "Account Settings" page. Also check your spam or junk folder if you don't see it in your inbox.
          </p>
        </FAQItem>
      </FAQAccordion>
    </div>
  )
}