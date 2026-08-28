"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Is the workshop really free?",
    answer:
      "Yes. Registration is free—no payment is required. Submit the form and joining details will be sent to your email once registration opens.",
  },
  {
    question: "When does the workshop run?",
    answer: "It will run live online on [Workshop Date] at [Start Time].",
  },
  {
    question: "Do I need to be an Excel expert?",
    answer:
      "No. If you can open a workbook and follow along, you are ready. The session is designed for beginner-to-intermediate users.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Yes, participants who complete the live session will receive a shareable completion certificate.",
  },
  {
    question: "What do I need on my laptop?",
    answer:
      "Microsoft Excel—desktop recommended—and a stable internet connection. Sample files will be shared before the workshop.",
  },
  {
    question: "Will there be a recording?",
    answer:
      "The recording policy is still being finalized and will be confirmed before registration opens.",
  },
];

export default function FaqSection() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">FAQ</span>
          <h2>Before you join</h2>
          <p>
            Key details about the workshop. Date, time, and recording policy will be confirmed before launch.
          </p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <details
                key={index}
                open={isOpen}
                onClick={(e) => {
                  e.preventDefault();
                  toggleFaq(index);
                }}
              >
                <summary>
                  <span>
                    {faq.question}
                    <i>+</i>
                  </span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
