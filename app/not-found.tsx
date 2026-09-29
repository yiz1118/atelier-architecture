import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";

export default function NotFound() {
  return <section className="page-shell not-found"><p className="eyebrow">404 / Page not found</p><h1>Some paths lead<br />elsewhere.</h1><p>The page you were looking for is not part of this concept.</p><Link className="text-link" href="/">Return to the beginning <span aria-hidden="true"><ArrowUpRightIcon /></span></Link></section>;
}
