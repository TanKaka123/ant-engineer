import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import LogoIcon from "./icons/Logo";
import { ICSearch } from "./icons/Search";
import { useRouter } from "next/router";
import { ThreeLines } from "./icons/ThreeLines";
import { ICClose } from "./icons/Close";
import { ICArrowRight } from "./icons/ArrowRight";

const buttons = [{ href: "/about", text: "About" }];
const buttonsMobile = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },  
  { href: "/", text: "Blog" },
  { href: "/about", text: "Contact" }
];
type HeaderButtonProps = {
  href: string;
  text: string;
};

function HeaderButton({ href, text }: HeaderButtonProps) {
  return (
    <Link
      href={href}
      className="bg-gradient-custom-hover rounded-md px-4 py-2 text-xl text-black transition-colors hover:text-white"
    >
      {text}
    </Link>
  );
}

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleChangeTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      return;
    }
    router.push("/");
  };

  return (
    <header className="fixed top-0 z-20 flex w-full items-center bg-white bg-opacity-80 py-4 backdrop-blur backdrop-saturate-150 dark:bg-opacity-60">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          passHref
          className="flex items-center gap-2 p-2 leading-none"
        >
          <LogoIcon width="60px" className="h-[60px]" />
          <span className="text-gradient-custom text-lg font-bold">
            Ant Engineer
          </span>
        </Link>
        <div className="flex items-center  ">
          <nav className="hidden px-2 md:block">
            {buttons.map(({ href, text }) => (
              <HeaderButton key={href} href={href} text={text} />
            ))}
          </nav>
          <div className="relative hidden md:block">
            <input
              className="h-10 w-44 rounded-full border border-black pl-4 pr-10"
              placeholder="Search articles"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ outline: "none" }}
            />
            <ICSearch
              onClick={handleSearch}
              className="absolute right-4 -top-1 translate-y-1/2 cursor-pointer"
            />
          </div>

          <div className="flex gap-4 md:hidden ">
            <ICSearch onClick={handleSearch} className="cursor-pointer " />
            <div onClick={toggleDrawer} className="flex gap-2">
              <p>Menu</p>
              <ThreeLines />
            </div>
          </div>
          {/* <button
            className="p-2 leading-none text-gray-300 transition-colors hover:text-black"
            onClick={handleChangeTheme}
            aria-label="Toggle theme"
          >
            <DarkIcon size="sm" />
          </button> */}
        </div>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-30 h-screen bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="fixed inset-0 bg-white p-6 shadow-lg dark:bg-black ">
            <div className="flex inset-0 justify-between items-center">
              <Link
                href="/"
                passHref
                className="flex items-center gap-2 leading-none -ml-2"
              >
                <LogoIcon width="60px" className="h-[60px]" />
                <span className="text-gradient-custom text-lg font-bold">
                  Ant Engineer
                </span>
              </Link>
              <button
                className="text-gray-700 dark:text-gray-200"
                onClick={toggleDrawer}
              >
                <ICClose
                  height={42}
                  width={42}
                  backgroundColor="transparent"
                  className="text-black"
                  color="black"
                />
              </button>
            </div>
            <nav className="flex flex-col gap-4 mt-12">
              {buttonsMobile.map(({ href, text }) => (
                <Link
                  key={href}
                  href={href}
                  className="cursor-pointer text-xl font-semibold text-black dark:text-white w-full flex justify-between"
                  onClick={toggleDrawer}
                >
                  {text}

                  <ICArrowRight height={30} width={30} />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
