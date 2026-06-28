'use client';
import { useState } from 'react';

interface AccordionItem {
    title: string;
    content: React.ReactNode;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-2xl mx-auto border border-slate-200 rounded-lg md:shadow-sm">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={index} className="border-b border-slate-200 last:border-b-0">
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full flex justify-between items-center p-5 text-left font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                            aria-expanded={isOpen}
                        >
                            <span>{item.title}</span>
                            <svg
                                className={`w-5 h-5 text-slate-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                }`}
                        >
                            <div className="overflow-hidden">
                                <div className="p-5 text-slate-600 bg-slate-50/50 text-sm leading-relaxed border-t border-slate-100">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}