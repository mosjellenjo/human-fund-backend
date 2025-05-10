import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
                <p className="text-muted-foreground">Last updated: May 1, 2023</p>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Human Fund ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how your personal information is collected, used, and disclosed by The Human Fund.
                </p>
                <h2 className="text-xl font-bold">Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you make a donation, sign up for our
                  newsletter, or contact us. This information may include your name, email address, postal address,
                  phone number, and donation information.
                </p>
                <h2 className="text-xl font-bold">How We Use Your Information</h2>
                <p>We may use the information we collect from you to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process donations and send receipts</li>
                  <li>Communicate with you about our programs, events, and campaigns</li>
                  <li>Respond to your inquiries and provide customer service</li>
                  <li>Send you technical notices, updates, and administrative messages</li>
                  <li>Provide and deliver the information you request</li>
                </ul>
                <h2 className="text-xl font-bold">Sharing of Information</h2>
                <p>We may share your personal information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers who perform services on our behalf</li>
                  <li>As required by law, such as to comply with a subpoena or similar legal process</li>
                  <li>
                    When we believe in good faith that disclosure is necessary to protect our rights, protect your
                    safety or the safety of others, investigate fraud, or respond to a government request
                  </li>
                </ul>
                <h2 className="text-xl font-bold">Your Choices</h2>
                <p>
                  You may opt out of receiving promotional emails from us by following the instructions in those emails.
                  If you opt out, we may still send you non-promotional emails, such as those about your account or our
                  ongoing business relations.
                </p>
                <h2 className="text-xl font-bold">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p>
                  The Human Fund
                  <br />
                  Stensberggata 15B
                  <br />
                  0170 Oslo, Norway
                  <br />
                  Email: jo@humanfund.no
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
