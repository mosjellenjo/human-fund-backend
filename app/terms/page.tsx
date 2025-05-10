import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms of Service</h1>
                <p className="text-muted-foreground">Last updated: May 1, 2023</p>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Welcome to The Human Fund website. By accessing or using our website, you agree to be bound by these
                  Terms of Service.
                </p>
                <h2 className="text-xl font-bold">Use of Our Website</h2>
                <p>
                  You may use our website only for lawful purposes and in accordance with these Terms of Service. You
                  agree not to use our website:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    In any way that violates any applicable federal, state, local, or international law or regulation
                  </li>
                  <li>
                    To transmit, or procure the sending of, any advertising or promotional material, including any "junk
                    mail," "chain letter," "spam," or any other similar solicitation
                  </li>
                  <li>
                    To impersonate or attempt to impersonate The Human Fund, a Human Fund employee, another user, or any
                    other person or entity
                  </li>
                  <li>
                    To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website,
                    or which, as determined by us, may harm The Human Fund or users of the website or expose them to
                    liability
                  </li>
                </ul>
                <h2 className="text-xl font-bold">Intellectual Property Rights</h2>
                <p>
                  The website and its entire contents, features, and functionality (including but not limited to all
                  information, software, text, displays, images, video, and audio, and the design, selection, and
                  arrangement thereof), are owned by The Human Fund, its licensors, or other providers of such material
                  and are protected by copyright, trademark, patent, trade secret, and other intellectual property or
                  proprietary rights laws.
                </p>
                <h2 className="text-xl font-bold">Donations</h2>
                <p>
                  All donations made through our website are final and non-refundable. If you believe a donation was
                  made in error, please contact us immediately.
                </p>
                <h2 className="text-xl font-bold">Limitation of Liability</h2>
                <p>
                  In no event will The Human Fund, its affiliates, or their licensors, service providers, employees,
                  agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out
                  of or in connection with your use, or inability to use, the website, any websites linked to it, any
                  content on the website or such other websites, including any direct, indirect, special, incidental,
                  consequential, or punitive damages.
                </p>
                <h2 className="text-xl font-bold">Contact Us</h2>
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
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
