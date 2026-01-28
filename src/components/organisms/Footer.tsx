import { BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import BlockRendererClient from "../molecules/BlockRendererComponent";

export interface FooterProps {
  about: {
    title?: string;
    content?: BlocksContent;
  };
  quickLinks: {
    title?: string;
    links?: Array<{
      label: string;
      url: string;
    }>;
  };
  contact: {
    title?: string;
    links?: Array<{
      label: string;
      url: string;
    }>;
  };
}

const Footer = ({ about, quickLinks, contact }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            {about?.title && (
              <h3 className="text-lg font-semibold text-white mb-4">
                {about?.title}
              </h3>
            )}
            <p className="text-sm text-gray-300 leading-relaxed">
              {about?.content && (
                <BlockRendererClient content={about?.content} />
              )}
            </p>
          </div>
          <div>
            {quickLinks?.title && (
              <h4 className="text-lg font-semibold text-white mb-4">
                {quickLinks?.title}
              </h4>
            )}
            {quickLinks?.links && (
              <ul className="space-y-2">
                {quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact */}
          <div>
            {contact?.title && (
              <h4 className="text-lg font-semibold text-white mb-4">
                {contact?.title}
              </h4>
            )}
            {contact?.links && (
              <ul className="space-y-2">
                {contact.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-xs text-gray-400">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
