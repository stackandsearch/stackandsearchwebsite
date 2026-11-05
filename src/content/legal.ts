import { company } from "./company";
import { site } from "./site";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDoc {
  title: string;
  description: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export const privacyPolicy: LegalDoc = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects personal information sent through this website.`,
  intro: `This policy explains what personal information ${site.name} collects through this website, why we collect it, and the choices you have.`,
  updated: "5 November 2026",
  sections: [
    {
      heading: "Information we collect",
      paragraphs: [
        "When you send an enquiry through a form on this website, we collect the details you choose to give us: your name, email address and, optionally, your phone or WhatsApp number, current website, the services you're interested in and your message. We also record that you agreed to be contacted.",
        "With each enquiry we also record the page you sent it from and how you found our website: for example, the search engine, social network, website or ad campaign that brought you, and the first page you visited.",
        "Like most websites, our hosting provider automatically records basic technical information, such as your IP address, browser type and the pages you request, to keep the site running securely.",
      ],
    },
    {
      heading: "How we use it",
      list: [
        "To reply to your enquiry and prepare an audit or quote",
        "To keep a record of our conversations and agreements",
        "To understand which of our marketing brings enquiries",
        "To keep the website secure and working properly",
      ],
      paragraphs: ["We don't sell your personal information, and we don't use your enquiry details for unrelated marketing without your consent."],
    },
    {
      heading: "Who we share it with",
      paragraphs: [
        "We share information only with service providers that help us run this website and handle enquiries, such as hosting, email, spreadsheet, analytics and customer-management tools, and only as much as they need to provide their service. We may also disclose information where the law requires it.",
      ],
    },
    {
      heading: "Cookies and browser storage",
      paragraphs: ["This website stores a small number of items in your browser so it works as expected:"],
      list: [
        "Your light or dark theme preference",
        "A note that you closed our enquiry pop-up, so it doesn't reappear in the same browsing session",
        "A note that you've already sent an enquiry, so the pop-up doesn't show again",
        "How you found our website, as described above, kept in a first-party cookie for up to six months so it can be sent with an enquiry. It isn't shared with advertisers or used to follow you on other websites.",
      ],
    },
    {
      heading: "Analytics",
      paragraphs: [
        "We use Google Analytics 4, loaded through Google Tag Manager, to understand how the site is used: which pages are viewed, how visitors found us and whether enquiries are sent. Google Analytics sets cookies on our domain (_ga and _ga_*) and processes information such as your approximate location, device, browser and the pages you visit.",
        "We don't use Google Analytics for advertising, and we don't send it your name, email address or the contents of any enquiry. You can block these cookies in your browser settings, or install Google's Analytics opt-out add-on from tools.google.com/dlpage/gaoptout.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep enquiry details for as long as we need them to respond and, if we work together, for as long as our business records require. You can ask us to delete your information at any time.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        `You can ask us what personal information we hold about you, ask us to correct or delete it, or withdraw your consent to being contacted. Email ${company.email} and we'll respond as soon as we can, and within any time limit the law sets.`,
      ],
    },
    {
      heading: "Children",
      paragraphs: ["This website is meant for businesses and isn't directed at children. We don't knowingly collect information from children."],
    },
    {
      heading: "Changes to this policy",
      paragraphs: ["If we change how we handle personal information, we'll update this page and the date at the top."],
    },
    {
      heading: "Contact",
      paragraphs: [`Questions about this policy or your information: ${company.email}.`],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of use",
  description: `The terms for using the ${site.name} website.`,
  intro: `These terms apply to your use of the ${site.name} website. By using the site, you agree to them.`,
  updated: "4 November 2026",
  sections: [
    {
      heading: "Information on this website",
      paragraphs: [
        "We work to keep the information on this website accurate and up to date, but it's general information, not professional advice for your specific situation. Timelines and descriptions of our services are typical, not guaranteed.",
      ],
    },
    {
      heading: "Quotes and services",
      paragraphs: [
        "Nothing on this website is an offer to provide services. Any work we do is based on a written scope and quote that you approve, and that agreement takes priority over anything on this site.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        `The content, design and code of this website belong to ${site.name} unless stated otherwise. You're welcome to link to our pages, but please don't copy substantial parts of the site without permission. Ownership of work we create for clients is set out in each client agreement.`,
      ],
    },
    {
      heading: "Links to other websites",
      paragraphs: [
        "We may link to other websites, such as our clients' sites or official guidance. We aren't responsible for their content or their privacy practices.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: ["To the extent the law allows, we aren't liable for any loss arising from use of this website or reliance on its content."],
    },
    {
      heading: "Changes to these terms",
      paragraphs: ["We may update these terms from time to time; the date at the top shows when they last changed."],
    },
    {
      heading: "Contact",
      paragraphs: [`Questions about these terms: ${company.email}.`],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  title: "Cookie policy",
  description: `The cookies and browser storage the ${site.name} website uses, and why.`,
  intro:
    "This policy lists the small items this website stores in your browser, what each one is for and how long it lasts. We keep them to a minimum, and none are used for advertising.",
  updated: "5 November 2026",
  sections: [
    {
      heading: "Cookies and browser storage",
      paragraphs: [
        "Cookies are small text files a website saves in your browser. Browser storage (local and session storage) works in a similar way, but isn't sent to the website automatically. This site uses both, only for the purposes below.",
      ],
    },
    {
      heading: "What we store",
      list: [
        "ss_attr (cookie, up to six months): how you found our website, such as a search engine, social network or ad campaign, and the first page you visited. It's sent with an enquiry so we know which marketing works.",
        "ss-lead-popup (cookie, for the rest of your visit): remembers that you closed our enquiry pop-up, so it doesn't reappear.",
        "ss-lead-submitted (browser storage): remembers that you've already sent an enquiry, so the pop-up doesn't show again.",
        "ss-attr-session (session storage, until you close the tab): marks the start of a visit, so a new visit can be told apart from moving between pages.",
        "Theme preference (browser storage): remembers whether you chose the light or dark theme.",
        "_ga and _ga_* (Google Analytics cookies, up to two years): tell visits apart so we can count visitors and see which pages are useful. They don't contain your name or contact details.",
      ],
    },
    {
      heading: "What we don't use",
      paragraphs: [
        "We don't use advertising cookies, and we don't sell information collected through cookies. Google Analytics is the only outside service that stores cookies here, and it stores them on our domain.",
      ],
    },
    {
      heading: "Managing cookies",
      paragraphs: [
        "You can view, delete or block cookies and browser storage in your browser's settings. The website still works without them: it will forget your theme choice, the pop-up may reappear, and enquiries won't include how you found us.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`Questions about this policy: ${company.email}.`],
    },
  ],
};
