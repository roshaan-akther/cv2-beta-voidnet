"use client"

import { useEffect, useState } from "react"
import { Header } from '@/components/nonauth/header';
import { Footer } from "@/components/footer";
import Link from 'next/link';
import { helveticaNeue, geistSans } from "@/lib/fonts";

export default function PrivacyPolicyPage() {
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
              <span>Privacy Policy</span>
            </div>

            <h1 
              className="text-3xl sm:text-4xl font-medium tracking-tight mb-4"
              style={{ fontFamily: helveticaNeue.style.fontFamily }}
            >
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-8" style={{ fontFamily: geistSans.style.fontFamily }}>
              How Voidnet handles your data and protects your privacy.
            </p>

            <div className="prose prose-sm sm:prose-base max-w-none" style={{ fontFamily: geistSans.style.fontFamily }}>
              <p className="text-sm text-muted-foreground mb-8">
                This Privacy Policy explains how Voidnet ("we", "us", "our") collects, uses, and protects information about you when you use our website, marketplace, and related services (collectively, the "Services").
              </p>

              <p className="text-sm text-muted-foreground mb-8">
                <strong>Effective date: December 4, 2025</strong>
              </p>

              <p className="mb-8">
                Voidnet provides an interface marketplace and supporting infrastructure for developers and teams. This policy explains what data we collect, how we use it, and your rights regarding your personal information.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">Information we collect</h2>
              <p className="mb-4">
                We collect the following types of information when you use Voidnet:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Account information.</strong> When you create an account, we collect and store your email address, username, and password (stored as a secure hash, never in plain text). We also track whether you have verified your email address and when your account was created.</li>
                <li><strong>Publisher and buyer profiles.</strong> If you register as a publisher to list interfaces, we collect your publisher name. If you register as a buyer, we create a buyer profile. We do not collect additional personal information beyond what is in your account.</li>
                <li><strong>Interface and marketplace data.</strong> When you publish an interface, we store information such as its name, description, unique handle, connection details, pricing and visibility settings, and any associated domains. For interfaces that integrate with external tools or protocols, we also store the technical metadata needed for them to function safely and reliably.</li>
                <li><strong>API keys.</strong> If you generate API keys as a buyer, we store a hashed version of the key, an optional label, and the last 4 characters for display purposes. We never store complete API keys in plain text.</li>
                <li><strong>Domain verification.</strong> If you verify a domain as a publisher, we store the domain name and verification status.</li>
                <li><strong>Technical and log data.</strong> We may collect standard web server logs (IP addresses, browser type, access times) temporarily for security, debugging, and abuse prevention. These logs are not permanently stored in our database and are retained only as long as necessary for these purposes.</li>
                <li><strong>Support communications.</strong> If you contact us for help, we keep records of your messages so we can respond and improve our support.</li>
              </ul>

              <h2 className="text-2xl font-medium mt-12 mb-4">How we use your information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Provide and maintain the Services.</strong> This includes operating the marketplace, authenticating users, preventing abuse, and keeping the platform secure and reliable.</li>
                <li><strong>Improve Voidnet.</strong> We analyze aggregated usage data to understand which features are working, diagnose issues, and make product decisions for future versions of the platform.</li>
                <li><strong>Communicate with you.</strong> We may send you transactional emails (for example, account, security, or service-related notices) and, where allowed, optional product updates or announcements. You can opt out of non-essential communications at any time.</li>
                <li><strong>Meet legal and compliance obligations.</strong> We may use your information where necessary to comply with applicable laws, regulations, or legal processes.</li>
              </ul>

              <h2 className="text-2xl font-medium mt-12 mb-4">Legal basis for processing</h2>
              <p className="mb-4">
                We process your personal data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Contract performance.</strong> To provide the Services you sign up for, including account creation, marketplace access, and interface publishing.</li>
                <li><strong>Legitimate interests.</strong> To operate, maintain, and improve Voidnet, prevent fraud and abuse, and ensure platform security. These interests are balanced against your privacy rights.</li>
                <li><strong>Consent.</strong> For optional features like marketing communications or certain cookies. You can withdraw consent at any time.</li>
                <li><strong>Legal compliance.</strong> Where required by applicable law, including data protection laws in the US, India, and other jurisdictions.</li>
              </ul>

              <h2 className="text-2xl font-medium mt-12 mb-4">Cookies and similar technologies</h2>
              <p className="mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Essential cookies:</strong> Keep you signed in and maintain your session. These are necessary for the platform to function.</li>
                <li><strong>Analytics cookies:</strong> Understand usage patterns and improve the Services. We may use third-party analytics services that collect data about how you use Voidnet.</li>
              </ul>
              <p className="mb-8">
                You can control cookies through your browser settings. Note that disabling essential cookies may prevent you from using certain features of Voidnet.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">How we share information</h2>
              <p className="mb-4">
                We do not sell your personal data. We may share limited information with:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Service providers.</strong> Trusted third parties who help us operate Voidnet, such as hosting providers, analytics services, and email tools. They are only allowed to use your information to provide services to us and must protect it appropriately.</li>
                <li><strong>Publishers and integrations.</strong> When you choose to install or interact with a publisher's interface, some necessary information may be shared with that publisher or integration so that the interface can function. What is shared depends on the specific interface and will generally be described in its documentation.</li>
                <li><strong>Legal and safety reasons.</strong> We may disclose information if we believe it is reasonably necessary to comply with a legal obligation, protect the safety, rights, or property of Voidnet, our users, or the public, or detect and address fraud or security issues.</li>
                <li><strong>Business transfers.</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will continue to protect your data and notify you of any material changes.</li>
              </ul>

              <h2 className="text-2xl font-medium mt-12 mb-4">Data retention</h2>
              <p className="mb-4">
                We retain your data as follows:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Account data:</strong> Until you delete your account, plus a reasonable period afterward for backup and legal compliance purposes.</li>
                <li><strong>Published interfaces:</strong> As long as they remain published, or until you delete them.</li>
                <li><strong>Verification and reset tokens:</strong> Automatically deleted after expiration (typically 24 hours).</li>
                <li><strong>Server logs:</strong> Kept temporarily for security and debugging purposes, typically 30-90 days.</li>
                <li><strong>Support communications:</strong> Retained for as long as needed to resolve your issue and for a reasonable period afterward for quality assurance.</li>
              </ul>

              <h2 className="text-2xl font-medium mt-12 mb-4">Security</h2>
              <p className="mb-4">
                We protect your data using:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Encryption:</strong> HTTPS/TLS encryption for all data in transit. Passwords are hashed using industry-standard algorithms and never stored in plain text.</li>
                <li><strong>Access controls:</strong> Limited access to personal data, restricted to authorized personnel only.</li>
                <li><strong>Secure infrastructure:</strong> We use reputable hosting providers with strong security practices.</li>
              </ul>
              <p className="mb-8">
                However, no online service can guarantee 100% security. You are responsible for keeping your password and account credentials secure.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">International transfers</h2>
              <p className="mb-8">
                Voidnet may process and store information in countries other than where you live. When we transfer personal data internationally, we take steps to ensure an appropriate level of protection in accordance with applicable laws.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">Your rights</h2>
              <p className="mb-4">
                Depending on where you live, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Access and correction:</strong> You can access and update most of your account information through your account settings. For other data, contact us.</li>
                <li><strong>Deletion:</strong> You can request deletion of your account and associated data. Some data may be retained for legal compliance or legitimate business purposes.</li>
                <li><strong>Data portability:</strong> You can request a copy of your data in a portable format.</li>
                <li><strong>Restriction and objection:</strong> You can ask us to restrict processing of your data or object to certain uses.</li>
              </ul>
              <p className="mb-4">
                <strong>For users in California:</strong> Under the California Consumer Privacy Act (CCPA), you have the right to know what personal information we collect, request deletion, and opt out of any sale of personal information. We do not sell personal information.
              </p>
              <p className="mb-4">
                <strong>For users in India:</strong> Under the Digital Personal Data Protection Act, you have rights to access, correct, erase, and nominate representatives for your data. You can also withdraw consent for data processing where consent is the legal basis.
              </p>
              <p className="mb-8">
                To exercise any of these rights, contact us at roshaan@openvoidnet.com. We will respond within the timeframes required by applicable law (typically 30-45 days).
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">Children</h2>
              <p className="mb-8">
                Voidnet is not directed to children under 13, and we do not knowingly collect personal data from children under 13. If you believe that a child has provided us with personal information, please contact us so we can take appropriate action.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">Changes to this policy</h2>
              <p className="mb-8">
                We may update this Privacy Policy from time to time to reflect changes to our Services or applicable laws. When we make material changes, we will update the effective date at the top of this page and, where appropriate, provide additional notice.
              </p>

              <h2 className="text-2xl font-medium mt-12 mb-4">Contact us</h2>
              <p className="mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
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
