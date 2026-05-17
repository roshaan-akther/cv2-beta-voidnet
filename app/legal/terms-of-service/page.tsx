"use client"

import { useEffect, useState } from "react"
import { Header } from '@/components/nonauth/header';
import { Footer } from "@/components/footer";
import Link from 'next/link';
import { helveticaNeue, geistSans } from "@/lib/fonts";

export default function TermsOfServicePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/userinfo')
        setIsAuthenticated(response.ok)
      } catch (error) {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Link href="/legal" className="hover:underline">Legal</Link>
              <span>/</span>
              <span>Terms of Service</span>
            </div>

            <h1 
              className="text-3xl sm:text-4xl font-medium tracking-tight mb-4"
              style={{ fontFamily: helveticaNeue.style.fontFamily }}
            >
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground mb-8" style={{ fontFamily: geistSans.style.fontFamily }}>
              The rules and conditions for using Voidnet.
            </p>

            <div className="prose prose-sm sm:prose-base max-w-none" style={{ fontFamily: geistSans.style.fontFamily }}>
              <p className="text-sm text-muted-foreground mb-8">
                These Terms of Service ("Terms") govern your access to and use of Voidnet ("Voidnet", "we", "us", "our") and our website, marketplace, and related services (collectively, the "Services"). By creating an account or using the Services, you agree to be bound by these Terms.
              </p>

              <p className="text-sm text-muted-foreground mb-8">
                <strong>Effective date: December 4, 2025</strong>
              </p>

              <p className="mb-8">
                Voidnet provides an interface marketplace and related infrastructure for developers and teams. These Terms are designed to be clear and practical. By using Voidnet, you agree to these Terms in full.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">1. Eligibility and account responsibility</h2>
              <p className="mb-4">
                You must be at least 18 years old to use Voidnet. By creating an account, you represent that you have the legal capacity to enter into these Terms.
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Account security.</strong> You are responsible for maintaining the confidentiality of your username, password, and any API keys you generate. You are fully responsible for all activity that occurs under your account. If you believe your account has been compromised, notify us immediately at roshaan@openvoidnet.com.</li>
                <li><strong>Accurate information.</strong> You agree to provide accurate, current, and complete information when creating your account and to keep this information updated.</li>
              </ul>

              <h2 className="text-2xl font-medium mt-12 mb-4">2. The marketplace</h2>
              <p className="mb-4">
                Voidnet operates a marketplace where:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Publishers can list interfaces (tools, agents, APIs, MCP servers) for others to discover and integrate.</li>
                <li>Buyers can browse, evaluate, and use interfaces listed by publishers.</li>
              </ul>
              <p className="mb-4">
                <strong>Important disclaimers:</strong>
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>We do not own, control, or guarantee the quality, safety, or legality of interfaces listed by publishers.</li>
                <li>Each interface may have its own terms, conditions, and pricing set by the publisher. You are responsible for reviewing and complying with those terms.</li>
                <li>We do not guarantee that any interface will meet your specific needs, be error-free, or function without interruption.</li>
                <li>Publishers are solely responsible for the interfaces they publish, including their functionality, security, and compliance with applicable laws.</li>
              </ul>

              <h2 className="text-2xl font-medium mt-12 mb-4">3. Payments and pricing</h2>
              <p className="mb-8">
                Interfaces on Voidnet may be marked as "free" or "paid" by their publishers. Currently, Voidnet does not process payments directly. If you use a paid interface, you will need to arrange payment separately with the publisher according to their terms.
              </p>
              <p className="mb-8">
                In the future, we may introduce payment processing, subscription plans, or marketplace fees. If we do, we will provide clear notice and updated terms before any charges apply.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">4. Acceptable use</h2>
              <p className="mb-4">
                You agree not to, and not to allow others to, do any of the following while using the Services:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Break the law or help others break the law.</li>
                <li>Interfere with or disrupt the integrity, security, or performance of the Services.</li>
                <li>Attempt to gain unauthorized access to any systems, networks, or data.</li>
                <li>Reverse engineer, decompile, or attempt to extract source code from the Services except where permitted by law.</li>
                <li>Use the Services to build a competing product or service that is primarily designed to replicate Voidnet.</li>
                <li>Scrape, harvest, or collect data from the Services using automated means without our permission.</li>
                <li>Impersonate another person or entity, or falsely claim an affiliation.</li>
                <li>Post or transmit spam, malware, or other harmful code through the Services.</li>
              </ul>

              <h2 className="text-2xl font-medium mt-12 mb-4">5. Intellectual property and content ownership</h2>
              <p className="mb-4">
                <strong>Voidnet's IP.</strong> The Voidnet platform, including our website, software, APIs, design, and branding, is owned by us and protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for their intended purpose. You may not use our trademarks, logos, or brand elements without our prior written consent.
              </p>
              <p className="mb-4">
                <strong>Publisher content.</strong> Publishers retain all rights to the interfaces, tools, and content they publish on Voidnet. By publishing an interface, you grant us a limited license to display, distribute, and promote your interface on the platform.
              </p>
              <p className="mb-8">
                <strong>Your content.</strong> You retain ownership of any content you submit to Voidnet (such as interface descriptions, documentation, or support messages). By submitting content, you grant us a worldwide, royalty-free license to use, reproduce, and display that content as necessary to operate the Services.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">6. Third-party services</h2>
              <p className="mb-8">
                Some interfaces or features may depend on third-party services or APIs. We are not responsible for the availability, accuracy, or behavior of third-party services, or for any damage or loss they may cause.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">7. Disclaimers and "AS IS" provision</h2>
              <p className="mb-4">
                <strong>TO THE FULLEST EXTENT PERMITTED BY LAW, VOIDNET AND THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong>
              </p>
              <p className="mb-4">
                We specifically disclaim:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Any warranties of merchantability, fitness for a particular purpose, title, or non-infringement.</li>
                <li>Any guarantees that the Services will be uninterrupted, secure, or error-free.</li>
                <li>Any warranties regarding the accuracy, reliability, or quality of interfaces published by third parties.</li>
              </ul>
              <p className="mb-8">
                Your use of the Services and any interfaces is entirely at your own risk.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">8. Limitation of liability</h2>
              <p className="mb-4">
                <strong>TO THE FULLEST EXTENT PERMITTED BY LAW:</strong>
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>No liability for indirect damages.</strong> Voidnet will not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, revenue, data, use, goodwill, or other intangible losses, even if we were advised of the possibility of such damages.</li>
                <li><strong>Liability cap.</strong> Our total liability for any claims relating to the Services will be limited to the greater of: (a) the amount you paid to Voidnet in the 3 months before the claim arose, or (b) $100 USD.</li>
                <li><strong>No liability for third-party interfaces.</strong> We are not responsible for any damages caused by interfaces published by third-party publishers, including bugs, security vulnerabilities, data loss, or service outages.</li>
              </ul>
              <p className="mb-8">
                Some jurisdictions do not allow the exclusion or limitation of certain damages, so the above limitations may not apply to you. In such cases, our liability will be limited to the maximum extent permitted by law.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">9. Termination and suspension</h2>
              <p className="mb-4">
                <strong>Your right to terminate.</strong> You may stop using Voidnet at any time by deleting your account. Some data may be retained as described in our Privacy Policy.
              </p>
              <p className="mb-4">
                <strong>Our right to terminate.</strong> We may suspend or terminate your access to the Services, with or without notice, if:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>You violate these Terms or any applicable laws.</li>
                <li>Your use of the Services poses a security or legal risk to us or other users.</li>
                <li>We decide to discontinue all or part of the Services.</li>
              </ul>
              <p className="mb-4">
                We will try to provide advance notice where reasonable, but we reserve the right to suspend accounts immediately in cases of suspected fraud, abuse, or legal violations.
              </p>
              <p className="mb-8">
                <strong>Effect of termination.</strong> Upon termination, you lose access to your account and the Services. Published interfaces may be removed. Sections of these Terms that should survive termination (including disclaimers, liability limitations, and dispute resolution) will continue to apply.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">10. Changes to the Services and Terms</h2>
              <p className="mb-8">
                We are constantly improving Voidnet and may add, change, or remove features over time. We may also update these Terms from time to time. When we do, we will update the effective date at the top of this page and, if the changes are material, provide additional notice. If you continue using the Services after the updated Terms take effect, you agree to the new version.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">11. Governing law and disputes</h2>
              <p className="mb-4">
                <strong>Governing law.</strong> These Terms are governed by the laws of the United States, without regard to conflict of laws principles. If our legal structure changes in the future, we may update this section to reflect the specific jurisdiction where we are incorporated.
              </p>
              <p className="mb-4">
                <strong>Dispute resolution.</strong> If you have a dispute with Voidnet, please contact us first at roshaan@openvoidnet.com and give us a chance to resolve it informally. Most issues can be resolved through good-faith discussion.
              </p>
              <p className="mb-4">
                If informal resolution fails, you agree that any legal claims will be resolved through binding arbitration on an individual basis, rather than through class actions or jury trials, except where prohibited by law. Arbitration will be conducted under the rules of the American Arbitration Association.
              </p>
              <p className="mb-8">
                <strong>Consumer protection rights.</strong> Nothing in these Terms limits any consumer protection rights you may have under local law in the United States, India, or other jurisdictions.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">12. Miscellaneous</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Entire agreement.</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and Voidnet regarding the Services.</li>
                <li><strong>Severability.</strong> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full effect.</li>
                <li><strong>No waiver.</strong> Our failure to enforce any provision of these Terms does not waive our right to enforce it later.</li>
                <li><strong>Assignment.</strong> You may not transfer or assign your rights under these Terms. We may assign these Terms to any successor or affiliate.</li>
              </ul>

              <h2 className="text-2xl font-medium mt-12 mb-4">13. Contact us</h2>
              <p className="mb-4">
                If you have questions about these Terms or the Services, you can reach us at:
              </p>
              <p className="mb-8">
                <strong>Email:</strong> roshaan@openvoidnet.com
              </p>
              <p className="mb-8">
                We will respond to your inquiry as quickly as possible, typically within 5-7 business days.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
