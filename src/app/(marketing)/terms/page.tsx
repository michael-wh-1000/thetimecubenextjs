import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | The Time Cube",
};

export default function TermsOfService() {
  return (
    <main className="py-20 sm:py-[100px] flex flex-col gap-5 sm:gap-[25px] md:gap-[30px] lg:gap-[35px] px-5 sm:px-[100px] bg-background text-text-color-static max-w-[2000px] animate-on-load">
      <div className="max-w-4xl mx-auto space-y-8 text-text-color-static/80">
        <h1 className="text-4xl font-extrabold font-InstrumentSans text-text-color-static">
          Terms of Service
        </h1>

        <p className="text-sm text-text-color-static/60">
          Last updated: December 17, 2025
        </p>

        <p>
          These Terms of Service ("Terms") govern your use of the{" "}
          <strong>Time Cube</strong> website ("Service") provided by Time Cube
          ("we", "our", or "us"). By accessing or using the Service, you agree
          to be bound by these Terms.
        </p>

        <p>If you do not agree to these Terms, you may not use the Service.</p>

        <section className="space-y-4 mt-10">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            1. Use of the Service
          </h2>

          <p>
            You may use Time Cube only for lawful purposes and in accordance
            with these Terms. You agree not to:
          </p>

          <ul className="list-disc ml-6 space-y-1">
            <li>Violate any applicable laws or regulations</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>
              Attempt to gain unauthorized access to other accounts, computer
              systems, or networks
            </li>
            <li>Use the Service to harm or exploit minors in any way</li>
          </ul>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            2. Account Registration
          </h2>

          <p>
            To use certain features of Time Cube, you may need to create an
            account. You agree to:
          </p>

          <ul className="list-disc ml-6 space-y-1">
            <li>
              Provide accurate, current, and complete information during
              registration
            </li>
            <li>Maintain the security of your account credentials</li>
            <li>
              Notify us immediately of any unauthorized use of your account
            </li>
          </ul>

          <p>You are responsible for all activity under your account.</p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            3. User Content
          </h2>

          <p>
            You retain ownership of any content you create or save using the
            Service ("User Content"). By submitting User Content, you grant Time
            Cube a worldwide, non-exclusive, royalty-free license to use, host,
            store, reproduce, and display the content solely for the purpose of
            providing and improving the Service.
          </p>

          <p>
            You represent and warrant that you have all rights necessary to
            submit your User Content and that it does not violate any laws or
            these Terms.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            4. Data and Privacy
          </h2>

          <p>
            Your use of the Service is also governed by our{" "}
            <Link
              href="/privacy"
              className="underline text-text-color-static/90"
            >
              Privacy Policy
            </Link>
            , which explains how we collect, use, and protect information. By
            using the Service, you consent to the practices described in the
            Privacy Policy.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            5. Termination
          </h2>

          <p>
            We may suspend or terminate your account or access to the Service at
            our discretion, including for violations of these Terms. Upon
            termination, your rights to use the Service immediately cease, but
            your data may be retained or deleted according to the Privacy
            Policy.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            6. Disclaimers
          </h2>

          <p>
            The Service is provided on an "as-is" and "as available" basis. We
            make no warranties, express or implied, including but not limited
            to:
          </p>

          <ul className="list-disc ml-6 space-y-1">
            <li>Accuracy or reliability of content</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement</li>
          </ul>

          <p>Your use of the Service is at your own risk.</p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            7. Limitation of Liability
          </h2>

          <p>
            To the maximum extent permitted by law, Time Cube shall not be
            liable for any indirect, incidental, special, or consequential
            damages, or any loss of data, profits, or other intangible losses
            arising from your use of the Service.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            8. Changes to Terms
          </h2>

          <p>
            We may update these Terms from time to time. Any changes will be
            posted on this page with an updated "Last updated" date. Your
            continued use of the Service after changes constitutes acceptance of
            the revised Terms.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            9. Governing Law
          </h2>

          <p>
            These Terms are governed by the laws of the jurisdiction in which
            Time Cube operates, without regard to conflict of law principles.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            10. Contact Us
          </h2>

          <p>
            For questions or concerns about these Terms, you can contact us at:
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contact@thetimecube.com"
              className="underline text-text-color-static/90"
            >
              contact@thetimecube.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
