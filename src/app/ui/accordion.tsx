import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({
  title,
  content,
  isOpen,
  onToggle,
}: AccordionItemProps) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="rounded-md w-full flex justify-between items-center px-4 py-2 text-left bg-[var(--navbar)] hover:bg-[var(--background)] focus:outline-none"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 bg-[var(--navbar)] ${
          isOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="px-4 text-[var(--foreground)]">{content}</div>
      </div>
    </div>
  );
};

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="w-full bg-[#ededed] max-w-3xl mx-auto rounded-lg border border-gray-200 divide-y divide-gray-200">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
