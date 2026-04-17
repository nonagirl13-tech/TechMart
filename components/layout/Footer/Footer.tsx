import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-16 bg-white">
      <div className="container mx-auto px-4 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold mb-3">TECKMART</h2>
            <p className="text-sm text-gray-500 leading-6">
              Your one-stop shop for everything you need.
              Best products, best prices, best experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>

            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <Link href="/products" className="hover:text-black">
                Products
              </Link>
              <Link href="/categories" className="hover:text-black">
                Categories
              </Link>
              <Link href="/brand" className="hover:text-black">
                Brands
              </Link>
              <Link href="/orders" className="hover:text-black">
                Orders
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>

            <div className="text-sm text-gray-600 space-y-2">
              <p>Email: support@teckmart.com</p>
              <p>Phone: +20 100 000 0000</p>
              <p>Location: Egypt</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TECKMART. All rights reserved.
        </div>

      </div>
    </footer>
  );
}