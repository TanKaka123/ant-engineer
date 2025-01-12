import React from "react";
import Link from "next/link";

import Divider from "components/Divider";

type FooterLinkProps = {
  children?: React.ReactNode;
  href: string;
};

function FooterLink({ children, href }: FooterLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className="text-gray-500 transition-colors hover:text-black"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="space-y-6 py-10 px-6">
      <nav className="flex justify-center">
        <FooterLink href="/">Home</FooterLink>
        <Divider className="mx-4 h-auto" />
        <FooterLink href="/about">About</FooterLink>
        <Divider className="mx-4 h-auto" />
        <FooterLink href="mailto:hongtan.dev@gmail.com">Contact</FooterLink>
        <Divider className="mx-4 h-auto" />
        <FooterLink href="https://github.com/TanKaka123">
          Source
        </FooterLink>
      </nav>
      <div className="flex justify-center ">
        <FooterLink href="https://github.com/TanKaka123">GitHub</FooterLink>
        <Divider className="mx-4 h-auto" />
        <FooterLink href="https://www.linkedin.com/in/nguyenhongtan/">
          LinkedIn
        </FooterLink>
        {/* <Divider className="mx-4 h-auto" />
        <FooterLink href="https://bsky.app/profile/tobynguyen.dev">
          Bluesky
        </FooterLink> */}
      </div>
    </footer>
  );
}
