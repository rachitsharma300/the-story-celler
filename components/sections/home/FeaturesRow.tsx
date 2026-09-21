"use client";

import { ShieldCheck, Truck, Wallet, Eye, Heart } from "lucide-react";

export default function FeaturesRow() {
  return (
    <section className="relative z-20 -mt-0 mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-stone-100 shadow-xl rounded-2xl py-6 px-5 sm:px-8 md:px-12 grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-4 md:divide-x divide-stone-100">
        {/* Feature 1 */}
        <div className="flex items-center gap-3 md:gap-3.5 px-2 md:px-4 group">
          <div className="p-2.5 bg-[#A65B62]/5 rounded-xl text-[#A65B62] shrink-0 transition-colors duration-300 group-hover:bg-[#A65B62] group-hover:text-white">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="font-sans-clean text-xs font-bold text-stone-900 leading-tight">Premium Quality</h4>
            <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">HD Prints</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-3 md:gap-3.5 px-2 md:pl-6 group">
          <div className="p-2.5 bg-[#A65B62]/5 rounded-xl text-[#A65B62] shrink-0 transition-colors duration-300 group-hover:bg-[#A65B62] group-hover:text-white">
            <Truck size={20} />
          </div>
          <div>
            <h4 className="font-sans-clean text-xs font-bold text-stone-900 leading-tight">Free Shipping</h4>
            <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">Across India</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-3 md:gap-3.5 px-2 md:pl-6 group">
          <div className="p-2.5 bg-[#A65B62]/5 rounded-xl text-[#A65B62] shrink-0 transition-colors duration-300 group-hover:bg-[#A65B62] group-hover:text-white">
            <Wallet size={20} />
          </div>
          <div>
            <h4 className="font-sans-clean text-xs font-bold text-stone-900 leading-tight">COD Available</h4>
            <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">Easy & Secure</p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-center gap-3 md:gap-3.5 px-2 md:pl-6 group">
          <div className="p-2.5 bg-[#A65B62]/5 rounded-xl text-[#A65B62] shrink-0 transition-colors duration-300 group-hover:bg-[#A65B62] group-hover:text-white">
            <Eye size={20} />
          </div>
          <div>
            <h4 className="font-sans-clean text-xs font-bold text-stone-900 leading-tight">Preview Before Print</h4>
            <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">100% Satisfaction</p>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="flex items-center gap-3 md:gap-3.5 px-2 md:pl-6 col-span-2 md:col-span-1 justify-center md:justify-start group">
          <div className="p-2.5 bg-[#A65B62]/5 rounded-xl text-[#A65B62] shrink-0 transition-colors duration-300 group-hover:bg-[#A65B62] group-hover:text-white">
            <Heart className="fill-current text-[#A65B62] group-hover:text-white" size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-sans-clean text-xs font-bold text-stone-900 leading-tight">Loved by 10,000+</h4>
            <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
