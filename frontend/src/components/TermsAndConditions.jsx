import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="flex justify-center py-8 mt-24">
      <div className="card w-full max-w-5xl bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            Terms and Conditions
          </h1>

          <p className="text-base-content mb-4">
            Welcome to <strong>TechSpark!</strong> By accessing or using our website, you agree to comply with the following terms and conditions.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p className="text-base-content">
                By accessing this website, you agree to these terms. If you disagree with any part, please refrain from using the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">2. User Responsibilities</h2>
              <p className="text-base-content">
                You are responsible for complying with all applicable laws while using TechSpark. Any misuse may result in legal action.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">3. Payment and Refund Policy</h2>
              <p className="text-base-content">
                Payments made via Razorpay are secure. Refunds, if applicable, will be governed by our Refund and Cancellation Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
              <p className="text-base-content">
                All content, including text, graphics, and code, is the property of TechSpark. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">5. Modifications</h2>
              <p className="text-base-content">
                TechSpark reserves the right to update these terms at any time without prior notice. Please review the terms regularly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">6. Contact Information</h2>
              <p className="text-base-content">
                For any queries or concerns, please reach out to us at{" "}
                <a
                  href="mailto:support@techspark.com"
                  className="text-primary underline"
                >
                  support@techspark.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
