import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Render the site's Terms of Service page.
 *
 * Displays the full Terms of Service content including sections on license,
 * services, payment, intellectual property, disclaimers, limitations,
 * governing law, and contact information (last updated March 8, 2024).
 *
 * @returns A React element containing the Terms of Service layout and content.
 */
export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold mb-8 bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">Last updated: March 8, 2024</p>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or using mdesk.tech, you agree to be bound by these
                Terms of Service and all applicable laws and regulations. If you
                do not agree with any of these terms, you are prohibited from
                using or accessing this site.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily access the materials on
                mdesk.tech for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>
                  Attempt to decompile or reverse engineer any software
                  contained on the website
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
                <li>
                  Transfer the materials to another person or &quot;mirror&quot;
                  the materials on any other server
                </li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">3. Services</h2>
              <p>
                We provide web design, development, and hosting services. The
                specific details, deliverables, and terms of each service will
                be outlined in separate service agreements or statements of
                work.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
              <p>
                Payment terms will be specified in individual service
                agreements. Unless otherwise stated, invoices are due within 30
                days of receipt.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Intellectual Property
              </h2>
              <p>
                All content, features, and functionality on mdesk.tech,
                including but not limited to text, graphics, logos, icons,
                images, and software, are owned by mdesk.tech and are protected
                by international copyright, trademark, and other intellectual
                property laws.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
              <p>
                The materials on mdesk.tech are provided on an &apos;as is&apos;
                basis. We make no warranties, expressed or implied, and hereby
                disclaim and negate all other warranties including, without
                limitation, implied warranties or conditions of merchantability,
                fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">7. Limitations</h2>
              <p>
                In no event shall mdesk.tech or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on our website.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in
                accordance with the laws, and you irrevocably submit to the
                exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                9. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms of service at any
                time. We do so by posting modified terms on this page. Your
                continued use of the site after any such changes constitutes
                your acceptance of the new terms.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                10. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms of Service, please
                contact us at{" "}
                <a
                  href="mailto:hello@mdesk.tech"
                  className="text-cyan-400 hover:text-teal-400 underline transition-colors"
                >
                  hello@mdesk.tech
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
