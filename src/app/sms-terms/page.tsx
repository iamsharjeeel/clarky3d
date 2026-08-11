import Link from "next/link";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { createMetadata } from "@/lib/metadata/create-metadata";

export const metadata = createMetadata({
  title: "SMS Terms",
  description: "Clarky3D mobile messaging program terms and conditions.",
  path: "/sms-terms",
});

export default function SmsTermsPage() {
  return (
    <LegalArticle title="SMS Terms" updated="11 August 2026">
      <p>
        Clarky3D (“we”, or “us”) operates a mobile messaging program (the “Program”) subject to
        these Mobile Messaging Terms and Conditions (the “Mobile Messaging Terms”). The Program and
        our collection and use of your personal information are also subject to our{" "}
        <Link href="/privacy">Privacy Policy</Link>. By enrolling, signing up, or otherwise agreeing
        to participate in the Program, you accept and agree to these Mobile Messaging Terms and our
        Privacy Policy.
      </p>

      <h2>Messaging program description</h2>
      <p>
        Our campaigns send SMS Notifications, Alerts &amp; Occasional Marketing Communication to
        customers who have opted in to receive SMS notifications.
      </p>
      <p>
        You can cancel the SMS service at any time. Simply text “STOP” to the shortcode. Upon
        sending “STOP,” we will confirm your unsubscribe status via SMS. Following this
        confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as you did
        initially, and we will resume sending SMS messages to you.
      </p>
      <p>
        If you experience issues with the messaging program, reply with the keyword HELP for more
        assistance, or reach out directly to{" "}
        <a href="mailto:xpozandgro@gmail.com">xpozandgro@gmail.com</a> or{" "}
        <a href="tel:+14802576030">+1 (480) 257-6030</a>.
      </p>
      <p>Carriers are not liable for delayed or undelivered messages.</p>
      <p>
        As always, message and data rates may apply for messages sent to you from us and to us from
        you. Message frequency varies. For questions about your text plan or data plan, contact your
        wireless provider.
      </p>
      <p>
        For privacy-related inquiries, please refer to our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>User opt-in</h2>
      <p>
        By providing your mobile phone number to us, you are voluntarily opting into the Program and
        you agree to receive recurring mobile messages from us at the mobile phone number associated
        with your opt-in, even if such number is registered on any state or federal “Do Not Call”
        list. You agree that any mobile phone number you provide to us is a valid mobile phone
        number of which you are the owner or authorized user. If you change your mobile phone number
        or are no longer the owner or authorized user of the mobile phone number, you agree to
        promptly notify us at <a href="mailto:xpozandgro@gmail.com">xpozandgro@gmail.com</a>. Your
        participation in the Program is not required to make any purchase from us and your
        participation in the Program is completely voluntary.
      </p>
      <p>
        Users may also opt-in by visiting <a href="https://clarky3d.com">https://clarky3d.com</a>{" "}
        and filling out their details, including checking a box to receive notifications and
        promotional messages. Frequency may vary. Message and data rates may apply.
      </p>

      <h2>User opt-out and support</h2>
      <p>
        You may opt out of the Program at any time. If you wish to opt-out of the Program and stop
        receiving mobile messages from us, or you no longer agree to these Mobile Messaging Terms,
        reply STOP, QUIT, CANCEL, OPT-OUT, and/or UNSUBSCRIBE to any mobile message from us. You may
        continue to receive text messages for a short period while we process your request and you
        may receive a one-time opt-out confirmation message. You understand and agree that the
        foregoing is the only reasonable method of opting out. For support, reply HELP to any mobile
        message from us.
      </p>
      <p>
        Our mobile messaging platform may not recognize requests that modify the foregoing commands,
        and you agree that we and our service providers will not be liable for failing to honor
        requests that do not comply with the requirements in these Mobile Messaging Terms. We may
        also change the telephone number or short code we use to operate the Program and we will
        notify you of any such change. You acknowledge that any requests sent to a telephone number
        or short code that has been changed may not be received by us and we will not be responsible
        for failing to honor a request sent to a telephone number or short code that has been
        changed.
      </p>

      <h2>Kids’ privacy</h2>
      <p>
        We do not address anyone under the age of 18. We do not knowingly collect personally
        identifiable information from anyone under the age of 18. If You are a parent or guardian
        and You are aware that Your child has provided Us with Personal Data, please contact Us. If
        We become aware that We have collected Personal Data from anyone under the age of 18 without
        verification of parental consent, We take steps to remove that information from Our servers.
      </p>

      <h2>Disclaimer of warranty and liability</h2>
      <p>
        The Program is offered on an “as-is” basis and may not be available in all areas, at all
        times, or on all mobile providers. You agree that neither we nor our service providers will
        be liable for any failed, delayed, or misdirected delivery of any mobile message or
        information sent through the Program.
      </p>

      <h2>Modifications</h2>
      <p>
        We may modify or cancel the Program or any of its features at any time, with or without
        notice. To the extent permitted by applicable law, we may also modify these Mobile Messaging
        Terms at any time. Any such modification will take effect when it is posted to our website.
        You agree to review these Mobile Messaging Terms periodically to ensure that you are aware
        of any modifications. Your continued participation in the Program will constitute your
        acceptance of those modifications.
      </p>

      <h2>Contact us</h2>
      <p>Don’t hesitate to contact us if you have any questions.</p>
      <ul>
        <li>
          Via Email: <a href="mailto:xpozandgro@gmail.com">xpozandgro@gmail.com</a>
        </li>
        <li>
          Via Phone Number: <a href="tel:+14802576030">+1 (480) 257-6030</a>
        </li>
        <li>
          Via website: <Link href="/contact">Order / enquire</Link>
        </li>
      </ul>
      <p>
        <Link href="/">Back to home</Link>
      </p>
    </LegalArticle>
  );
}
