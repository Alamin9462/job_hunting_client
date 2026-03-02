import { Input, Button } from "antd";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const FooterSection = () => {
  return (
    <div className="bg-gray-900 text-white px-10 py-16">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-bold text-lg mb-4">QuickHire</h3>
          <p className="text-gray-400">
            Great platform for job seekers.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">About</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Companies</li>
            <li>Pricing</li>
            <li>Terms</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Help Docs</li>
            <li>Guide</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">
            Get job notifications
          </h4>
          <div className="flex gap-2">
            <Input placeholder="Email Address" />
            <Button type="primary">Subscribe</Button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center border-t border-gray-700 pt-6 text-gray-400">
        <p>2026 © QuickHire</p>

        <div className="flex gap-4 text-xl">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
    </div>
  );
};

export default FooterSection;