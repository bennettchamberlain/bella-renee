export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      {/* Email Signup */}
      <div className="border-b border-white/10 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white uppercase mb-4">Join Us!</h2>
          <p className="text-gray-400 mb-8">
            Be the first to know about new merch, promos, giveaways & sales!
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-black border border-white/20 text-white px-4 py-3 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-3 font-bold uppercase hover:bg-gray-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">© 2026, Bella Renee</div>

          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/policies/shipping" className="hover:text-white transition-colors">
              Shipping Policy
            </a>
            <a href="/policies/returns" className="hover:text-white transition-colors">
              Return Policy
            </a>
            <a href="/policies/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Payment Icons */}
        <div className="mt-6 flex justify-center gap-2 opacity-50">
          <div className="text-gray-500 text-xs">Payment methods accepted</div>
        </div>
      </div>
    </footer>
  )
}
