import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Time Cube",
};

export default function PrivacyPolicy() {
  return (
    <main className="py-20 sm:py-[100px] flex flex-col gap-5 sm:gap-[25px] md:gap-[30px] lg:gap-[35px] px-5 sm:px-[100px] bg-background-static text-text-color-static max-w-[2000px] animate-on-load">
      <div className="max-w-4xl mx-auto space-y-8 text-text-color-static/80">
        <h1 className="text-4xl font-extrabold font-InstrumentSans text-text-color-static">
          Privacy Policy
        </h1>

        <p className="text-sm text-text-color-static/60">
          Last updated: December 17, 2025
        </p>

        <p>
          This Privacy Policy explains how <strong>Time Cube</strong> ("we",
          "our", or "us") collects, uses, and protects information when you use
          the Time Cube website (the "Service"). Time Cube is a web-based time
          visualization tool designed to help users understand and reflect on
          the passage of time.
        </p>

        <p>
          By using Time Cube, you agree to the collection and use of information
          in accordance with this Privacy Policy.
        </p>

        <section className="space-y-4 mt-10">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            1. Information We Collect
          </h2>

          <h3 className="text-2xl font-semibold font-InstrumentSans mt-6 text-text-color-static">
            1.1 Information You Provide
          </h3>

          <p>
            When you create an account or use certain features of Time Cube, we
            may collect personal information, including:
          </p>

          <ul className="list-disc ml-6 space-y-1">
            <li>Name or username</li>
            <li>Email address</li>
            <li>
              Authentication information (such as third-party login identifiers)
            </li>
            <li>
              Any content or data you choose to create, save, or sync within the
              Service (for example, saved time cubes, preferences, or themes)
            </li>
          </ul>

          <h3 className="text-2xl font-semibold font-InstrumentSans mt-6 text-text-color-static">
            1.2 Automatically Collected Information
          </h3>

          <p>
            When you use the website, we may automatically collect certain
            information, including:
          </p>

          <ul className="list-disc ml-6 space-y-1">
            <li>Device type, browser type, and operating system</li>
            <li>
              IP address (used only for security, fraud prevention, and
              approximate location)
            </li>
            <li>Approximate location (country or region)</li>
            <li>Pages visited and general interactions with the Service</li>
          </ul>

          <p>
            Analytics data is collected in an aggregated and anonymized manner
            and is <strong>not used to identify individual users</strong>.
          </p>

          <h3 className="text-2xl font-semibold font-InstrumentSans mt-6 text-text-color-static">
            1.3 Cookies and Similar Technologies
          </h3>

          <p>
            Time Cube uses cookies and similar technologies (such as local
            storage) to:
          </p>

          <ul className="list-disc ml-6 space-y-1">
            <li>Keep you logged in</li>
            <li>Remember your preferences and settings</li>
            <li>Enable core functionality</li>
            <li>Collect analytics data</li>
          </ul>

          <p>
            You can control or disable cookies through your browser settings.
            Disabling cookies may affect the functionality of certain features.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            2. How We Use Information
          </h2>

          <p>We use the collected information to:</p>

          <ul className="list-disc ml-6 space-y-1">
            <li>Provide and maintain the Service</li>
            <li>Improve performance, design, and usability</li>
            <li>Understand how users interact with the website</li>
            <li>Respond to user inquiries or feedback</li>
          </ul>

          <p>
            We do <strong>not</strong> sell, rent, or trade your personal
            information to third parties.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            3. Third-Party Services
          </h2>

          <p>
            Time Cube uses third-party services to support core functionality,
            including:
          </p>

          <ul className="list-disc ml-6 space-y-1">
            <li>Analytics providers</li>
            <li>Hosting and infrastructure providers</li>
            <li>Authentication providers (such as social login services)</li>
          </ul>

          <p>
            These third parties may process limited information on our behalf
            and only as necessary to provide their services.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            4. Data Retention
          </h2>

          <p>
            We retain collected data only for as long as necessary to fulfill
            the purposes outlined in this Privacy Policy.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            5. Data Security
          </h2>

          <p>
            We take reasonable measures to protect your information, but no
            system is completely secure.
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            6. Children’s Privacy
          </h2>

          <p>Time Cube is not intended for children under the age of 13.</p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            7. Your Rights and Data Deletion
          </h2>

          <p>
            Depending on your location, you may have certain rights regarding
            your personal data.
          </p>

          <h3 className="text-2xl font-semibold font-InstrumentSans mt-6 text-text-color-static">
            Data Deletion
          </h3>

          <p>
            To request data deletion, contact us at{" "}
            <a
              href="mailto:contact@thetimecube.com"
              className="underline text-text-color-static/90"
            >
              contact@thetimecube.com
            </a>
          </p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            8. Changes to This Privacy Policy
          </h2>

          <p>We may update this Privacy Policy from time to time.</p>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-3xl font-bold font-InstrumentSans text-text-color-static">
            9. Contact Us
          </h2>

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
